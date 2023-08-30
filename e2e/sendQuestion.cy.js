import 'cypress-iframe';

describe('nft-tix', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://app.dev.nft-tix.com/how-it-works');
        cy.url().should('eq', 'https://app.dev.nft-tix.com/how-it-works');
        cy.wait(3000);
    })
    it('Send Question', () => {
        cy.viewport(1920, 1680);
        cy.get('.form.mt-5').scrollIntoView().should('be.visible');
        cy.wait(2000);
        cy.get('div.input-field input[name="email"]').type('daniloail.com');
        cy.get('textarea[name="question"]').type('Hello world');
        cy.get('button.button.undefined[type="submit"]').contains('SEND QUESTION').click();
        cy.wait(5000)
        cy.get('div.input-field input[name="email"]').clear().type('danilotest90@gmail.com');
        cy.wait(5000)
        cy.get('p.input-error').should('not.exist');
        cy.get('button.button.undefined[type="submit"]').contains('SEND QUESTION').click();
    })

});
