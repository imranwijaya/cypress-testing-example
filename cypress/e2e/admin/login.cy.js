/// <reference path="../../support/index.d.ts" />
/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
  });

  it("displays the login page", () => {
    cy.title().should("eq", "Login Admin");
    cy.getByDataTest("login-message").should(
      "have.text",
      "Login to start your session",
    );
  });

  it("shows required validation errors when submitting an empty form", () => {
    cy.getByDataTest("button-login").click();

    cy.getByDataTest("error-email").should("have.text", "Email required");
    cy.getByDataTest("error-password").should("have.text", "Password required");
  });

  it("shows an error when email format is invalid", () => {
    cy.getByDataTest("input-email").type("invalid-email");
    cy.getByDataTest("input-password").type("some-password");

    cy.getByDataTest("button-login").click();

    cy.getByDataTest("error-email").should(
      "have.text",
      "Email must be a valid email address",
    );
  });

  it("logs in successfully with valid credentials", () => {
    cy.env(["login"]).then(({ login: { name, email, password } }) => {
      cy.getCookie("BACKENDSESSIONID_PFT").then((sessionBeforeLogin) => {
        cy.getByDataTest("input-email").type(email, { log: false });
        cy.getByDataTest("input-password").type(password, { log: false });
        cy.getByDataTest("button-login").click();
        cy.location("pathname").should("eq", "/admin");
        cy.title().should("eq", "Dashboard");
        cy.getByDataTest("toast-title").should("have.text", `Welcome ${name}`);

        // Optional: verify session ID rotation after authentication.
        cy.getCookie("BACKENDSESSIONID_PFT").then((sessionAfterLogin) => {
          expect(sessionAfterLogin).to.exist;
          expect(sessionBeforeLogin).to.exist;
          expect(sessionAfterLogin?.value).to.not.eq(sessionBeforeLogin?.value);
        });
      });
    });
  });
});
