import 'cypress-iframe';

describe('nft-tix', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://app.dev.nft-tix.com/');
        cy.url().should('eq', 'https://app.dev.nft-tix.com/');
    });

    it('Add event to favorites and verify count', () => {
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

        cy.get('div.navbar-nav a').contains('EVENTS').click();
        cy.wait(3000);
        cy.url().should('include', '/events');
        cy.wait(3000)

        cy.get('div.event-item a[href="/event/enrico-san-gulianosadasd"]').first().click({force:true});
        cy.wait(2000)

        cy.get('button.event-page-btn').contains('ADD TO FAVORITES').click({ force: true });
        cy.wait(2000)

        cy.get('button.event-page-btn.liked').contains('REMOVE FROM FAVORITES').should('be.visible');
        cy.get('div.loginButton a.account-icon').click();
        cy.get('a[href="/user/favorites"] button.button.outline.inactive').click();
        cy.wait(6000)

        cy.get('.favorites-container').should('exist'); 
        cy.contains('.favorites-container .event-item a[href="/event/enrico-san-gulianosadasd"]', 'Enrico San Gulianosadasd').should('exist');
        cy.wait(6000)
        cy.get('.event-item-tooltip-text')
        .contains('Remove from favorites')
        .parent()  
        .find('svg.event-item-icon.liked path') 
        .click({ force: true });  
        cy.wait(2000)
        cy.contains('.favorites-container .event-item a[href="/event/enrico-san-gulianosadasd"]', 'Enrico San Gulianosadasd').should('not.exist');

    });
});

