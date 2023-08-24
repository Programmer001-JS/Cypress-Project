import 'cypress-iframe';

describe('nft-tix', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    const walletAddress = '0x53f27b14c25eb2e7f2397ad22c60a158e99550b1'

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

        cy.wait(3000);
        cy.get('button.button.outline.inactive[type="submit"]').contains('My Tickets').click();



        cy.wait(3000);
        cy.get('.my-tickects-event').first().scrollIntoView({ force: true }).within(() => {

            cy.contains('button.my-tickets-button', 'Transfer').click({ force: true });
        });
        cy.wait(3000);
        cy.get('input[name="reciever"]').clear().type(walletAddress);

        cy.get('div.sell-ticket-modal-footer button.button.undefined[type="submit"]')
            .contains('TRANSFER TICKET')
            .should('be.visible')
            .click();
        cy.wait(5000);
        cy.iframe('#metakeep-iframe')
            .find('.frame-cta button#allow_sign')
            .click();
        cy.wait(2000)
        //ovde sad ide verifikacioni CODE za Wallet




    })

});
