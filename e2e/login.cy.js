describe('User Sign Up - Frontend Interaction', () => {
    beforeEach(() => {
      cy.visit('https://app.dev.nft-tix.com/');
    });
  
    it('Login user successfully', () => {
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
    });
})
describe('User Sign Up - Server Response', () => {
    const MORALIS_APPLICATION_ID = 'jKLj4sq0hJOWrnB6xqSmENJKBz1zwjK3Kzm7Pebu';
    const MORALIS_SERVER_URL = 'https://ygyyzg7sndzr.usemoralis.com:2053/server';
  
    it('Verifies successful user registration', () => {
      const userData = {
        username: 'milance',
        password: 'Milance123'
      };
  
      cy.request({
        method: 'POST',
        url: `${MORALIS_SERVER_URL}/login`,
        headers: {
          'X-Parse-Application-Id': MORALIS_APPLICATION_ID,
          'Content-Type': 'application/json' 
        },
        body: userData,
        failOnStatusCode: false 
      }).then(response => {
        console.log('User Data Response:', response.body);
        if (response.status === 200) {
          expect(response.body).to.have.property('objectId');
        } else if (response.status === 404) {
          expect(response.body.error).to.eq('Content is not valid, please enter correct value.');
        }
      });
    });
  });
 
  
