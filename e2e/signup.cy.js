describe('User Sign Up - Frontend Interaction', () => {
  beforeEach(() => {
    cy.visit('https://app.dev.nft-tix.com/');
  });

  it('Signs up user successfully', () => {
    const userData = {
      username: 'milance',
      email: 'milance@gmail.com',
      password: 'Milance123'
    };

    cy.wait(2000);
    cy.get('button.button.undefined[type="submit"]').contains('SIGN UP').click();
    cy.get('.input-form.register-form input[name="username"]').type(userData.username);
    cy.get('.input-form.register-form input[name="email"]').type(userData.email);
    cy.get('.input-form.register-form input[name="password"]').type(userData.password);
    cy.get('.input-form.register-form input[name="confirmPassword"]').type(userData.password);
    cy.get('.input-form.register-form label.checkbox-field input[name="agree"]').check({ force: true });
    cy.get('button.button.outline.undefined[type="submit"]').contains('Register').click();
  });
});

describe('User Sign Up - Server Response', () => {
  const MORALIS_APPLICATION_ID = 'jKLj4sq0hJOWrnB6xqSmENJKBz1zwjK3Kzm7Pebu';
  const MORALIS_SERVER_URL = 'https://ygyyzg7sndzr.usemoralis.com:2053/server';

  it('Verifies successful user registration', () => {
    const userData = {
      username: 'milance',
      email: 'milance@gmail.com',
      password: 'Milance123'
    };

    cy.request({
      method: 'POST',
      url: `${MORALIS_SERVER_URL}/users`,
      headers: {
        'X-Parse-Application-Id': MORALIS_APPLICATION_ID,
        'Content-Type': 'application/json' 
      },
      body: userData,
      failOnStatusCode: false 
    }).then(response => {
      console.log('User Data Response:', response.body);

      if (response.status === 201) {
        expect(response.body).to.have.property('objectId');
      } else if (response.status === 202) {
        expect(response.body.error).to.eq('Account already exists for this username.');
      }
    });
  });
});
