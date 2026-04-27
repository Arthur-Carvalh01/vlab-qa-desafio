# Plano de Testes - QA

## 1. Introdução
A Plataforma de Gestão de Fomento é um sistema web desenvolvido com o propósito de centralizar o desempenho de bolsistas e projetos de uma instituição educacional. O sistema exige alto rigor em segurança e validação de informações, contando com funcionalidades críticas divididas em dois pilares principais: um Módulo de Autenticação (Login, Cadastro, Reset de Senha e Controle de Acesso) e um Módulo de Coleta de Dados (upload em lote de beneficiários, histórico de coletas e avaliação de indicadores). O propósito deste documento é mapear cenários, estruturar casos de teste e documentar anomalias (bugs) visando garantir a integridade e a qualidade dos fluxos principais da aplicação.

## 2. Arquitetura
O sistema possui uma arquitetura cliente-servidor leve e em contêineres. O front-end é desenvolvido utilizando HTML, CSS e JavaScript puros. Para o processamento e armazenamento, é utilizado um back-end em Node.js que atua como uma API REST, comunicando-se com a aplicação via requisições e retornos em formato JSON. Toda a infraestrutura é empacotada e executada de forma isolada utilizando Docker.

## 3. Funcionalidades

| Funcionalidade | Comportamento Esperado | Verificações | Critérios de Aceite |
| :--- | :--- | :--- | :--- |
| **Login** | Ao digitar seu usuário e senha corretamente, o usuário irá logar na plataforma. <br><br> Ao tentar acessar com um usuário não cadastrado, o sistema deve exibir a mensagem de erro específica. <br><br> Ao digitar um usuário válido, mas com a senha errada, exibir mensagem de senha incorreta. <br><br> Ao tentar efetuar o login sem preencher os dados, solicitar preenchimento. <br><br> O campo de senha deve ocultar visualmente os caracteres digitados. <br><br> O sistema deve ser acessível e responsivo. | • Login com sucesso (credenciais válidas). <br> • Validação da exibição exata da mensagem para usuário inexistente e para senha incorreta. <br> • Validação da mensagem de alerta para campos vazios. <br> • Verificação do mascaramento do campo de senha. <br> • Teste de responsividade. <br> • Validação de acessibilidade no formulário. | • Ter acessibilidade no sistema e redimensionar a tela. <br> • Mostrar mensagem de erro específica para usuário inexistente e senha incorreta. <br> • Exibir a solicitação de preenchimento em caso de login vazio. <br> • Manter a senha mascarada (oculta) durante a digitação. |
| **Registro** | Ao preencher os dados corretamente, efetuar o cadastro, logar e redirecionar para a conta. <br><br> Tentativas com campos vazios devem ser bloqueadas. | • Realizar o login automático após cadastro. <br> • Validar obrigatoriedade de todos os campos. <br> • Exibir falha para usuário já existente. <br> • Exibir falha se confirmação de senha for diferente. | • Todos os campos são obrigatórios. <br> • Login e redirecionamento automáticos após sucesso. <br> • Impedir cadastro de usuário duplicado. <br> • Impedir cadastro com senhas divergentes. <br> • Validação de formatação correta do e-mail. |
| **Reset de senha** | (A definir) | (A definir) | (A definir) |
| **Dashboard** | (A definir) | (A definir) | (A definir) |
| **Painel admin** | (A definir) | (A definir) | (A definir) |
| **Logout** | (A definir) | (A definir) | (A definir) |
| **Coleta de Dados**| (A definir) | (A definir) | (A definir) |

## 4. Estratégia de Teste

### Escopo de Testes
O plano de testes abrange as funcionalidades críticas da Plataforma de Gestão de Fomento, com foco obrigatório no Módulo de Login e no Módulo de Coleta (inserção de dados e regras de anomalia). Serão executados testes nos seguintes níveis:

* **Testes Automatizados (E2E):** Serão realizados testes end-to-end com foco prioritário no fluxo de Login, validando caminhos felizes, testes negativos e segurança.
* **Testes Exploratórios e Manuais:** O sistema será mapeado manualmente em busca de inconsistências e quebras de regras de negócio, documentados no Reporte de Bugs.
* **Acessibilidade e Responsividade:** Validações de interface para garantir o uso em dispositivos móveis e a presença de elementos governamentais (Barra de Governo).

### Ambiente e Ferramentas
Os testes serão executados em um ambiente local isolado e conteinerizado, garantindo que as configurações de infraestrutura não interfiram nos resultados.

| Ferramenta | Aplicação | Descrição |
| :--- | :--- | :--- |
| **Cypress** | Automação / E2E | Framework utilizado para a criação e execução dos scripts de automação. |
| **Docker** | Infraestrutura | Utilizado para rodar a aplicação localmente de forma padronizada. |
| **Git / GitHub** | Versionamento | Controle de versão do código de automação e documentação. |

## 5. Classificação de Bugs

Para manter o alinhamento com os padrões do projeto V-Lab, os bugs encontrados serão classificados utilizando as seguintes métricas:

### Níveis de Severidade
| Nível | Descrição | Exemplos no Contexto do Projeto |
| :--- | :--- | :--- |
| **Crítica** | Falha fatal que bloqueia o uso do sistema ou expõe vulnerabilidades graves. | Sistema trava completamente; Quebra de segurança (bypass). |
| **Alta** | A funcionalidade principal não opera como esperado ou ignora regras críticas. | Upload de arquivo corrompido permitido; "Anomalia de 25%" falha. |
| **Média** | A funcionalidade opera, mas apresenta falhas de validação ou feedback ausente. | Mensagem de erro não aparece; Barra de Governo ausente. |
| **Baixa** | Quase nenhum impacto funcional. Erros visuais ou de texto. | Erro ortográfico; Pequeno desalinhamento; Cor de contraste errada. |

### Categorias
* **Segurança:** Falhas de autenticação, criptografia ou exposição de dados.
* **Lógica:** Erros em regras de negócio, cálculos ou processamento de dados.
* **UX (User Experience):** Problemas de usabilidade, responsividade e acessibilidade.
* **Performance:** Lentidão excessiva ou consumo anormal de recursos.

### Template de Reporte
* **Título do Bug:** [Descrição curta e clara]
* **Severidade:** [Crítica / Alta / Média / Baixa]
* **Categoria:** [Segurança / Lógica / UX / Performance]
* **Passos para Reproduzir:** 1. [Passo 1] 2. [Passo 2]
* **Resultado Esperado:** [O que deveria acontecer]
* **Resultado Atual:** [O que realmente acontece]
* **Evidência:** [Screenshot / Link do Log / Trecho de Código]
* **Sugestão de Correção (Opcional):** [Como corrigir]

## 6. Definição de Pronto (DoD)
Para garantir a qualidade, uma funcionalidade só será considerada Pronta quando atender aos seguintes critérios:
* **Execução do Planejamento:** Todos os cenários de teste mapeados foram executados.
* **Cobertura de Automação:** Os testes E2E (Cypress) foram implementados e executados com 100% de sucesso.
* **Tolerância a Bugs:** Nenhum bug de severidade Crítica, Alta ou Média em aberto. Apenas bugs de severidade Baixa são tolerados.
* **Critérios Não-Funcionais:** Validações de acessibilidade e responsividade aprovadas.
* **Rastreabilidade:** Anomalias documentadas no Bug Report oficial.