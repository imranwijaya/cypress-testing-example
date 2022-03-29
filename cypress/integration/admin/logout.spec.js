describe('Logout Functionality', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  })

  it('navigates to login page after successful logout', () => {
    cy.get('[data-cy=navigation-control-sidebar]').click();
    cy.get('[data-cy=control-sidebar]').should('be.visible');
    cy.get('[data-cy=button-logout]').trigger('mouseover').click();
    cy.hash().should('eq', '');
  })
});