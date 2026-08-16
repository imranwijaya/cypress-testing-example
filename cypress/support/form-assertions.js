/// <reference path="./index.d.ts" />
/// <reference types="cypress" />

export function assertFormField(fields) {
  const mapped = Object.entries(fields).map(([name, field]) => ({
    name,
    label: field.label,
  }));

  context("Form", () => {
    mapped.forEach((field) => {
      it(`renders the ${field.label} field`, () => {
        cy.getByDataTest(`label-${field.name}`).should(
          "have.text",
          field.label,
        );
        cy.getByDataTest(`input-${field.name}`).should("be.visible");
      });
    });
  });
}
