Esse projeto foi feito com o intuito de resolver um problema:
O Problema
"Não consigo visualizar a minha evolução por matéria nos simulados do Banco do Brasil. A falta de detalhe nos dados impede identificar em quais disciplinas o desempenho está abaixo da meta, dificultando o ajuste de foco nos estudos.

Sou o tipo de pessoa que constantemente miro no problema, então ter uma ferramenta que me ajude a identificar meus pontos fracos é a melhor arma que eu posso ter para a aprovação em concursos.

Stacks usadas para o projeto:

| Camada           | Tecnologia             | Observação Técnica                                                                         |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| Front-end        | React JS + CSS/HTML    | Foco inicial na lógica de componentes e estado.                                            |
| Back-end/BaaS    | Supabase (PostgreSQL)  | Escolha estratégica para acelerar o MVP sem perder o poder do SQL.                         |
| Linguagem        | JavaScript (ES6+)      | Consistência em todo o ecossistema.                                                        |
| Design           | Figma + Nano Banana    | [https://www.figma.com/make/epIH7yrS55mebmNzVPWppk/Contest-Dashboard?t=rXItybMb2WG0pMxd-1] |

Modelagem de Dados (PostgreSQL)
A estrutura abaixo respeita a Normalização de Dados e a relação N:N entre Simulados e Disciplinas.

Tabelas do Sistema
|Tabela            |Atributos (Campos)                    |Tipo / Restrição|
|------------------|--------------------------------------|------------------------|
|Tabela_Simulados  |id, data, nome_simulado               |UUID, DATE, VARCHAR|
|Tabela_Disciplinas|id, nome                              |SERIAL, VARCHAR (ex: Informática)|
|Tabela_Acertos    |simulado_id, disciplina_id, quantidade|FKs, INT (Validação: > 0)|

A Tabela_Acertos é a nossa entidade associativa. Ela garante que um simulado possa ter várias disciplinas e que uma disciplina apareça em vários simulados.

Camada de Segurança
- Blindagem Contra SQL Injection - Risco: Inserção de comandos maliciosos via campos de input do formulário.
Solução: Implementar Prepared Statements (SQL Pré-compilada). Nunca concatenar strings de entrada diretamente nas queries.

- Princípio do Menor Privilégio - Não utilizar o superusuário "postgres" na aplicação. Criar um utilizador "app_user" com permissões restritas apenas às tabelas necessárias.

- Validação em Duas Camadas:
1. Front-end: RegEx e sanitização para evitar scripts XSS.  
2. Back-end/DB: Constraints "NOT NULL" e tipos de dados rígidos para garantir integridade.    

Registo de impedimentos e soluções técnicas:
- Data 19/04: Início do planejamento. Decidido o uso de Supabase para focar na lógica de Front-end e Modelagem;
- Data 26/04: Pausa para assistir as aulas da [[Faculdade]] da unidade 2 - Modelos de Dados, para entender sobre Chaves Primárias e Chaves Estrangeiras;
- Data 03/05: Finalização do modelo lógico do BD;
- Data 05/05: Finalização do protótipo de design do site, estou pronto para codar...
