# 🐛 Bug Report

Este documento centraliza todos os defeitos encontrados durante as sessões de testes (manuais e exploratórios) na Plataforma de Gestão de Fomento, classificados conforme o padrão do projeto.

---

### Título do Bug: Checkbox "Lembrar-me" não armazena credenciais após logout
* **Severidade:** Baixa
* **Categoria:** UX/UI
* **Passos para Reproduzir:**
  1. Acessar a tela do Sistema de Autenticação (Login).
  2. Preencher os campos "Usuário" e "Senha" com credenciais válidas.
  3. Marcar a caixa de seleção "Lembrar-me".
  4. Clicar no botão "Entrar" para logar na plataforma.
  5. Realizar a ação de Logout (clicar no botão de sair da conta).
  6. Observar os campos ao retornar para a tela de Login.
* **Resultado Esperado:** O campo de usuário deveria estar pré-preenchido com os dados do último acesso, poupando o usuário de digitar novamente.
* **Resultado Atual:** O campo aparece em branco, demonstrando que a função da checkbox não está salvando as informações.
* **Evidência:** O teste automatizado E2E falha na etapa `cy.get('[data-testid="login-username"]').should('have.value', 'admin');`, confirmando o comportamento anômalo da interface.
* **Sugestão de Correção (Opcional):** Implementar a gravação do usuário de forma segura no `localStorage` do navegador no momento do login quando a opção estiver marcada. Adicionar uma verificação no carregamento da tela para ler esse dado e preencher o *input*.

---

### Título do Bug: Módulo de Coleta permite inserção de valores fora do limite (Negativos e > 100)
* **Severidade:** Alta
* **Categoria:** Lógica de Negócio
* **Passos para Reproduzir:**
  1. Acessar o Módulo de Coleta de Dados.
  2. Na aba "Coleta Individual", preencher os campos numéricos com valores extremos (ex: Taxa de Conclusão = 101%, Frequência = -1%, Nota = 11).
  3. Submeter o formulário.
  4. Verificar a aba "Histórico".
* **Resultado Esperado:** O sistema deve bloquear a submissão e exibir mensagens de erro informando que as taxas devem estar entre 0% e 100%, e a nota entre 0 e 10.
* **Resultado Atual:** O sistema aceita dados irreais, salva no histórico e corrompe a integridade dos indicadores.
* **Evidência:** Screenshot do Histórico exibindo "Taxa 101%" e "Nota 11".

---

### Título do Bug: Submissão duplicada no formulário de Coleta Individual
* **Severidade:** Média
* **Categoria:** Lógica / UX
* **Passos para Reproduzir:**
  1. Acessar o Módulo de Coleta de Dados.
  2. Preencher todos os dados válidos de um beneficiário.
  3. Clicar em salvar/submeter a coleta.
  4. Acessar a aba "Histórico".
* **Resultado Esperado:** A entrada deve ser registrada apenas uma vez no sistema.
* **Resultado Atual:** A mesma coleta é registrada e exibida duas vezes seguidas no histórico com o mesmo *timestamp* (data e hora exatas).
* **Sugestão de Correção:** Desabilitar o botão de submissão (estado *disabled*) imediatamente após o clique para evitar requisições repetidas e revisar os *event listeners* do botão.

---

### Título do Bug: Módulo de Coleta não valida correspondência entre ID e Nome
* **Severidade:** Alta
* **Categoria:** Lógica de Negócio
* **Passos para Reproduzir:**
  1. Aceder à Lista de Utilizadores (Painel Admin) e verificar um utilizador existente (ex: ID 3 pertence a "teste").
  2. Aceder ao Módulo de Coleta > Coleta Individual.
  3. Preencher o campo "ID do Beneficiário" com "3".
  4. Preencher o campo "Nome Completo" com um nome divergente do banco (ex: "user").
  5. Submeter os dados e verificar o Histórico.
* **Resultado Esperado:** O sistema deveria validar o ID na base de dados e preencher automaticamente o nome correto, ou exibir um erro informando que o ID e o Nome não coincidem.
* **Resultado Atual:** O sistema aceita dados divergentes, gravando a recolha com a identidade corrompida (associando o ID 3 ao nome "user").

---

### Título do Bug: Senhas de utilizadores expostas em texto simples no Painel Administrativo
* **Severidade:** Crítica
* **Categoria:** Segurança
* **Passos para Reproduzir:**
  1. Iniciar sessão no sistema com uma conta de privilégio administrativo.
  2. Aceder à visualização da "Lista de Todos os Utilizadores".
  3. Observar os dados listados para cada conta.
* **Resultado Esperado:** As senhas nunca devem ser trafegadas ou exibidas em texto simples na interface. Devem ser armazenadas com hash na base de dados e jamais expostas ao administrador.
* **Resultado Atual:** A interface exibe a chave `Senha` com os valores exatos de todos os utilizadores registados (ex: `admin123`, `123456`), configurando uma violação severa de segurança e exposição de dados sensíveis.

---

### Título do Bug: Painel Administrativo acessível por utilizadores comuns com exposição de credenciais
* **Severidade:** Crítica
* **Categoria:** Segurança / Controlo de Acesso
* **Passos para Reproduzir:**
  1. Realizar o login com uma conta de nível de permissão comum (Role: user).
  2. Tentar aceder à rota ou separador do "Painel Administrativo" / "Lista de Utilizadores".
  3. Verificar se o sistema permite a visualização e se os dados estão legíveis.
* **Resultado Esperado:** O acesso ao painel administrativo deve ser restrito apenas a utilizadores com o perfil `admin`. Utilizadores comuns devem receber um erro `403 Forbidden` ou serem redirecionados. Além disso, as senhas nunca devem ser visíveis.
* **Resultado Atual:** Qualquer utilizador autenticado consegue aceder à lista completa de utilizadores do sistema, incluindo e-mails e senhas em texto simples de outros membros e administradores.