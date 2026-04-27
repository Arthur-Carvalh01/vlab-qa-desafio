# Cenários de Teste (BDD) - Módulo de Login

Este documento descreve os comportamentos esperados para o Módulo de Login da Plataforma de Gestão de Fomento, utilizando a sintaxe Gherkin (Dado / Quando / Então) para garantir uma linguagem ubíqua entre as áreas de Negócios, Desenvolvimento e Qualidade.

---

### Funcionalidade: Autenticação de Usuário
**Como** um usuário do sistema de Gestão de Fomento
**Quero** acessar o painel da plataforma utilizando minhas credenciais
**Para** gerenciar bolsistas e projetos de fomento

#### Cenário 1: Login com sucesso utilizando credenciais válidas
**Dado** que o usuário está na página de login
**Quando** ele submete credenciais válidas cadastradas no sistema
**Então** a autenticação deve ser autorizada
**E** o sistema deve redirecioná-lo para a página inicial do Dashboard

#### Cenário 2: Tentativa de login com usuário não cadastrado
**Dado** que o usuário está na página de login
**Quando** ele submete um nome de usuário que não existe no banco de dados
**Então** o sistema deve bloquear o acesso
**E** exibir a mensagem de erro exata: "Usuário 'usuario' não encontrado no sistema"

#### Cenário 3: Tentativa de login com senha incorreta
**Dado** que o usuário está na página de login
**Quando** ele submete um nome de usuário válido associado a uma senha incorreta
**Então** o sistema deve bloquear o acesso
**E** exibir a mensagem de erro exata: "Senha incorreta!"

#### Cenário 4: Tentativa de login com campos vazios
**Dado** que o usuário está na página de login
**Quando** ele tenta submeter o formulário sem preencher as credenciais obrigatórias
**Então** o sistema deve bloquear a ação de envio
**E** solicitar o preenchimento com a mensagem: "Por favor, preencha todos os campos"

#### Cenário 5: Segurança e mascaramento do campo de senha
**Dado** que o usuário está preenchendo o formulário de login
**Quando** ele digita os dados no campo de senha
**Então** os caracteres digitados devem ser ocultados visualmente (mascarados) por padrão para proteger a integridade da informação

#### Cenário 6: Responsividade e Acessibilidade do formulário
**Dado** que o usuário acessa a página de login
**Quando** a interface é renderizada em diferentes resoluções de tela (incluindo dispositivos móveis)
**Então** o formulário deve se redimensionar adequadamente sem quebras de layout
**E** os elementos de acessibilidade obrigatórios, como a Barra de Governo, devem estar visíveis e funcionais

---

### Funcionalidade: Módulo de Coleta de Dados
**Como** um usuário autenticado da plataforma
**Quero** registrar indicadores de desempenho de beneficiários
**Para** manter o histórico de fomento atualizado

#### Cenário 1: Registro de coleta individual com sucesso
**Dado** que o usuário está na aba "Coleta Individual"
**Quando** ele preenche todos os campos com dados válidos e dentro dos limites permitidos
**Então** o sistema deve processar a informação
**E** exibir os dados na aba "Histórico" de forma cronológica

#### Cenário 2: Bloqueio de submissão com indicadores fora do limite
**Dado** que o usuário está preenchendo uma coleta individual
**Quando** ele insere uma nota superior a 10 ou uma taxa de conclusão negativa
**Então** o sistema deve impedir o envio
**E** exibir uma mensagem de validação orientando sobre os limites permitidos

#### Cenário 3: Upload de coleta em lote via CSV
**Dado** que o usuário está na aba "Coleta em Lote"
**Quando** ele realiza o upload de um arquivo CSV estruturado corretamente
**Então** o sistema deve realizar o parse dos dados
**E** importar todos os beneficiários do lote para o histórico de uma só vez