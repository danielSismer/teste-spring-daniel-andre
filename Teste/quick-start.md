# 🚀 Guia de Início Rápido - Node-RED + API REST

Este guia te ajudará a configurar e executar o Node-RED para integração com APIs REST em **5 minutos**!

## ⚡ Instalação Rápida

### 1. Pré-requisitos
- ✅ Node.js 16+ instalado
- ✅ Docker (opcional, mas recomendado)
- ✅ Git

### 2. Clone e Instale
```bash
# Clone o projeto
git clone <seu-repositorio>
cd node-red-api-integration

# Instale as dependências
npm install
```

### 3. Configure o Banco de Dados

#### Opção A: Docker (Recomendado)
```bash
# Inicie apenas MySQL + Node-RED
docker-compose up -d mysql nodered

# Aguarde 30 segundos para o banco inicializar
sleep 30
```

#### Opção B: Banco Local
```bash
# Execute o script SQL no seu MySQL
mysql -u root -p < scripts/setup-database.sql
```

### 4. Configure as Variáveis
```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite com suas configurações
notepad .env  # Windows
# ou
nano .env     # Linux/Mac
```

### 5. Execute o Node-RED
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🌐 Acesse e Configure

### 1. Abra o Editor
- **URL**: http://localhost:1880
- **Usuário**: admin
- **Senha**: password123

### 2. Importe o Fluxo
- Clique no menu (☰) → Import
- Cole o conteúdo do arquivo `flows.json`
- Clique em "Import"

### 3. Configure o Banco
- Clique no nó "Configuração MySQL"
- Preencha suas credenciais
- Clique em "Done"

### 4. Deploy
- Clique no botão "Deploy" (vermelho)
- Aguarde a mensagem "Deployed successfully"

## 🧪 Teste a Integração

### 1. Execute o Script de Teste
```bash
# Instale axios se necessário
npm install axios

# Execute os testes
node examples/test-api.js
```

### 2. Teste Manual com Postman/cURL
```bash
curl -X POST http://localhost:1880/api/receive \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "id": 123,
      "nome": "Produto Teste",
      "valor": 99.99,
      "categoria": "Teste"
    }
  }'
```

### 3. Verifique o Banco
```bash
# Acesse o banco
docker exec -it nodered-mysql mysql -u nodered_user -p node_red_integration

# Consulte os dados
SELECT * FROM dados_api;
```

## 📊 Monitoramento

### 1. Dashboard
- **URL**: http://localhost:1880/ui
- Visualize dados em tempo real

### 2. Logs
- **Console**: Veja logs no terminal
- **Debug**: Aba Debug no editor Node-RED

### 3. Métricas
- **Endpoint**: http://localhost:1880/metrics
- **Status**: http://localhost:1880/health

## 🔧 Personalização Rápida

### 1. Alterar Endpoint
- Edite o nó "Receber Dados da API"
- Mude a URL de `/api/receive` para o que desejar

### 2. Adicionar Campos
- Edite a função "Processar Dados"
- Adicione novos campos ao `msg.payload.processed`

### 3. Mudar Banco
- Substitua o nó MySQL por PostgreSQL/MongoDB
- Configure as credenciais

### 4. Alterar Frequência de Polling
- Edite o nó "Agendador"
- Mude o valor "300" (5 min) para o desejado

## 🚨 Solução de Problemas

### Node-RED não inicia
```bash
# Verifique se a porta está livre
netstat -an | findstr 1880  # Windows
netstat -an | grep 1880     # Linux/Mac

# Mude a porta no settings.js
uiPort: 1881
```

### Erro de conexão com banco
```bash
# Teste conectividade
telnet localhost 3306

# Verifique credenciais no settings.js
# Reinicie o Node-RED após mudanças
```

### Dados não chegam
```bash
# Verifique logs
docker-compose logs -f nodered

# Teste endpoint
curl http://localhost:1880/api/receive
```

### Erro de CORS
```bash
# Edite settings.js
httpNodeCors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS"
}
```

## 📱 Integração com Java

### 1. Configure sua API Java
```java
// Exemplo Spring Boot
@RestController
@RequestMapping("/api")
public class DataController {
    
    @PostMapping("/send")
    public ResponseEntity<String> sendData(@RequestBody DataDTO data) {
        // Envie para Node-RED
        String nodeRedUrl = "http://localhost:1880/api/receive";
        // ... implementação
    }
}
```

### 2. Teste a Integração
```bash
# Sua API Java envia para Node-RED
POST http://localhost:8080/api/send

# Node-RED recebe e processa
POST http://localhost:1880/api/receive
```

## 🎯 Próximos Passos

### 1. Produção
- Configure HTTPS
- Use variáveis de ambiente
- Implemente autenticação
- Configure backup automático

### 2. Monitoramento
- Adicione Prometheus + Grafana
- Configure alertas
- Implemente health checks

### 3. Escalabilidade
- Use Redis para cache
- Implemente load balancing
- Configure clusters

## 📞 Suporte

- **Documentação**: README.md
- **Issues**: GitHub Issues
- **Comunidade**: Node-RED Forum

---

## ⏱️ Checklist de 5 Minutos

- [ ] ✅ Instalar dependências (`npm install`)
- [ ] ✅ Configurar banco (Docker ou local)
- [ ] ✅ Editar `.env` com suas configurações
- [ ] ✅ Executar Node-RED (`npm run dev`)
- [ ] ✅ Importar fluxo no editor
- [ ] ✅ Configurar credenciais do banco
- [ ] ✅ Fazer deploy
- [ ] ✅ Testar com script ou Postman
- [ ] ✅ Verificar dados no banco

**🎉 Pronto! Seu Node-RED está funcionando e integrado com APIs REST!**
