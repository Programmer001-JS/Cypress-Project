import 'cypress-iframe';

describe('nft-tix', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://app.dev.nft-tix.com/');
        cy.url().should('eq', 'https://app.dev.nft-tix.com/');
        cy.wait(3000)
    })


    it('search events', () => {
        cy.get('button.button.outline.undefined[type="submit"]').contains('Search Events').click({ force: true });
        cy.wait(2000)
        cy.get('form.search-form input.search-input[name="search"][placeholder="Type Performer, Event or Organizer..."][autocomplete="off"]')
            .should('exist').type('Enrico');
        cy.get('form.search-form')
            .find('div.search-results-item')
            .contains('Enrico')
            .should('exist');
        cy.wait(4000);
        cy.get('button.button.undefined[type="submit"]').contains('MORE RESULTS').click();
        cy.wait(5000);
        cy.get('div.event-item-content h2.event-item-name')
            .contains('Enrico')
            .should('exist');
    })


    it('search organizer', () => {
        cy.wait(5000);
        cy.get('button.button.outline.undefined[type="submit"]').contains('Search Events').click({ force: true });
        cy.wait(2000)
        cy.get('form.search-form input.search-input[name="search"][placeholder="Type Performer, Event or Organizer..."][autocomplete="off"]')
            .should('exist').type('PuzaOrg2');


        cy.get('div.search-results-details p.name a.sr-link')
            .contains('PuzaOrg2')
            .should('exist')
            .then(() => {
                cy.get('div.search-results-details p.type')
                    .contains('Organizer')
                    .should('exist')
            });
        cy.get('div.search-results-details p.name a.sr-link')
            .contains('PuzaOrg2')
            .click()
        cy.wait(5000)
        cy.url().should('include', '/search?q=PuzaOrg2&mode=organizer');
        cy.get('div.event-item-content a[href*="/event/"]')
            .should('exist');
    });


    it('search performer', () => {
        cy.wait(5000);
        cy.get('button.button.outline.undefined[type="submit"]').contains('Search Events').click({ force: true });
        cy.wait(2000)
        cy.get('form.search-form input.search-input[name="search"][placeholder="Type Performer, Event or Organizer..."][autocomplete="off"]')
            .should('exist').type('Enrico');
            
        cy.get('div.search-results-details p.name a.sr-link')
            .contains('Enrico')
            .should('exist')
            .then(() => {
                cy.get('div.search-results-details p.type')
                    .contains('Performer')
                    .should('exist')
            });
            // treba dodati na frontendu da ne moze npr sa itim imenom da bude Performer jer sad ih ima vise
            //i ne zna koga da izabere
            
    })
})

