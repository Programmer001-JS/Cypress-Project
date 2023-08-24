import 'cypress-iframe';
import 'cypress-mailosaur';


//svaki korisnik mora da ima drugi email jel je svaki korsinik druga email ali menjam samo ovo napred ispred @
//potrebna dorada da se iz baze izvuce verifikacioni kod za registorvanje walleta
const serverId = 'rkf3gqwe'
const testEmail = `bigh-current@rkf3gqwe.mailosaur.net`



describe('User Sign Up - Frontend Interaction', () => {
    beforeEach(() => {
        cy.visit('https://app.dev.nft-tix.com/');
    });
    it('Signs up user successfully', () => {

        const userData = {
            username: 'Dajmicode12',
            email: testEmail,
            password: 'Dajmicode12123'
        };

        cy.wait(2000);
        cy.get('button.button.undefined[type="submit"]').contains('SIGN UP').click();
        cy.get('.input-form.register-form input[name="username"]').type(userData.username);
        cy.get('.input-form.register-form input[name="email"]').type(userData.email);
        cy.get('.input-form.register-form input[name="password"]').type(userData.password);
        cy.get('.input-form.register-form input[name="confirmPassword"]').type(userData.password);
        cy.get('.input-form.register-form label.checkbox-field input[name="agree"]').check({ force: true });
        cy.get('button.button.outline.undefined[type="submit"]').contains('Register').click();


        cy.get('.modal-wrapper').should('be.visible');
        cy.wait(18000);
        cy.get('.nfttix-wallet').find('p.m-0:contains("NFT-TiX")').click({ force: true });
        cy.wait(18000);
        cy.iframe('#metakeep-iframe')
            .find('.frame-cta button#allow_sign')
            .click();
        cy.wait(8000);

        console.log(message.text.codes.length) // 2

        const firstCode = message.text.codes[0]
        console.log(firstCode.value) // "456812"
    });
});



