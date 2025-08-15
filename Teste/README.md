# Node-RED para Integração com APIs REST e Banco de Dados

Este projeto demonstra como configurar o Node-RED para receber dados de APIs REST e integrar com diferentes tipos de banco de dados.

## 🚀 Funcionalidades

- **Recebimento de dados** via HTTP POST
- **Validação e processamento** de dados recebidos
- **Integração com banco de dados** (MySQL, PostgreSQL, MongoDB)
- **Polling automático** de APIs externas
- **Dashboard visual** para monitoramento
- **Logs e debug** para troubleshooting

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Banco de dados configurado (MySQL, PostgreSQL ou MongoDB)
- API REST funcionando (Java/Spring Boot)

## 🛠️ Instalação

1. **Clone o projeto e instale as dependências:**
```bash
npm install
```

2. **Configure as variáveis de ambiente:**
```bash
# Crie um arquivo .env
cp .env.example .env
# Edite com suas configurações
```

3. **Configure o banco de dados:**
```sql
-- Exemplo para MySQL
CREATE TABLE dados_api (
    id BIGINT PRIMARY KEY,
    nome VARCHAR(255),
    valor DECIMAL(10,2),
    categoria VARCHAR(100),
    processado_em DATETIME,
    metadata JSON
);

CREATE TABLE dados_polling (
    id BIGINT PRIMARY KEY,
    nome VARCHAR(255),
    valor DECIMAL(10,2),
    categoria VARCHAR(100),
    processado_em DATETIME,
    origem VARCHAR(50)
);
```

## ⚙️ Configuração

### 1. Configurações do Banco de Dados

Edite o arquivo `settings.js` com suas configurações:

```javascript
functionGlobalContext: {
    dbConfig: {
        host: "localhost",
        port: 3306,
        database: "seu_banco",
        user: "usuario",
        password: "senha"
    }
}
```

### 2. Configurações da API

```javascript
functionGlobalContext: {
    apiBaseUrl: "http://localhost:8080/api"
}
```

### 3. Configurações de Segurança

```javascript
httpNodeAuth: {
    user: "admin",
    pass: "sua_senha_segura"
}
```

## 🔄 Como Funciona

### Fluxo Principal

1. **Recebimento de Dados** (`http-in-1`)
   - Endpoint: `POST /api/receive`
   - Recebe dados da sua API Java

2. **Validação** (`function-validate-1`)
   - Verifica se os dados são válidos
   - Adiciona timestamp

3. **Processamento** (`function-process-1`)
   - Transforma os dados recebidos
   - Adiciona metadados

4. **Armazenamento** (`db-insert-1`)
   - Insere no banco de dados
   - Pode enviar para outras APIs

5. **Resposta** (`http-response-1`)
   - Retorna confirmação de sucesso

### Fluxo de Polling

1. **Agendador** (`schedule-trigger-1`)
   - Executa a cada 5 minutos (300 segundos)

2. **Requisição** (`http-request-poll-1`)
   - Faz GET para sua API Java

3. **Processamento** (`function-process-poll-1`)
   - Processa dados recebidos

4. **Inserção** (`db-batch-insert-1`)
   - Salva no banco em lote

## 📡 Endpoints Disponíveis

### Receber Dados
```
POST /api/receive
Content-Type: application/json

{
    "data": {
        "id": 123,
        "nome": "Produto A",
        "valor": 99.99,
        "categoria": "Eletrônicos"
    }
}
```

### Resposta de Sucesso
```json
{
    "success": true,
    "message": "Dados processados com sucesso",
    "data": {
        "id": 123,
        "nome": "Produto A",
        "valor": 99.99,
        "categoria": "Eletrônicos",
        "processado_em": "2024-01-15T10:30:00.000Z"
    },
    "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🗄️ Integração com Banco de Dados

### MySQL
```javascript
// Configuração no Node-RED
{
    "type": "mysql-config",
    "name": "Configuração MySQL",
    "host": "localhost",
    "port": "3306",
    "db": "seu_banco",
    "charset": "UTF8"
}
```

### PostgreSQL
```javascript
// Instale: npm install node-red-contrib-postgresql
{
    "type": "postgresql",
    "name": "Inserir no PostgreSQL",
    "sql": "INSERT INTO dados_api (id, nome, valor) VALUES ($1, $2, $3)"
}
```

### MongoDB
```javascript
// Instale: npm install node-red-contrib-mongodb
{
    "type": "mongodb",
    "name": "Inserir no MongoDB",
    "operation": "insert",
    "collection": "dados_api"
}
```

## 🔧 Personalização

### Adicionar Novos Campos

Edite a função `function-process-1`:

```javascript
msg.payload.processed = {
    // ... campos existentes ...
    novo_campo: data.novo_campo || 'valor_padrao',
    calculado: data.valor * 1.1 // Exemplo de cálculo
};
```

### Modificar Validação

Edite a função `function-validate-1`:

```javascript
if (msg.payload && msg.payload.data && msg.payload.data.nome) {
    // Validação personalizada
    if (msg.payload.data.valor > 0) {
        return msg;
    }
}
```

### Alterar Frequência de Polling

No nó `schedule-trigger-1`:
- **300** = 5 minutos
- **600** = 10 minutos
- **3600** = 1 hora

## 🚀 Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Acesse
- **Editor Node-RED**: http://localhost:1880
- **Dashboard**: http://localhost:1880/ui
- **API Endpoint**: http://localhost:1880/api/receive

## 📊 Monitoramento

### Logs
- Use o nó `debug` para ver dados em tempo real
- Logs são exibidos no console e na aba Debug

### Dashboard
- Visualize dados em tempo real
- Gráficos e tabelas configuráveis
- Métricas de performance

## 🔒 Segurança

### Autenticação
```javascript
httpNodeAuth: {
    user: "admin",
    pass: "senha_hash_bcrypt"
}
```

### CORS
```javascript
httpNodeCors: {
    origin: "http://seu-dominio.com",
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"
}
```

### Rate Limiting
```javascript
// Adicione middleware de rate limiting
const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 requests por IP
}));
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de Conexão com Banco**
   - Verifique credenciais
   - Teste conectividade
   - Verifique firewall

2. **Dados Não Chegando**
   - Verifique logs do Node-RED
   - Teste endpoint com Postman
   - Verifique CORS

3. **Erro de Parsing JSON**
   - Valide formato dos dados
   - Verifique encoding
   - Use try-catch nas funções

### Debug
```javascript
// Adicione logs nas funções
node.log('Dados recebidos:', msg.payload);
node.error('Erro:', error);
node.warn('Aviso:', warning);
```

## 📚 Recursos Adicionais

- [Documentação oficial Node-RED](https://nodered.org/docs/)
- [Node-RED Contrib](https://flows.nodered.org/)
- [Exemplos de fluxos](https://flows.nodered.org/collection/flow-library)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
