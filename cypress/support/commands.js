import { fa } from "@faker-js/faker";

Cypress.Commands.add("login", () => {
  cy.env(["login"]).then(({ login: { email, password } }) => {
    cy.request({
      method: "POST",
      url: "/auth/login",
      failOnStatusCode: false,
      form: true,
      body: {
        email: email,
        password: password,
      },
    });
  });
});

Cypress.Commands.add("getByDataTest", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getByDataTestLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add("query", (query) => {
  return cy.task("query", query, { log: false });
});
