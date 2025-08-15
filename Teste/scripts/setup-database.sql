-- Script para configurar o banco de dados para integração com Node-RED
-- Execute este script no seu banco de dados MySQL/PostgreSQL

-- Criar banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS node_red_integration;
USE node_red_integration;

-- Tabela para dados recebidos via API
CREATE TABLE IF NOT EXISTS dados_api (
    id BIGINT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) DEFAULT 0.00,
    categoria VARCHAR(100) DEFAULT 'Geral',
    processado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria),
    INDEX idx_processado_em (processado_em),
    INDEX idx_valor (valor)
);

-- Tabela para dados recebidos via polling
CREATE TABLE IF NOT EXISTS dados_polling (
    id BIGINT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) DEFAULT 0.00,
    categoria VARCHAR(100) DEFAULT 'Geral',
    processado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    origem VARCHAR(50) DEFAULT 'POLLING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_origem (origem),
    INDEX idx_processado_em (processado_em)
);

-- Tabela para logs de processamento
CREATE TABLE IF NOT EXISTS logs_processamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    mensagem TEXT,
    dados_recebidos JSON,
    status VARCHAR(20) DEFAULT 'SUCCESS',
    erro TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tipo (tipo),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Tabela para configurações do sistema
CREATE TABLE IF NOT EXISTS config_sistema (
    chave VARCHAR(100) PRIMARY KEY,
    valor TEXT,
    descricao TEXT,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir configurações padrão
INSERT INTO config_sistema (chave, valor, descricao) VALUES
('api_version', '1.0', 'Versão da API'),
('polling_interval', '300', 'Intervalo de polling em segundos'),
('max_retry_attempts', '3', 'Número máximo de tentativas de retry'),
('log_retention_days', '30', 'Dias para manter logs'),
('batch_size', '100', 'Tamanho do lote para inserção em massa')
ON DUPLICATE KEY UPDATE
    valor = VALUES(valor),
    descricao = VALUES(descricao);

-- Criar usuário para Node-RED (ajuste conforme necessário)
-- CREATE USER 'nodered_user'@'localhost' IDENTIFIED BY 'sua_senha_segura';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON node_red_integration.* TO 'nodered_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Inserir dados de exemplo
INSERT INTO dados_api (id, nome, valor, categoria, metadata) VALUES
(1, 'Produto A', 99.99, 'Eletrônicos', '{"fornecedor": "Fornecedor A", "estoque": 50}'),
(2, 'Produto B', 149.99, 'Informática', '{"fornecedor": "Fornecedor B", "estoque": 25}'),
(3, 'Produto C', 29.99, 'Acessórios', '{"fornecedor": "Fornecedor C", "estoque": 100}');

-- Criar view para estatísticas
CREATE OR REPLACE VIEW vw_estatisticas AS
SELECT 
    categoria,
    COUNT(*) as total_produtos,
    AVG(valor) as valor_medio,
    SUM(valor) as valor_total,
    MIN(valor) as valor_minimo,
    MAX(valor) as valor_maximo
FROM dados_api 
GROUP BY categoria;

-- Criar view para logs recentes
CREATE OR REPLACE VIEW vw_logs_recentes AS
SELECT 
    tipo,
    status,
    mensagem,
    created_at
FROM logs_processamento 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
ORDER BY created_at DESC;

-- Criar procedimento para limpeza de logs antigos
DELIMITER //
CREATE PROCEDURE LimparLogsAntigos(IN dias INT)
BEGIN
    DELETE FROM logs_processamento 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL dias DAY);
    
    SELECT ROW_COUNT() as registros_removidos;
END //
DELIMITER ;

-- Criar trigger para atualizar updated_at
DELIMITER //
CREATE TRIGGER tr_dados_api_update 
BEFORE UPDATE ON dados_api
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER tr_dados_polling_update 
BEFORE UPDATE ON dados_polling
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- Mostrar estrutura das tabelas criadas
SHOW TABLES;
DESCRIBE dados_api;
DESCRIBE dados_polling;
DESCRIBE logs_processamento;
DESCRIBE config_sistema;

-- Mostrar configurações padrão
SELECT * FROM config_sistema;

-- Mostrar dados de exemplo
SELECT * FROM dados_api LIMIT 5;
