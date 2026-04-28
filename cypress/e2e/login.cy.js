describe('Pagina de login', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('Ao digitar seu usuário e senha corretamente, o usuário irá logar na plataforma.', () => {
        cy.get('[data-testid="login-username"]').type('admin');
        cy.get('[data-testid="login-password"]').type('admin123');
        cy.get('[data-testid="login-button"]').click()
        cy.url().should('include', 'http://localhost:3000/dashboard');
    });

    it('Ao tentar acessar com um usuário não cadastrado, o sistema deve exibir a mensagem: "Usuário \'usuario\' não encontrado no sistema".', () => {
        cy.get('[data-testid="login-username"]').type('peter');
        cy.get('[data-testid="login-password"]').type('homemaranha');
        cy.get('[data-testid="login-button"]').click();
        cy.contains('Usuário \'peter\' não encontrado no sistema').should('be.visible');
    });

    it('Ao digitar um usuário válido, mas com a senha errada, o sistema deve exibir a mensagem: "Senha incorreta!".', () => {
        cy.get('[data-testid="login-username"]').type('admin');
        cy.get('[data-testid="login-password"]').type('admin');
        cy.get('[data-testid="login-button"]').click();
        cy.contains('Senha incorreta!').should('be.visible');
    });

    it('Ao tentar efetuar o login sem preencher os dados, o sistema deve solicitar: "Por favor, preencha todos os campos".', () => {
        cy.get('[data-testid="login-button"]').click();
        cy.contains('Por favor, preencha todos os campos').should('be.visible');
    });

    it('O campo de senha deve ocultar visualmente os caracteres digitados.', () => {
        cy.get('[data-testid="login-password"]').type('admin');
        cy.get('[data-testid="login-password"]').should('have.attr', 'type', 'password');
    });

    it('O sistema deve ser acessível e responsivo.', () => {
        cy.viewport('iphone-x');
        cy.get('[data-testid="login-username"]').should('be.visible');
        cy.get('[data-testid="login-button"]').should('be.visible');
    });

    it('Ao marcar a opção "Lembrar-me", o sistema deve persistir as credenciais para facilitar o próximo acesso.', () => {
    cy.get('#rememberMe').click();
    cy.get('[data-testid="login-username"]').type('admin');
    cy.get('[data-testid="login-password"]').type('admin123');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="logout-button"]').click();
    cy.get('[data-testid="login-username"]').should('have.value', 'admin');
    });
})