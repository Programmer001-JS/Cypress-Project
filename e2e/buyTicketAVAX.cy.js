import 'cypress-iframe';

describe('nft-tix', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });


    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://app.dev.nft-tix.com/');
        cy.url().should('eq', 'https://app.dev.nft-tix.com/');
    })
    it('', () => {
        const userData = {
            username: 'Danilo90',
            password: 'Beograd.011'
        };

        cy.wait(2000);
        cy.get('button.button.undefined[type="submit"]').contains('LOGIN').click();
        cy.get('.input-form.login-form input[name="username"]').type(userData.username);
        cy.get('.input-form.login-form input[name="password"]').type(userData.password);
        cy.get('.input-form.login-form label.checkbox-field input[name="remember"]').check({ force: true });
        cy.get('button.button.outline.undefined[type="submit"]').contains('Login').click();

        cy.get('div.navbar-nav a').contains('EVENTS').click();
        cy.url().should('include', '/events');
        cy.wait(2000);
        cy.get('div.event-item a[href="/event/new-metakeep-messages-test"]').first().click({ force: true });

        cy.wait(2000);
        cy.viewport(1920, 1600);

        cy.get('button.button.undefined[type="submit"]').contains('ADD').click();
        cy.get('button.button.undefined[type="submit"]').contains('BUY NOW').click();
        cy.wait(2000);
        
        cy.get('input[name="quantity"]').invoke('val').then(quantityValue => {
            const ticketsToPurchase = parseInt(quantityValue);

            cy.contains('.payment-modal-col p', 'Crypto').click();
            cy.wait(2000);

            cy.get('.modal-container button.button.undefined[type="submit"]').contains('BUY NOW').click();
            cy.wait(6000);

            cy.iframe('#metakeep-iframe')
            .find('.frame-cta button#allow_sign')
            .click();
            cy.wait(3000);

            //ovde sad ide verifikacioni CODE za Wallet
            
            cy.contains('Purchase successful! Your tickets are on the way!').should('be.visible');
            cy.wait(200000);
            cy.get('.my-tickects-event').its('length').then(initialCount => {
            cy.wait(40000);
            cy.get('.my-tickects-event').its('length').should('eq', initialCount + ticketsToPurchase);
            });

        })
    })

})