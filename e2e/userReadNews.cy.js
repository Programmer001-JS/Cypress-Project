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
    it('', () => {
        cy.wait(3000)
        //kliknemo na prvi element i videcemo da li ce da radi kada ovaj element vise ne bude prvi 
        //da li ce biti isti sadrzaj kontenta
        cy.get('figure.post-figure.blog-bg-flag').first().click();
        cy.get('div.blog-post-container').should('exist');
        cy.get('div.blog-post-content').should('not.be.empty');
        cy.get('div.blog-post-share button[type="submit"]').should('exist').click();
        cy.wait(3000)
        cy.get('div.share-blog-modal-share-link')
        .find('input[type="text"][disabled]')
        .invoke('val')
        .then(urlValue => {
            // Ovde izvlacimo jedinstveni deo URL adrese
            const uniqueUrlSegment = urlValue.split('/news/')[1];
    
            // Verifikujemo  da se jedinstveni deo URL adrese poklapa sa generisanim delom
            cy.get('div.share-blog-modal-share-link')
                .should('exist')
                .find('input[type="text"][disabled]')
                .should('exist')
                .invoke('val') // Uzimaamo vrednost input polja
                .should('contain', `https://app.dev.nft-tix.com/news/${uniqueUrlSegment}`);
        });

    })

});
