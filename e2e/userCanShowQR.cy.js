import 'cypress-iframe';

describe('nft-tix', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://app.dev.nft-tix.com/');
        cy.url().should('eq', 'https://app.dev.nft-tix.com/');
        cy.wait(3000);
    })
    it('Show QR code', () => {

        const userData = {
            username: 'milance',
            password: 'Milance123'
        };

        cy.wait(2000);
        cy.get('button.button.undefined[type="submit"]').contains('LOGIN').click();
        cy.get('.input-form.login-form input[name="username"]').type(userData.username);
        cy.get('.input-form.login-form input[name="password"]').type(userData.password);
        cy.get('button.button.outline.undefined[type="submit"]').contains('Login').click();
        cy.viewport(1920, 1380);
        cy.wait(3000);
        cy.get('a[href="/user/my-tickets"]').click();

        cy.wait(5000);
        
        cy.get('div.my-tickets-single').first().as('firstTicket'); 
        cy.get('@firstTicket').find('.event-item-tooltip button.button.my-tickets-button').contains('Show QR Code').click({force:true});
        
        cy.wait(3000);
          cy.iframe('#metakeep-iframe')
          .find('.frame-cta button#allow_sign')
          .click();
          
          //ovde ide verification code


    })

});
