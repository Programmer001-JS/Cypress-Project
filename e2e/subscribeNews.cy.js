import 'cypress-iframe';

describe('nft-tix', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://app.dev.nft-tix.com/news');
        cy.url().should('eq', 'https://app.dev.nft-tix.com/news');
        cy.wait(3000);
    })
    it('Subscribe news', () => {
        cy.wait(3000)
        cy.get('.footer-form-group').scrollIntoView().should('be.visible');
        cy.get('.footer-input').type('milance@gmail.com');
        cy.get('.footer-btn').click();
        cy.wait(3000);
        cy.get('.text-center.success').should('be.visible');
        cy.contains('Thank you for subscribing!').should('be.visible');
        cy.get('.footer-input').clear();
        cy.get('.footer-input').type('milance@gmail.com');
        cy.get('.footer-btn').click();
        cy.wait(3000);
        cy.get('.text-center.success').should('be.visible');
        cy.contains("You're already subscribed, your profile has been updated. Thank you!").should('be.visible');
    })

});
