# 🔍 GUIA RÁPIDO - Como Consultar Dados no Node-RED

## 📋 O que você pode consultar

### 1. **Todos os Dados**
```
GET http://localhost:1880/api/consultar
```
**Retorna:** Lista completa de todos os registros salvos

### 2. **Por ID Específico**
```
GET http://localhost:1880/api/consultar/123
```
**Retorna:** Apenas o registro com ID 123

### 3. **Por Categoria**
```
GET http://localhost:1880/api/consultar/categoria/Eletrônicos
```
**Retorna:** Todos os produtos da categoria "Eletrônicos"

### 4. **Estatísticas Gerais**
```
GET http://localhost:1880/api/estatisticas
```
**Retorna:** Contadores, valores médios, totais, etc.

### 5. **Buscar por Nome**
```
GET http://localhost:1880/api/buscar?q=Smartphone
```
**Retorna:** Produtos que contenham "Smartphone" no nome

## 🚀 Como usar

### **Opção 1: Navegador**
- Abra o navegador
- Digite a URL (ex: `http://localhost:1880/api/consultar`)
- Pressione Enter
- Veja os dados em formato JSON

### **Opção 2: cURL (Terminal)**
```bash
# Consultar todos
curl http://localhost:1880/api/consultar

# Consultar por ID
curl http://localhost:1880/api/consultar/123

# Consultar por categoria
curl http://localhost:1880/api/consultar/categoria/Eletrônicos

# Buscar por nome
curl "http://localhost:1880/api/buscar?q=Smartphone"
```

### **Opção 3: Postman**
1. Abra o Postman
2. Crie uma nova requisição GET
3. Digite a URL
4. Clique em "Send"
5. Veja a resposta

### **Opção 4: Sua API Java**
```java
// Exemplo Spring Boot
@GetMapping("/produtos")
public ResponseEntity<List<Produto>> getProdutos() {
    String url = "http://localhost:1880/api/consultar";
    ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
    
    if (response.getStatusCode() == HttpStatus.OK) {
        Map<String, Object> data = response.getBody();
        List<Produto> produtos = (List<Produto>) data.get("data");
        return ResponseEntity.ok(produtos);
    }
    
    return ResponseEntity.notFound().build();
}
```

## 📊 Exemplos de Resposta

### Consultar Todos
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": 1001,
            "nome": "Smartphone Galaxy S23",
            "valor": 2999.99,
            "categoria": "Eletrônicos",
            "processado_em": "2024-01-15T10:30:00.000Z"
        }
    ],
    "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Estatísticas
```json
{
    "success": true,
    "estatisticas": {
        "total_registros": 3,
        "total_categorias": 2,
        "valor_medio": "2599.99",
        "valor_total": "7799.97",
        "valor_minimo": "199.99",
        "valor_maximo": "4599.99"
    }
}
```

## 🔧 Configuração no Node-RED

### 1. **Importar o Fluxo**
- Abra o Node-RED: http://localhost:1880
- Clique no menu (☰) → Import
- Cole o conteúdo do arquivo `flows-consultas.json`
- Clique em "Import"

### 2. **Configurar Banco**
- Clique no nó "Configuração MySQL"
- Preencha suas credenciais
- Clique em "Done"

### 3. **Deploy**
- Clique no botão "Deploy" (vermelho)
- Aguarde "Deployed successfully"

## 🧪 Testar as Consultas

### **Execute o Script de Teste**
```bash
# Instalar axios se necessário
npm install axios

# Executar testes
node examples/test-consultas.js
```

### **Teste Manual**
```bash
# 1. Primeiro, envie alguns dados
curl -X POST http://localhost:1880/api/receive \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "id": 1001,
      "nome": "Produto Teste",
      "valor": 99.99,
      "categoria": "Teste"
    }
  }'

# 2. Depois consulte
curl http://localhost:1880/api/consultar
```

## 📱 Integração com Java

### **Controller Completo**
```java
@RestController
@RequestMapping("/api")
public class ProdutoController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    private final String NODE_RED_URL = "http://localhost:1880";
    
    // Buscar todos os produtos
    @GetMapping("/produtos")
    public ResponseEntity<List<Produto>> getAllProdutos() {
        String url = NODE_RED_URL + "/api/consultar";
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        
        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> data = response.getBody();
            List<Produto> produtos = (List<Produto>) data.get("data");
            return ResponseEntity.ok(produtos);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Buscar produto por ID
    @GetMapping("/produtos/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
        String url = NODE_RED_URL + "/api/consultar/" + id;
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        
        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> data = response.getBody();
            Produto produto = (Produto) data.get("data");
            return ResponseEntity.ok(produto);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Buscar por categoria
    @GetMapping("/produtos/categoria/{categoria}")
    public ResponseEntity<List<Produto>> getProdutosByCategoria(@PathVariable String categoria) {
        String url = NODE_RED_URL + "/api/consultar/categoria/" + categoria;
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        
        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> data = response.getBody();
            List<Produto> produtos = (List<Produto>) data.get("data");
            return ResponseEntity.ok(produtos);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Buscar por nome
    @GetMapping("/produtos/buscar")
    public ResponseEntity<List<Produto>> searchProdutos(@RequestParam String q) {
        String url = NODE_RED_URL + "/api/buscar?q=" + q;
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        
        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> data = response.getBody();
            List<Produto> produtos = (List<Produto>) data.get("data");
            return ResponseEntity.ok(produtos);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Obter estatísticas
    @GetMapping("/produtos/estatisticas")
    public ResponseEntity<Map> getEstatisticas() {
        String url = NODE_RED_URL + "/api/estatisticas";
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        
        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok(response.getBody());
        }
        
        return ResponseEntity.notFound().build();
    }
}
```

## 🎯 Resumo dos Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/api/consultar` | Todos os dados |
| GET | `/api/consultar/:id` | Por ID específico |
| GET | `/api/consultar/categoria/:categoria` | Por categoria |
| GET | `/api/estatisticas` | Estatísticas gerais |
| GET | `/api/buscar?q=termo` | Buscar por nome |

## 🚨 Solução de Problemas

### **Erro 404**
- Verifique se o fluxo foi importado
- Confirme se fez deploy
- Verifique se a URL está correta

### **Erro de Conexão**
- Verifique se o Node-RED está rodando
- Confirme se a porta 1880 está livre
- Teste: `curl http://localhost:1880`

### **Dados Vazios**
- Primeiro envie dados via POST `/api/receive`
- Depois consulte via GET
- Verifique os logs do Node-RED

---

## ⏱️ Checklist Rápido

- [ ] ✅ Importar fluxo `flows-consultas.json`
- [ ] ✅ Configurar credenciais do banco
- [ ] ✅ Fazer deploy
- [ ] ✅ Testar com script: `node examples/test-consultas.js`
- [ ] ✅ Integrar no seu Java

**🎉 Pronto! Agora você pode consultar todos os dados salvos no banco!**
