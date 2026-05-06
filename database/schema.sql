CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tabela_simulado (
simulado_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
simulado_nome VARCHAR(100) NOT NULL,
data TIMESTAMP DEFAULT NOW ());

CREATE TABLE tabela_disciplina (
disciplina_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
disciplina_nome VARCHAR(50) NOT NULL);

CREATE TABLE tabela_acerto (
simulado_id UUID REFERENCES tabela_simulado(simulado_id) ON DELETE CASCADE,
disciplina_id UUID REFERENCES tabela_disciplina(disciplina_id) ON DELETE CASCADE,
questoes_total INT DEFAULT 0 CHECK (questoes_total >= 0),
questoes_corretas INT DEFAULT 0 CHECK (questoes_corretas >= 0 AND questoes_total >= questoes_corretas),
PRIMARY KEY (simulado_id, disciplina_id));


