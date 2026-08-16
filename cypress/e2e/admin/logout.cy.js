/// <reference path="../../support/index.d.ts" />
/// <reference types="cypress" />

describe("Logout", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("redirects to the login page after logout", () => {
    cy.getByDataTest("navigation-control-sidebar").click();
    cy.getByDataTest("control-sidebar").should("be.visible");

    cy.getByDataTest("button-logout").click();

    cy.url().should("include", "/auth/login");
  });

  it("prevents access to protected pages after logout", () => {
    cy.getByDataTest("navigation-control-sidebar").click();
    cy.getByDataTest("button-logout").click();

    cy.url().should("include", "/auth/login");

    cy.visit("/");

    cy.url().should("include", "/auth/login");
    cy.getByDataTest("toast-title").should("have.text", "You need to login");
  });
});
