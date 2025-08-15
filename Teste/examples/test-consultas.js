// Script para testar as consultas do Node-RED
// Execute: node examples/test-consultas.js

const axios = require('axios');

// Configurações
const NODE_RED_URL = 'http://localhost:1880';

// Função para testar consultas
async function testarConsultas() {
    console.log('🔍 Testando Consultas do Node-RED\n');

    try {
        // 1. Consultar todos os dados
        console.log('📋 1. Consultando todos os dados...');
        const response1 = await axios.get(`${NODE_RED_URL}/api/consultar`);
        console.log(`✅ Status: ${response1.status}`);
        console.log(`📊 Total de registros: ${response1.data.count}`);
        console.log(`📅 Último registro: ${response1.data.data[0]?.nome || 'Nenhum'}\n`);

        // 2. Consultar por ID (primeiro registro)
        if (response1.data.count > 0) {
            const primeiroId = response1.data.data[0].id;
            console.log(`🔍 2. Consultando registro com ID ${primeiroId}...`);
            const response2 = await axios.get(`${NODE_RED_URL}/api/consultar/${primeiroId}`);
            console.log(`✅ Status: ${response2.status}`);
            console.log(`📝 Nome: ${response2.data.data.nome}`);
            console.log(`💰 Valor: R$ ${response2.data.data.valor}\n`);
        }

        // 3. Consultar por categoria
        console.log('🏷️ 3. Consultando por categoria "Eletrônicos"...');
        const response3 = await axios.get(`${NODE_RED_URL}/api/consultar/categoria/Eletrônicos`);
        console.log(`✅ Status: ${response3.status}`);
        console.log(`📊 Total na categoria: ${response3.data.count}`);
        console.log(`💰 Valor total: R$ ${response3.data.valor_total}\n`);

        // 4. Consultar estatísticas
        console.log('📊 4. Consultando estatísticas gerais...');
        const response4 = await axios.get(`${NODE_RED_URL}/api/estatisticas`);
        console.log(`✅ Status: ${response4.status}`);
        const stats = response4.data.estatisticas;
        console.log(`📈 Total de registros: ${stats.total_registros}`);
        console.log(`🏷️ Total de categorias: ${stats.total_categorias}`);
        console.log(`💰 Valor médio: R$ ${stats.valor_medio}`);
        console.log(`💰 Valor total: R$ ${stats.valor_total}\n`);

        // 5. Buscar por nome
        console.log('🔍 5. Buscando produtos com "Smartphone"...');
        const response5 = await axios.get(`${NODE_RED_URL}/api/buscar?q=Smartphone`);
        console.log(`✅ Status: ${response5.status}`);
        console.log(`📊 Resultados encontrados: ${response5.data.count}`);
        if (response5.data.count > 0) {
            response5.data.data.forEach(item => {
                console.log(`   - ${item.nome} (R$ ${item.valor})`);
            });
        }
        console.log('');

        // 6. Testar busca com parâmetro vazio
        console.log('⚠️ 6. Testando busca sem parâmetro...');
        try {
            await axios.get(`${NODE_RED_URL}/api/buscar`);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('✅ Erro 400 recebido (esperado)');
                console.log(`📝 Mensagem: ${error.response.data.error}\n`);
            } else {
                console.log('❌ Erro inesperado');
            }
        }

        // 7. Testar ID inexistente
        console.log('❌ 7. Testando ID inexistente...');
        try {
            await axios.get(`${NODE_RED_URL}/api/consultar/99999`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('✅ Erro 404 recebido (esperado)');
                console.log(`📝 Mensagem: ${error.response.data.error}\n`);
            } else {
                console.log('❌ Erro inesperado');
            }
        }

        console.log('🎉 Todos os testes de consulta foram executados!');

    } catch (error) {
        console.error('❌ Erro durante os testes:', error.message);
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Dados:`, error.response.data);
        }
    }
}

// Função para mostrar exemplos de uso
function mostrarExemplos() {
    console.log('\n📚 EXEMPLOS DE USO DAS CONSULTAS:\n');
    
    console.log('1️⃣ Consultar todos os dados:');
    console.log(`   GET ${NODE_RED_URL}/api/consultar\n`);
    
    console.log('2️⃣ Consultar por ID:');
    console.log(`   GET ${NODE_RED_URL}/api/consultar/123\n`);
    
    console.log('3️⃣ Consultar por categoria:');
    console.log(`   GET ${NODE_RED_URL}/api/consultar/categoria/Eletrônicos\n`);
    
    console.log('4️⃣ Consultar estatísticas:');
    console.log(`   GET ${NODE_RED_URL}/api/estatisticas\n`);
    
    console.log('5️⃣ Buscar por nome:');
    console.log(`   GET ${NODE_RED_URL}/api/buscar?q=Smartphone\n`);
    
    console.log('6️⃣ Usando cURL:');
    console.log(`   curl ${NODE_RED_URL}/api/consultar`);
    console.log(`   curl ${NODE_RED_URL}/api/estatisticas`);
    console.log(`   curl "${NODE_RED_URL}/api/buscar?q=Notebook"\n`);
    
    console.log('7️⃣ Usando Postman:');
    console.log('   - Crie uma nova requisição GET');
    console.log('   - Use as URLs acima');
    console.log('   - Execute e veja os resultados\n');
}

// Função para mostrar como usar no Java
function mostrarExemploJava() {
    console.log('☕ EXEMPLO DE USO NO JAVA:\n');
    
    console.log('// Usando RestTemplate (Spring Boot)');
    console.log('@RestController');
    console.log('@RequestMapping("/api")');
    console.log('public class ConsultaController {');
    console.log('    ');
    console.log('    @Autowired');
    console.log('    private RestTemplate restTemplate;');
    console.log('    ');
    console.log('    @GetMapping("/produtos")');
    console.log('    public ResponseEntity<List<Produto>> getProdutos() {');
    console.log('        String url = "http://localhost:1880/api/consultar";');
    console.log('        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);');
    console.log('        ');
    console.log('        if (response.getStatusCode() == HttpStatus.OK) {');
    console.log('            Map<String, Object> data = response.getBody();');
    console.log('            List<Produto> produtos = (List<Produto>) data.get("data");');
    console.log('            return ResponseEntity.ok(produtos);');
    console.log('        }');
    console.log('        ');
    console.log('        return ResponseEntity.notFound().build();');
    console.log('    }');
    console.log('    ');
    console.log('    @GetMapping("/produtos/categoria/{categoria}")');
    console.log('    public ResponseEntity<List<Produto>> getProdutosPorCategoria(');
    console.log('            @PathVariable String categoria) {');
    console.log('        String url = "http://localhost:1880/api/consultar/categoria/" + categoria;');
    console.log('        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);');
    console.log('        ');
    console.log('        if (response.getStatusCode() == HttpStatus.OK) {');
    console.log('            Map<String, Object> data = response.getBody();');
    console.log('            List<Produto> produtos = (List<Produto>) data.get("data");');
    console.log('            return ResponseEntity.ok(produtos);');
    console.log('        }');
    console.log('        ');
    console.log('        return ResponseEntity.notFound().build();');
    console.log('    }');
    console.log('}');
    console.log('');
    
    console.log('// Usando HttpClient (Java puro)');
    console.log('HttpClient client = HttpClient.newHttpClient();');
    console.log('HttpRequest request = HttpRequest.newBuilder()');
    console.log('    .uri(URI.create("http://localhost:1880/api/estatisticas"))');
    console.log('    .build();');
    console.log('');
    console.log('HttpResponse<String> response = client.send(request,');
    console.log('    HttpResponse.BodyHandlers.ofString());');
    console.log('');
    console.log('System.out.println("Status: " + response.statusCode());');
    console.log('System.out.println("Dados: " + response.body());');
}

// Função principal
async function main() {
    console.log('🚀 TESTADOR DE CONSULTAS NODE-RED\n');
    
    // Verificar se o Node-RED está rodando
    try {
        await axios.get(`${NODE_RED_URL}/health`, { timeout: 5000 });
        console.log('✅ Node-RED está rodando!\n');
    } catch (error) {
        console.log('❌ Node-RED não está rodando!');
        console.log('   Certifique-se de que está executando em http://localhost:1880\n');
        return;
    }
    
    // Executar testes
    await testarConsultas();
    
    // Mostrar exemplos
    mostrarExemplos();
    mostrarExemploJava();
}

// Executar se chamado diretamente
if (require.main === module) {
    main().catch(error => {
        console.error('\n💥 Erro fatal:', error.message);
        process.exit(1);
    });
}

module.exports = {
    testarConsultas,
    mostrarExemplos,
    mostrarExemploJava
};
