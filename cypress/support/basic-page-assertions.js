/// <reference path="./index.d.ts" />
/// <reference types="cypress" />

export function assertBasicPage({
  id,
  title,
  menu,
  url,
  headerText = title,
  breadcrumbs = [],
}) {
  context("Basic page", () => {
    beforeEach(() => {
      cy.login();
      cy.visit(url);
    });

    it("shows document title", () => {
      cy.title().should("eq", title);
    });

    it("shows header text", () => {
      cy.getByDataTest("content-header").should("have.text", headerText);
    });

    breadcrumbs.forEach(({ text, link }, index) => {
      const level = index + 1;

      it(`shows breadcrumb level ${level}`, () => {
        const breadcrumb = cy.getByDataTest(`breadcrumb-${level}`);

        breadcrumb.should("have.text", text);

        if (link) {
          breadcrumb.should("include.attr", "href", link);
        }
      });
    });

    it("has active class", () => {
      cy.getByDataTest(`menu-${id}-link`).should("have.class", "active");
    });

    it(`shows menu text '${menu}'`, () => {
      cy.getByDataTest(`menu-${id}-text`).should("contain", menu);
    });
  });
}
