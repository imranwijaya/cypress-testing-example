describe('Customer List Functionality', () => {

  context('Table headers', () => {
    const header = ['No', 'Name', 'Address', 'Phone', 'Email', 'Last Update', 'Action'];

    beforeEach(() => {
      cy.login();
      cy.visit('/customer/');
    });

    header.forEach((text, index) => {
      it(`shows header text '${text}'`, () => {
        cy.get(`[data-cy="data-head-row-col-${index+1}"]`).should('have.text', text);
      })
    });
  });
  
  context('Table data', () => {
    const data = ['1', 'John Doe', 'address of john doe', '08123456789', 'john@doe.com', '09/Nov/2020 23:46:09'];

    beforeEach(() => {
      cy.login();
      cy.visit('/customer/');
    });

    data.forEach((text, index) => {
      it(`shows data text '${text}'`, () => {
        cy.get(`[data-cy=data-row-1-col-${index+1}]`).should('have.text', text);
      })
    })
  });

  context('Add Customer', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/customer/');
    });

    it('navigate to /customer/add on successful button click', () => {
      cy.get('[data-cy=button-add]').trigger('mouseover').click();
      cy.hash().should('eq', '');
    })
  });

  context('Edit Customer', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/customer/');
    });

    it('navigate to /customer/edit on successful button click', () => {
      cy.get('[data-cy=data-row-1-col-7]')
      cy.get('[data-cy=button-edit-row-1]').click();
      cy.hash().should('eq', '');
    })
  });

  context('Delete Customer', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/customer/');
    });

    it('shows confirmation popup', () => {
      cy.get('[data-cy=button-delete-row-10]').trigger('mouseover').click();
      // cy.hash().should('eq', '#');
      cy.get('[aria-labelledby=swal2-title]').should('exist');
    })

    it('shows confirmation actions yes & no', () => {
      cy.get('[data-cy=button-delete-row-10]').trigger('mouseover').click();
      // cy.hash().should('eq', '#');
      cy.get('[aria-labelledby=swal2-title]').children().eq(2).as('deleteConfirmation');
      cy.get('@deleteConfirmation').children().eq(0).should('have.text', 'No');
      cy.get('@deleteConfirmation').children().eq(1).should('have.text', 'Yes');
    })

    it('hide confirmation popup on action no', () => {
      cy.get('[data-cy=button-delete-row-10]').trigger('mouseover').click();
      // cy.hash().should('eq', '#');
      cy.get('[aria-labelledby=swal2-title]').children().eq(2).as('deleteConfirmation');
      cy.get('@deleteConfirmation').children().eq(0).as('no');
      cy.get('@no').trigger('mouseover').click();
      cy.get('[aria-labelledby=swal2-title]').should('not.exist');
    })

    // it('shows confirmation response popup on action yes', () => {
    //   cy.get('[data-cy=button-delete-row-10]').trigger('mouseover').click();
    //   // cy.hash().should('eq', '#');
    //   cy.get('[aria-labelledby=swal2-title]').children().eq(2).as('deleteConfirmation');
    //   cy.get('@deleteConfirmation').children().eq(1).as('yes');
    //   // cy.get('@yes').trigger('mouseover').click();
    //   // cy.get('[aria-labelledby=swal2-title]').children().eq(1).as('deleteResponse');
    //   cy.get('@deleteResponse').children().eq(0).should('have.text', 'Delete Success from Server');
    //   cy.get('@deleteConfirmation').children().eq(0).as('ok');
    //   cy.get('@ok').trigger('mouseover').click();
    //   cy.get('[aria-labelledby=swal2-title]').should('not.exist');
    // })
  });
});