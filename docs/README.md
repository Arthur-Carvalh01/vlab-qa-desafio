# 🧪 Desafio Técnico QA - V-Lab

Este repositório contém a entrega técnica para o processo seletivo de Quality Assurance (QA) do V-Lab. O projeto engloba o planejamento de testes, cenários BDD, automação E2E utilizando Cypress e o reporte de bugs da Plataforma de Gestão de Fomento.

## 🎯 Escopo do Projeto
O foco principal desta entrega é garantir a qualidade e resiliência dos fluxos críticos da aplicação, priorizando:
- **Módulo de Login:** Validação de autenticação, segurança (bypass e campos mascarados), responsividade e persistência de dados.
- **Módulo de Coleta:** (Em desenvolvimento) Inserção de dados, validação de regras de negócio (Anomalia de 25%) e upload de lotes.

## 🛠️ Tecnologias Utilizadas
- **[Cypress](https://www.cypress.io/):** Framework para automação de testes ponta a ponta (E2E).
- **[Node.js](https://nodejs.org/):** Ambiente de execução.
- **[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript):** Linguagem utilizada para a escrita dos scripts de teste.

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
- Git
- Node.js (versão 14 ou superior)

### Passo a Passo da Instalação

1. Clone este repositório no seu terminal:
```bash
git clone [https://github.com/Arthur-Carvalh01/vlab-qa-desafio.git](https://github.com/Arthur-Carvalh01/vlab-qa-desafio.git)
```

2. Acesse a pasta do projeto:
```bash
cd vlab-qa-desafio
```

3. Instale as dependências do projeto (Cypress):
```bash
npm install
```

### Executando os Testes Automatizados

Você pode rodar os testes de duas maneiras:

**Opção 1: Modo Interativo (Cypress UI)**
Abre a interface gráfica do Cypress, permitindo visualizar a execução dos testes em tempo real no navegador.
```bash
npx cypress open
```
*Na janela que abrir, selecione "E2E Testing" e clique no arquivo `login.cy.js`.*

**Opção 2: Modo Headless (Terminal)**
Executa todos os testes em segundo plano e exibe o relatório final diretamente no terminal (ideal para pipelines de CI/CD).
```bash
npx cypress run
```

**Opção 3: Via Docker (Ambiente Isolado)**
Esta opção permite executar os testes E2E em um container isolado, sem necessidade de instalar o Node.js ou o Cypress na máquina local.

**Pré-condição:** Certifique-se de que a Aplicação Alvo (Plataforma de Gestão de Fomento) já esteja em execução na sua máquina, operando na porta `3000`. 
> 🔗 **Repositório da Aplicação Alvo:** [https://github.com/nuneslg/Desafio-QA](https://github.com/nuneslg/Desafio-QA)

1. Com a aplicação alvo rodando, abra um novo terminal na raiz **deste** repositório de testes.
2. Execute o comando:
   ```bash
   docker compose up

## 📂 Estrutura do Repositório
- `cypress/e2e/`: Contém os scripts de automação de testes (`.cy.js`).
- `docs/`: Diretório contendo toda a documentação de QA da entrega:
  - `PLANO_DE_TESTES.md`: Estratégia, arquitetura e casos de teste detalhados.
  - `CENARIOS_BDD.md`: Mapeamento de funcionalidades em formato Gherkin (Dado/Quando/Então).
  - `BUG_REPORT.md`: Registro de anomalias encontradas durante os testes exploratórios.

---
*Desenvolvido por José Arthur para o desafio técnico do V-Lab.*