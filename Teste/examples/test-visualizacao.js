// Script para testar a visualização de dados no Node-RED
// Execute: node examples/test-visualizacao.js

const axios = require('axios');

// Configurações
const NODE_RED_URL = 'http://localhost:1880';
const API_ENDPOINT = '/api/receive';

// Dados de teste para simular sua API Java
const dadosTeste = [
    {
        data: {
            id: 1001,
            nome: "Smartphone Galaxy S23",
            valor: 2999.99,
            categoria: "Eletrônicos",
            fornecedor: "Samsung",
            estoque: 15,
            descricao: "Smartphone topo de linha"
        }
    },
    {
        data: {
            id: 1002,
            nome: "Notebook Dell Inspiron",
            valor: 4599.99,
            categoria: "Informática",
            fornecedor: "Dell",
            estoque: 8,
            descricao: "Notebook para trabalho"
        }
    },
    {
        data: {
            id: 1003,
            nome: "Fone de Ouvido Bluetooth",
            valor: 199.99,
            categoria: "Acessórios",
            fornecedor: "JBL",
            estoque: 45,
            descricao: "Fone sem fio"
        }
    },
    {
        data: {
            id: 1004,
            nome: "Smart TV LG 55\"",
            valor: 3499.99,
            categoria: "Eletrônicos",
            fornecedor: "LG",
            estoque: 12,
            descricao: "TV inteligente 4K"
        }
    },
    {
        data: {
            id: 1005,
            nome: "Mouse Gamer RGB",
            valor: 89.99,
            categoria: "Acessórios",
            fornecedor: "Logitech",
            estoque: 67,
            descricao: "Mouse com iluminação"
        }
    }
];

// Função para enviar dados e simular sua API Java
async function enviarDados(dados) {
    try {
        console.log(`📤 Enviando: ${dados.data.nome} (R$ ${dados.data.valor})`);
        
        const response = await axios.post(`${NODE_RED_URL}${API_ENDPOINT}`, dados, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });
        
        console.log(`✅ Enviado com sucesso! Status: ${response.status}`);
        return true;
    } catch (error) {
        console.error(`❌ Erro ao enviar: ${error.message}`);
        return false;
    }
}

// Função para simular envio contínuo de dados
async function simularEnvioContinuo() {
    console.log('\n🚀 Simulando envio contínuo de dados da sua API Java...\n');
    
    let sucessos = 0;
    let falhas = 0;
    
    for (let i = 0; i < dadosTeste.length; i++) {
        const dados = dadosTeste[i];
        
        // Adicionar timestamp único
        dados.data.id = Date.now() + i;
        
        const sucesso = await enviarDados(dados);
        if (sucesso) {
            sucessos++;
        } else {
            falhas++;
        }
        
        // Aguardar 2 segundos entre envios para visualizar no dashboard
        console.log('⏳ Aguardando 2 segundos...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`📊 Resumo: ${sucessos} sucessos, ${falhas} falhas`);
}

// Função para simular envio em tempo real
async function simularTempoReal() {
    console.log('\n🔄 Simulando envio em tempo real (a cada 3 segundos)...\n');
    console.log('💡 Abra o dashboard em: http://localhost:1880/ui');
    console.log('📱 Veja os dados chegando em tempo real!\n');
    
    let contador = 0;
    
    const intervalo = setInterval(async () => {
        contador++;
        
        // Criar dados únicos a cada iteração
        const dados = {
            data: {
                id: Date.now(),
                nome: `Produto Tempo Real ${contador}`,
                valor: Math.random() * 1000 + 50,
                categoria: ['Eletrônicos', 'Informática', 'Acessórios'][Math.floor(Math.random() * 3)],
                fornecedor: `Fornecedor ${contador}`,
                estoque: Math.floor(Math.random() * 100) + 1,
                descricao: `Descrição do produto ${contador}`
            }
        };
        
        console.log(`📤 Enviando dados #${contador}: ${dados.data.nome}`);
        await enviarDados(dados);
        
        // Parar após 10 envios
        if (contador >= 10) {
            clearInterval(intervalo);
            console.log('\n🎉 Simulação em tempo real concluída!');
            console.log('💡 Continue enviando dados da sua API Java real!');
        }
    }, 3000);
}

// Função para mostrar instruções do dashboard
function mostrarInstrucoesDashboard() {
    console.log('\n📱 INSTRUÇÕES DO DASHBOARD:\n');
    
    console.log('1️⃣ Acesse o dashboard:');
    console.log(`   🌐 http://localhost:1880/ui\n`);
    
    console.log('2️⃣ O que você verá:');
    console.log('   📥 Dados Recebidos - Últimos dados da sua API Java');
    console.log('   🔄 Status do Sistema - Status em tempo real');
    console.log('   💰 Valores - Gauge com valor atual');
    console.log('   📊 Estatísticas - Contadores e gráficos');
    console.log('   📝 Logs - Dados processados\n');
    
    console.log('3️⃣ Como funciona:');
    console.log('   - Sua API Java envia dados via POST /api/receive');
    console.log('   - Node-RED recebe e processa os dados');
    console.log('   - Dashboard atualiza automaticamente');
    console.log('   - Nada é salvo no banco, apenas visualização\n');
    
    console.log('4️⃣ Para testar:');
    console.log('   - Execute este script: node examples/test-visualizacao.js');
    console.log('   - Ou envie dados da sua API Java real');
    console.log('   - Veja o dashboard atualizando em tempo real\n');
}

// Função para mostrar como integrar com sua API Java
function mostrarIntegracaoJava() {
    console.log('☕ INTEGRAÇÃO COM SUA API JAVA:\n');
    
    console.log('// Exemplo Spring Boot - Enviar dados para Node-RED');
    console.log('@RestController');
    console.log('@RequestMapping("/api")');
    console.log('public class MonitoramentoController {');
    console.log('    ');
    console.log('    @PostMapping("/enviar-dados")');
    console.log('    public ResponseEntity<String> enviarDados(@RequestBody ProdutoDTO produto) {');
    console.log('        // Enviar dados para Node-RED para visualização');
    console.log('        String nodeRedUrl = "http://localhost:1880/api/receive";');
    console.log('        ');
    console.log('        Map<String, Object> payload = new HashMap<>();');
    console.log('        payload.put("data", produto);');
    console.log('        ');
    console.log('        ResponseEntity<Map> response = restTemplate.postForEntity(nodeRedUrl, payload, Map.class);');
    console.log('        ');
    console.log('        if (response.getStatusCode() == HttpStatus.OK) {');
    console.log('            return ResponseEntity.ok("Dados enviados para visualização no Node-RED");');
    console.log('        }');
    console.log('        ');
    console.log('        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)');
    console.log('                           .body("Erro ao enviar dados");');
    console.log('    }');
    console.log('}');
    console.log('');
    
    console.log('// DTO para enviar dados');
    console.log('public class ProdutoDTO {');
    console.log('    private Long id;');
    console.log('    private String nome;');
    console.log('    private BigDecimal valor;');
    console.log('    private String categoria;');
    console.log('    private String fornecedor;');
    console.log('    private Integer estoque;');
    console.log('    private String descricao;');
    console.log('    // getters e setters');
    console.log('}');
}

// Função principal
async function main() {
    console.log('🎯 TESTADOR DE VISUALIZAÇÃO NODE-RED\n');
    
    // Verificar se o Node-RED está rodando
    try {
        await axios.get(`${NODE_RED_URL}`, { timeout: 5000 });
        console.log('✅ Node-RED está rodando!\n');
    } catch (error) {
        console.log('❌ Node-RED não está rodando!');
        console.log('   Certifique-se de que está executando em http://localhost:1880\n');
        return;
    }
    
    // Mostrar instruções
    mostrarInstrucoesDashboard();
    
    // Perguntar tipo de teste
    console.log('🔍 Escolha o tipo de teste:');
    console.log('1️⃣ Envio único de dados');
    console.log('2️⃣ Simulação em tempo real');
    console.log('3️⃣ Ver apenas instruções\n');
    
    // Simular envio único primeiro
    console.log('🚀 Iniciando teste de envio único...\n');
    await simularEnvioContinuo();
    
    // Perguntar se quer continuar com tempo real
    console.log('\n🔄 Deseja continuar com simulação em tempo real? (s/n)');
    console.log('💡 Isso vai enviar dados a cada 3 segundos para você ver o dashboard atualizando...\n');
    
    // Simular tempo real
    await simularTempoReal();
    
    // Mostrar integração com Java
    mostrarIntegracaoJava();
    
    console.log('\n🎉 Teste concluído!');
    console.log('💡 Agora use sua API Java real para enviar dados!');
}

// Executar se chamado diretamente
if (require.main === module) {
    main().catch(error => {
        console.error('\n💥 Erro fatal:', error.message);
        process.exit(1);
    });
}

module.exports = {
    enviarDados,
    simularEnvioContinuo,
    simularTempoReal
};

