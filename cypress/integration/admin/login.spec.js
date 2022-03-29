import { config } from '../../fixtures/config';

describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  context('Basic components', () => {
    it('shows Login document title', () => {
      cy.title().should('eq', 'Hypster | Login');
    });

    it('greets with LOG IN', () => {
      cy.get('[data-cy=login-greetings]').should('contain', 'Login to start your session');
    });

    it('requires email & password', () => {
      cy.get('[data-cy=button-login]').click();
      cy.get('.invalid-feedback').should(
        'contain',
        'Please provide a email'
      );
      cy.get('.invalid-feedback').should(
        'contain',
        'Please provide a email'
      );
    });

    it('requires password', () => {
      cy.get('[data-cy=input-email]').type(config.username);
      cy.get('[data-cy=button-login]').click();
      cy.get('.invalid-feedback').should(
        'contain',
        'Please provide a password'
      );
    });
  });

  context('Valid username & password', () => {
    it('navigates to admin/ on successful login', () => {
      cy.get('[data-cy=input-email]').type(config.username);
      cy.get('[data-cy=input-password]').type(config.password);
      cy.get('[data-cy=button-login]').click();
      cy.hash().should('eq', '');
    });
  });

  context('Valid username & invalid password', () => {
    it('response incorrect username or password', () => {
      cy.get('[data-cy=input-email]').type(config.username);
      cy.get('[data-cy=input-password]').type('!nv4l1dP@55w0rD');
      cy.get('[data-cy=button-login]').click();
      cy.get('[data-cy=alert-text]').should(
        'contain',
        'Email or Password does not match'
      );
    });
  });

  context('Invalid username & valid password', () => {
    it('response incorrect phone number or password', () => {
      cy.get('[data-cy=input-email]').type('test@example.com');
      cy.get('[data-cy=input-password]').type(config.password);
      cy.get('[data-cy=button-login]').click();
      cy.get('[data-cy=alert-text]').should(
        'contain',
        'Email or Password does not match'
      );
    });
  });
});
