describe('nft-tix', () => {

    // Cypress.on('uncaught:exception', (err, runnable) => {
    //   return false;
    // });

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://app.dev.nft-tix.com/');
        cy.url().should('eq', 'https://app.dev.nft-tix.com/');
    })
    it('', () => {
        const userData = {
            username: 'milance',
            password: 'Milance123'
        };

        cy.wait(2000);
        cy.get('button.button.undefined[type="submit"]').contains('LOGIN').click();
        cy.get('.input-form.login-form input[name="username"]').type(userData.username);
        cy.get('.input-form.login-form input[name="password"]').type(userData.password);
        cy.get('.input-form.login-form label.checkbox-field input[name="remember"]').check({ force: true });
        cy.get('button.button.outline.undefined[type="submit"]').contains('Login').click();

        cy.get('.modal-wrapper').should('be.visible');
        cy.wait(3000)

        cy.get('.modal-close').click();

        cy.get('div.navbar-nav a').contains('EVENTS').click();
        cy.url().should('include', '/events');

    })

});
