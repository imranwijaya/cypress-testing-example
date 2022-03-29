export function basicPageComponents({
  id,
  title,
  menu,
  url,
  header,
  headerText = title,
  headerSmall,
  headerSmallText = 'Data',
  breadcrumbLevel,
  breadcrumbText1 = 'Home',
  breadcrumbText2,
  breadcrumbText3,
  breadcrumbText4,
  breadcrumbLink1 = '/admin',
  breadcrumbLink2,
  breadcrumbLink3,
  // breadcrumbLink4,
}) {
  context('Basic page components', () => {
    beforeEach(() => {
      cy.login()
      cy.visit(url)
    })

    // DOCUMENT TITLE
    it('shows document title', () => {
      cy.title().should('eq', title);
    });
  
    // HEADER TITLE
    it('shows header text', () => {
      cy.get('[data-cy=content-header]').should('have.text', headerText);
    });
  
    // HEADER SMALL TEXT
    // if (headerSmall) {
    //   it('shows header small text', () => {
    //     cy.get('[data-cy=content-header-small]').should('have.text', headerSmallText);
    //   });
    // }

    // BREADCRUMB TITLE
    switch (breadcrumbLevel) {
      case 1: 
        it('shows breadcrumb text level 1', () => {
          cy.get('[data-cy=breadcrumb-1]').should('have.text', breadcrumbText1);
        })
        break;
      case 2:
        it('shows breadcrumb text and link level 1', () => {
          cy.get('[data-cy=breadcrumb-1]').should('have.text', breadcrumbText1);
          cy.get('[data-cy=breadcrumb-1]').should('have.attr', 'href', breadcrumbLink1);
        })

        it('shows breadcrumb text level 2', () => {
          cy.get('[data-cy=breadcrumb-2]').should('have.text', breadcrumbText2);
        })
        break;
      case 3:
        it('shows breadcrumb text and link level 1', () => {
          cy.get('[data-cy=breadcrumb-1]').should('have.text', breadcrumbText1);
          cy.get('[data-cy=breadcrumb-1]').should('have.attr', 'href', breadcrumbLink1);
        })

        it('shows breadcrumb text and link level 2', () => {
          cy.get('[data-cy=breadcrumb-2]').should('have.text', breadcrumbText2);
          cy.get('[data-cy=breadcrumb-2]').should('have.attr', 'href', breadcrumbLink2);
        })

        it('shows breadcrumb text level 3', () => {
          cy.get('[data-cy=breadcrumb-3]').should('have.text', breadcrumbText3);
        })
        break;
      case 4:
        it('shows breadcrumb text and link level 1', () => {
          cy.get('[data-cy=breadcrumb-1]').should('have.text', breadcrumbText1);
          cy.get('[data-cy=breadcrumb-1]').should('have.attr', 'href', breadcrumbLink1);
        })

        it('shows breadcrumb text and link level 2', () => {
          cy.get('[data-cy=breadcrumb-2]').should('have.text', breadcrumbText2);
          cy.get('[data-cy=breadcrumb-2]').should('have.attr', 'href', breadcrumbLink2);
        })

        it('shows breadcrumb text and link level 3', () => {
          cy.get('[data-cy=breadcrumb-3]').should('have.text', breadcrumbText3);
          cy.get('[data-cy=breadcrumb-3]').should('have.attr', 'href', breadcrumbLink3);
        })

        it('shows breadcrumb text level 4', () => {
          cy.get('[data-cy=breadcrumb-4]').should('have.text', breadcrumbText4);
        })
        break;
    }

    // ACTIVE MENU
    it('has active class', () => {
      cy.get(`[data-cy=menu-${id}-link]`).should('have.class', 'active')
    })

    // MENU TEXT
    it(`shows menu text '${menu}'`, () => {
      cy.get(`[data-cy=menu-${id}-text]`).should('contain', menu)
    })
    });
  
}
