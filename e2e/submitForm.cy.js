import 'cypress-iframe';

describe('nft-tix', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://app.dev.nft-tix.com/organizers');
        cy.url().should('eq', 'https://app.dev.nft-tix.com/organizers');

    })
    it('submit form', () => { const userData = {
        firstName: 'Danilo',
        lastName : 'Pejatovic',
        businessEmail: 'danilotest90@gmail.com',
        phoneNumber: '012345678',
        companyEmail:'danilotest90@gmail.com',
        website:'https://app.dev.nft-tix.com/organizers',
        message:'dsadadasdadasdasd'
      };
        cy.wait(3000)
        cy.viewport(1920, 1680);
        cy.get('.organizers-contact').scrollIntoView().should('be.visible');
        cy.wait(2000);
        cy.get('input[name="lastName"]').type(userData.lastName);
        cy.get('input[name="businessEmail"]').type(userData.businessEmail);
        cy.get('input[name="phoneNumber"]').type(userData.phoneNumber);
        cy.get('input[name="companyEmail"]').type(userData.companyEmail);
        cy.get('input[name="website"]').type(userData.website);
        cy.get('textarea[name="message"]').type(userData.message);
        cy.get('.checkbox-field input[name="agree"]').click({ force: true });
        cy.get('div.d-flex.justify-content-end.col-md-6.col-12 button.button.submit[type="submit"]').click();
        cy.wait(5000);
        cy.get('.input-error').should('be.visible');
        cy.get('input[name="firstName"]').type(userData.firstName);
        cy.get('p.input-error').should('not.exist');
        cy.get('div.d-flex.justify-content-end.col-md-6.col-12 button.button.submit[type="submit"]').click();
    })
});
//mora ici na proveru i komunikaciju sa bazom 
//describe('User Sign Up - Server Response', () => {
//    const MORALIS_APPLICATION_ID = 'jKLj4sq0hJOWrnB6xqSmENJKBz1zwjK3Kzm7Pebu';
//    const MORALIS_SERVER_URL = 'https://ygyyzg7sndzr.usemoralis.com:2053/server';
//  
//    it('Verifies successful user registration', () => {
//      const userData = {
//        firstName: 'Danilo',
//        lastName : 'Pejatovic',
//        businessEmail: 'danilotest90@gmail.com',
//        phoneNumber: '012345678',
//        companyEmail:'danilotest90@gmail.com',
//        website:'https://app.dev.nft-tix.com/organizers',
//        message:'dsadadasdadasdasd'
//      };
//  
//      cy.request({
//        method: 'POST',
//        url: `${MORALIS_SERVER_URL}/classes/OrganizerApplication`,
//        headers: {
//          'X-Parse-Application-Id': MORALIS_APPLICATION_ID,
//          'Content-Type': 'application/json' 
//        },
//        body: userData,
//        failOnStatusCode: false 
//      }).then(response => {
//        console.log('User Data Response:', response.body);
//  
//        if (response.status === 201) {
//          expect(response.body).to.have.property('objectId');
//        } else if (response.status === 200) {
//          expect(response.body.error).to.eq('Error');
//        }
//      });
//    });
//  });








