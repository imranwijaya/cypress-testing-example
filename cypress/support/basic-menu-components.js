function getHref(url) {
  return `/admin${url}`
}

export function basicMenuComponents(
  id,
  title,
  menu,
  url,
  header,
  headerText = title,
  headerSmall,
  headerSmallText = 'Data',
  breadcrumb = title,
  hasTreeview,
  child,
) {
  if (hasTreeview) {
    child.forEach((curr) => {
      const childId = curr.id;
      const childTitle = curr.title;
      const childMenu = curr.menu;
      const childUrl = curr.url;
      const childHeaderText = curr.headerText;
      const childHeaderSmall = curr.headerSmall;
      const childHeaderSmallText = curr.headerSmallText;
      const childBreadcrumb = curr.breadcrumb;
      context(`${title? `${title} - ` : ''}${curr.menu}`, () => {
        beforeEach(() => {
          cy.login();
          cy.visit(childUrl);
        })

        // PARENT MENU
        it('shows parent menu name', () => {
          cy.get(`[data-cy=menu-${id}-text]`).should('have.text', menu);
        })

        // PARENT ACTIVE MENU
        it('parent has active class', () => {
          cy.get(`[data-cy=menu-${id}-link]`).should('have.class', 'active');
        })

        // DOCUMENT TITLE TEXT
        it('shows document title', () => {
          cy.title().should('eq', childTitle);
        });

        // HEADER TEXT
        it('shows header text', () => {
          cy.get('[data-cy=content-header]').should('have.text', childHeaderText);
        });

        // HEADER SMALL TEXT
        // if (childHeaderSmall) {
        //   it('shows header small text', () => {
        //     cy.get('[data-cy=content-header-small]').should('have.text', childHeaderSmallText);
        //   });
        // }

        // BREADCRUMB TEXT
        it('shows breadcrumb text', () => {
          cy.get('[data-cy=breadcrumb]').should('contain', childBreadcrumb);
        });
  
        // ACTIVE MENU
        it('has active class', () => {
          cy.get(`[data-cy=menu-${childId}-link]`).should('have.class', 'active')
        })
  
        // MENU TEXT
        it('shows submenu name', () => {
          cy.get(`[data-cy=menu-${childId}-text]`).should('contain', childMenu)
        })
      })
    })
  } else {
    if (url === '#') {
      return;
    }

    context(menu, () => {
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
      it('shows breadcrumb text', () => {
        cy.get('[data-cy=breadcrumb]').should('contain', breadcrumb);
      });

      // ACTIVE MENU
      it('has active class', () => {
        cy.get(`[data-cy=menu-${id}-link]`).should('have.class', 'active')
      })

      // MENU TEXT
      it('shows menu text', () => {
        cy.get(`[data-cy=menu-${id}-text]`).should('contain', menu)
      })
    })
  }  
}
