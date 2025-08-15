# 📱 GUIA COMPLETO - Visualização de Dados no Node-RED

## 🎯 **O QUE VOCÊ VAI TER**

✅ **Dashboard em tempo real** para visualizar dados da sua API Java  
✅ **Nenhum banco de dados** - apenas visualização  
✅ **Atualização automática** a cada novo dado recebido  
✅ **Estatísticas em tempo real** dos dados processados  
✅ **Logs detalhados** de todo o processamento  

## 🔄 **COMO FUNCIONA**

```
Sua API Java → Node-RED → Dashboard Visual → Nada é salvo
```

### **Fluxo Completo:**
1. **Sua API Java** envia dados via `POST /api/receive`
2. **Node-RED recebe** e processa os dados
3. **Dashboard atualiza** automaticamente com novos dados
4. **Estatísticas são calculadas** em tempo real
5. **Nada é persistido** - apenas visualização

## 🚀 **CONFIGURAÇÃO RÁPIDA**

### **1. Instalar Dependências**
```bash
npm install
```

### **2. Executar Node-RED**
```bash
npm run dev
```

### **3. Importar Fluxos**
- Abrir: http://localhost:1880
- Menu → Import → Cole `flows-visualizacao.json`
- Menu → Import → Cole `dashboard-config.json`
- Deploy

### **4. Acessar Dashboard**
- **URL**: http://localhost:1880/ui
- **Aba**: "Monitoramento API Java"

## 📱 **O QUE VOCÊ VERÁ NO DASHBOARD**

### **📥 Dados Recebidos**
- **Últimos dados** recebidos da sua API Java
- **Nome, valor, categoria** em tempo real
- **Timestamp** de quando foi recebido

### **🔄 Status do Sistema**
- **Status atual** do sistema
- **Origem** dos dados (API_JAVA)
- **Última atualização** em tempo real

### **💰 Valores**
- **Gauge visual** com valor atual
- **Cores dinâmicas** (verde, amarelo, vermelho)
- **Escala de 0 a R$ 10.000**

### **📊 Estatísticas**
- **Total de dados** recebidos
- **Valor total** acumulado
- **Valor médio** dos dados
- **Gráfico de pizza** por categoria

### **📝 Logs em Tempo Real**
- **Dados processados** em tempo real
- **Console de debug** no Node-RED
- **Histórico** de processamento

## 🧪 **TESTAR A VISUALIZAÇÃO**

### **Opção 1: Script de Teste**
```bash
# Instalar axios se necessário
npm install axios

# Executar teste completo
node examples/test-visualizacao.js
```

### **Opção 2: Teste Manual com cURL**
```bash
# Enviar dados para testar
curl -X POST http://localhost:1880/api/receive \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "id": 1001,
      "nome": "Produto Teste",
      "valor": 99.99,
      "categoria": "Teste",
      "fornecedor": "Fornecedor Teste",
      "estoque": 10,
      "descricao": "Produto para teste"
    }
  }'
```

### **Opção 3: Sua API Java Real**
```java
// Enviar dados da sua API Java
POST http://localhost:1880/api/receive
{
    "data": {
        "id": seuId,
        "nome": "Seu Produto",
        "valor": 199.99,
        "categoria": "Sua Categoria"
    }
}
```

## ☕ **INTEGRAÇÃO COM SUA API JAVA**

### **Controller Spring Boot**
```java
@RestController
@RequestMapping("/api")
public class MonitoramentoController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @PostMapping("/enviar-dados")
    public ResponseEntity<String> enviarDados(@RequestBody ProdutoDTO produto) {
        // Enviar dados para Node-RED para visualização
        String nodeRedUrl = "http://localhost:1880/api/receive";
        
        Map<String, Object> payload = new HashMap<>();
        payload.put("data", produto);
        
        ResponseEntity<Map> response = restTemplate.postForEntity(nodeRedUrl, payload, Map.class);
        
        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok("Dados enviados para visualização no Node-RED");
        }
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                           .body("Erro ao enviar dados");
    }
}
```

### **DTO para Enviar Dados**
```java
public class ProdutoDTO {
    private Long id;
    private String nome;
    private BigDecimal valor;
    private String categoria;
    private String fornecedor;
    private Integer estoque;
    private String descricao;
    
    // getters e setters
}
```

## 🔧 **PERSONALIZAÇÃO DO DASHBOARD**

### **Adicionar Novos Campos**
Edite a função `function-process-data`:

```javascript
msg.payload = {
    // ... campos existentes ...
    novo_campo: data.novo_campo || 'valor_padrao',
    campo_calculado: data.valor * 1.1
};
```

### **Criar Novos Widgets**
1. Adicione nós `ui_text`, `ui_gauge`, `ui_chart`
2. Configure grupos e posicionamento
3. Conecte com as funções de processamento

### **Modificar Cores e Estilo**
- Edite os nós `ui_gauge` para cores personalizadas
- Configure `ui_chart` para diferentes tipos de gráficos
- Ajuste tamanhos e layouts dos grupos

## 📊 **ESTATÍSTICAS DISPONÍVEIS**

### **Contadores Automáticos**
- **Total de dados** recebidos
- **Valor total** acumulado
- **Valor médio** dos dados
- **Contagem por categoria**

### **Dados em Tempo Real**
- **Última atualização** em tempo real
- **Status do sistema** (ATIVO/AGUARDANDO)
- **Origem dos dados** (API_JAVA)

### **Gráficos Dinâmicos**
- **Gráfico de pizza** por categoria
- **Gauges** para valores e contadores
- **Textos formatados** com dados processados

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Dashboard não atualiza**
- Verifique se o fluxo foi importado
- Confirme se fez deploy
- Verifique logs no console do Node-RED

### **Dados não chegam**
- Teste o endpoint: `curl http://localhost:1880/api/receive`
- Verifique se sua API Java está enviando dados
- Confirme formato JSON correto

### **Erro de CORS**
- Verifique configurações no `settings.js`
- Confirme se sua API Java pode acessar localhost:1880

### **Widgets não aparecem**
- Verifique se `dashboard-config.json` foi importado
- Confirme configuração dos grupos no dashboard
- Verifique se os nós estão conectados corretamente

## 🎯 **CENÁRIOS DE USO**

### **Monitoramento de Vendas**
```
1. Venda realizada → Java processa
2. Java envia dados para Node-RED
3. Dashboard mostra vendas em tempo real
4. Estatísticas atualizam automaticamente
5. Nada é salvo, apenas visualização
```

### **Monitoramento de Sistema**
```
1. Evento do sistema → Java captura
2. Java envia para Node-RED
3. Dashboard mostra status em tempo real
4. Alertas visuais automáticos
5. Logs de eventos em tempo real
```

### **Monitoramento de Sensores**
```
1. Sensor envia dados → Java recebe
2. Java processa e envia para Node-RED
3. Dashboard mostra valores em tempo real
4. Gráficos atualizam automaticamente
5. Histórico visual dos dados
```

## ⏱️ **CHECKLIST RÁPIDO**

- [ ] ✅ Instalar dependências (`npm install`)
- [ ] ✅ Executar Node-RED (`npm run dev`)
- [ ] ✅ Importar `flows-visualizacao.json`
- [ ] ✅ Importar `dashboard-config.json`
- [ ] ✅ Fazer deploy
- [ ] ✅ Acessar dashboard: http://localhost:1880/ui
- [ ] ✅ Testar com script: `node examples/test-visualizacao.js`
- [ ] ✅ Integrar com sua API Java

## 🎉 **RESULTADO FINAL**

**Você terá um sistema de visualização completo onde:**

✅ **Sua API Java** envia dados via `POST /api/receive`  
✅ **Node-RED** recebe e processa os dados  
✅ **Dashboard** atualiza automaticamente em tempo real  
✅ **Estatísticas** são calculadas dinamicamente  
✅ **Nada é salvo** no banco - apenas visualização  
✅ **Monitoramento completo** dos dados processados  

**🎯 É um sistema de visualização profissional sem persistência de dados!**

---

## 📞 **PRÓXIMOS PASSOS**

1. **Configure o sistema** seguindo este guia
2. **Teste com o script** fornecido
3. **Integre com sua API Java** real
4. **Personalize o dashboard** conforme suas necessidades
5. **Monitore em tempo real** os dados processados

**🚀 Agora você pode visualizar todos os dados da sua API Java em tempo real!**

