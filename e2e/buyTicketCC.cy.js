import 'cypress-iframe';


//ovo ce morati da se menja posto ovaj ticket je sada na drugoj strani i nece ga test videti

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
            cy.contains('.payment-modal-col p', 'Credit Card').click();
            cy.wait(6000);

            cy.get('div.input-field input[minlength="4"][maxlength="50"][placeholder="Cardholder name"]').type('Danilo');
            cy.iframe('[title="Secure card payment input frame"]').find('input.InputElement.is-empty.Input.Input--empty[autocomplete="cc-number"][placeholder="Card number"]').type('4242 4242 4242 4242');
            cy.iframe('[title="Secure card payment input frame"]').find('input.InputElement.is-empty.Input.Input--empty[autocomplete="cc-exp"][placeholder="MM / YY"]').type('10/24');
            cy.iframe('[title="Secure card payment input frame"]').find('input.InputElement.is-empty.Input.Input--empty[autocomplete="cc-csc"][placeholder="CVC"]').type('123');
            cy.iframe('[title="Secure card payment input frame"]').find('input.InputElement.is-empty.Input.Input--empty[autocomplete="postal-code"][placeholder="ZIP"]').type('11000');

            cy.get('.button[type="submit"]').contains('Purchase').click();

            cy.wait(3000);
            cy.contains('Purchase successful! Your tickets are on the way!').should('be.visible');
            cy.contains('VIEW MY TICKETS').click();
            cy.wait(3000);

            cy.get('.my-tickects-event').its('length').then(initialCount => {
            cy.wait(40000);
            cy.get('.my-tickects-event').its('length').should('eq', initialCount + ticketsToPurchase);
            });

        })
    })

})