import { basicPageComponents } from '../../../support/basic-page-components';
import { basicFormComponents } from '../../../support/basic-form-components';

describe('Add Customer Functionality', () => {
  const page = {
    id: 'customer',
    title: 'Add New Customer',
    menu: 'Customer',
    url: '/customer/add',
    header: true,
    headerText: 'Add Customer',
    headerSmall: false,
    headerSmallText: '',
    breadcrumbLevel: 3,
    breadcrumbText1: 'Home',
    breadcrumbText2: 'Customer',
    breadcrumbText3: 'Add',
    breadcrumbText4: '',
    breadcrumbLink1: '/admin',
    breadcrumbLink2: '/admin/customer/',
    breadcrumbLink3: '',
  };

  const form = [
    {
      labelName: 'name',
      labelText: 'Name',
      inputName: 'name',
    },
    {
      labelName: 'address',
      labelText: 'Address',
      inputName: 'address',
    },
    {
      labelName: 'email',
      labelText: 'Email',
      inputName: 'email',
    },
    {
      labelName: 'phone',
      labelText: 'Phone',
      inputName: 'phone',
    }
  ];

  basicPageComponents(page);

  context('Basic form components', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/customer/add')
    });

    form.forEach((e, index) => {
      basicFormComponents( e.labelName, e.labelText, e.inputName);
    });
  });

  context('Form validation', () => {
    const errorMessage = [
      'Please enter your name',
      'Please provide a address',
      'Please provide a email',
      'Please provide a phone number',
    ]
    beforeEach(() => {
      cy.login()
      cy.visit('/customer/add')
    });

    it('requires name, address, email, and phone', () => {
      cy.get('[data-cy=button-submit]').click();
      cy.get('.invalid-feedback').each(($el, index) => {
        cy.wrap($el).should('have.text', errorMessage[index]);
      })
    })

    it('requires name to have minimum length', () => {
      cy.get('[data-cy=input-name]').type('aa').trigger('blur');
      cy.get('.invalid-feedback').should(
        'contain',
        'Your name must consist of at least 3 character',
      );
    });

    it('requires name to have maximum length', () => {
      const data =  `aasdasdsa
      asdasdadasdadadadasdas
      adadadad adadadadasdasddada
      dadaas adasdadadasd aadadasdadadadasdadadasdasdasd 
      aadadasdasdasd adasdasdasdadasdadasd asdasdasdasd adasda
      sdasdda dad ad aa adasd adasdasda`;

      cy.get('[data-cy=input-name]').type(
        data.replace(/\\n|\s+/g, ' ')
      ).trigger('blur');
      cy.get('.invalid-feedback').should(
        'contain',
        'Name only accept maximum 200 character',
      );
    });

    it('requires address to have minimum length', () => {
      cy.get('[data-cy=input-address]').type('aa').trigger('blur');
      cy.get('.invalid-feedback').should(
        'contain',
        'Your address must consist of at least 3 character',
      );
    });

    it('requires valid email', () => {
      cy.get('[data-cy=input-email]').type('this.email').trigger('blur');
      cy.get('.invalid-feedback').should(
        'contain',
        'Please enter a valid email address.'
      );
    })

    it('requires phone to have minimum length', () => {
      cy.get('[data-cy=input-phone]').type('1').trigger('blur');
      cy.get('.invalid-feedback').should(
        'contain',
        'Phone number must consist at least 9 numbers',
      );
    });

    it('requires phone to have maximum length', () => {
      cy.get('[data-cy=input-phone]').type('1234567890123456').trigger('blur');
      cy.get('.invalid-feedback').should(
        'contain',
        'Phone number only accept maximum 14 numbers',
      );
    })
  })
});