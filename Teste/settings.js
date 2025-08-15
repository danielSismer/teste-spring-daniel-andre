module.exports = {
    // Configurações básicas do Node-RED
    uiPort: process.env.PORT || 1880,
    
    // Configurações de segurança
    httpNodeAuth: {
        user: "admin",
        pass: "password123"
    },
    
    // Configurações de CORS para APIs
    httpNodeCors: {
        origin: "*",
        methods: "GET,PUT,POST,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization"
    },
    
    // Configurações de logging
    logging: {
        console: {
            level: "info",
            metrics: false
        },
        file: {
            level: "info",
            metrics: false,
            maxFiles: 5
        }
    },
    
    // Configurações de editor
    editorTheme: {
        projects: {
            enabled: false
        }
    },
    
    // Configurações de função global
    functionGlobalContext: {
        // Variáveis globais que podem ser usadas em funções
        apiBaseUrl: "http://localhost:8080/api",
        dbConfig: {
            host: "localhost",
            port: 3306,
            database: "seu_banco",
            user: "usuario",
            password: "senha"
        }
    },
    
    // Configurações de credenciais
    credentialSecret: "sua_chave_secreta_aqui",
    
    // Configurações de dashboard
    dashboardUI: {
        path: "/ui",
        title: "Dashboard de Integração",
        favicon: "/favicon.ico",
        cssFile: "/css/style.css"
    }
};
