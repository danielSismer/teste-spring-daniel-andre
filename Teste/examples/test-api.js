// Script para testar a API do Node-RED
// Execute: node examples/test-api.js

const axios = require('axios');

// Configurações
const NODE_RED_URL = 'http://localhost:1880';
const API_ENDPOINT = '/api/receive';

// Dados de teste
const testData = [
    {
        data: {
            id: 1001,
            nome: "Smartphone Galaxy S23",
            valor: 2999.99,
            categoria: "Eletrônicos",
            fornecedor: "Samsung",
            estoque: 15
        }
    },
    {
        data: {
            id: 1002,
            nome: "Notebook Dell Inspiron",
            valor: 4599.99,
            categoria: "Informática",
            fornecedor: "Dell",
            estoque: 8
        }
    },
    {
        data: {
            id: 1003,
            nome: "Fone de Ouvido Bluetooth",
            valor: 199.99,
            categoria: "Acessórios",
            fornecedor: "JBL",
            estoque: 45
        }
    }
];

// Função para testar envio de dados
async function testSendData(data) {
    try {
        console.log(`\n📤 Enviando dados: ${data.data.nome}`);
        
        const response = await axios.post(`${NODE_RED_URL}${API_ENDPOINT}`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        
        console.log(`✅ Sucesso! Status: ${response.status}`);
        console.log(`📊 Resposta:`, JSON.stringify(response.data, null, 2));
        
        return true;
    } catch (error) {
        console.error(`❌ Erro ao enviar dados: ${error.message}`);
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Dados:`, error.response.data);
        }
        return false;
    }
}

// Função para testar endpoint de saúde
async function testHealthCheck() {
    try {
        console.log('\n🏥 Testando endpoint de saúde...');
        
        const response = await axios.get(`${NODE_RED_URL}/health`, {
            timeout: 5000
        });
        
        console.log(`✅ Health check OK! Status: ${response.status}`);
        return true;
    } catch (error) {
        console.log(`⚠️ Health check falhou: ${error.message}`);
        return false;
    }
}

// Função para testar com dados inválidos
async function testInvalidData() {
    try {
        console.log('\n🧪 Testando com dados inválidos...');
        
        const invalidData = {
            // Dados sem a estrutura esperada
            nome: "Produto sem ID",
            valor: "valor_invalido"
        };
        
        const response = await axios.post(`${NODE_RED_URL}${API_ENDPOINT}`, invalidData, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        
        console.log(`⚠️ Dados inválidos aceitos (inesperado): ${response.status}`);
        return false;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log(`✅ Validação funcionando! Erro 400 recebido`);
            return true;
        } else {
            console.error(`❌ Erro inesperado: ${error.message}`);
            return false;
        }
    }
}

// Função para testar performance
async function testPerformance() {
    console.log('\n⚡ Testando performance...');
    
    const startTime = Date.now();
    const promises = [];
    
    // Enviar 10 requisições simultâneas
    for (let i = 0; i < 10; i++) {
        const data = {
            data: {
                id: 2000 + i,
                nome: `Produto Performance ${i}`,
                valor: Math.random() * 1000,
                categoria: "Teste",
                timestamp: new Date().toISOString()
            }
        };
        
        promises.push(testSendData(data));
    }
    
    try {
        const results = await Promise.all(promises);
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        const successCount = results.filter(r => r).length;
        const failureCount = results.length - successCount;
        
        console.log(`📊 Performance: ${results.length} requisições em ${duration}ms`);
        console.log(`✅ Sucessos: ${successCount}`);
        console.log(`❌ Falhas: ${failureCount}`);
        console.log(`📈 Taxa de sucesso: ${((successCount / results.length) * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error(`❌ Erro no teste de performance: ${error.message}`);
    }
}

// Função principal
async function runTests() {
    console.log('🚀 Iniciando testes da API Node-RED\n');
    
    // Teste de conectividade
    const healthOk = await testHealthCheck();
    if (!healthOk) {
        console.log('\n⚠️ Node-RED não está rodando ou não responde');
        console.log('   Certifique-se de que o Node-RED está executando em http://localhost:1880');
        return;
    }
    
    // Teste com dados válidos
    console.log('\n📋 Testando envio de dados válidos...');
    let successCount = 0;
    
    for (const data of testData) {
        const success = await testSendData(data);
        if (success) successCount++;
        
        // Aguardar um pouco entre as requisições
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n📊 Resultado dos testes: ${successCount}/${testData.length} sucessos`);
    
    // Teste com dados inválidos
    await testInvalidData();
    
    // Teste de performance
    await testPerformance();
    
    console.log('\n🎉 Testes concluídos!');
}

// Executar testes se o script for chamado diretamente
if (require.main === module) {
    runTests().catch(error => {
        console.error('\n💥 Erro fatal durante os testes:', error.message);
        process.exit(1);
    });
}

module.exports = {
    testSendData,
    testHealthCheck,
    testInvalidData,
    testPerformance,
    runTests
};
