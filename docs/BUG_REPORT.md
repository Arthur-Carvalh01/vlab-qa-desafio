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