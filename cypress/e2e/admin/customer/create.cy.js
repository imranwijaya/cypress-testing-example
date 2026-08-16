/// <reference path="../../../support/index.d.ts" />
/// <reference types="cypress" />

import { assertBasicPage } from "../../../support/basic-page-assertions";
import { assertFormField } from "../../../support/form-assertions";
import { generateQueryCreateCustomer } from "../../../support/generate-query";

const customerCreatePage = {
  id: "customer",
  title: "Create Customer",
  menu: "Customer",
  url: "/customer/create",
  headerText: "Create Customer",
  breadcrumbs: [
    { text: "Home", link: "/admin" },
    { text: "Customer", link: "/admin/customer" },
    { text: "Create", link: "" },
  ],
};

const fields = {
  name: {
    label: "Name",
    required: "Name required",
    minlength: "Name must consist of at least 3 character",
    maxlength: "Name only accept maximum 200 character",
  },
  address: {
    label: "Address",
    required: "Address required",
    minlength: "Address must consist of at least 3 character",
  },
  email: {
    label: "Email",
    required: "Email required",
    email: "Email must be a valid email address",
  },
  phone: {
    label: "Phone",
    required: "Phone Number required",
    number: "Phone Number must be valid number",
    minlength: "Phone Number must consist at least 9 numbers",
    maxlength: "Phone Number only accept maximum 14 numbers",
  },
};

describe("Create Customer", () => {
  beforeEach(() => {
    cy.login();
    cy.visit(customerCreatePage.url);
  });

  assertBasicPage(customerCreatePage);
  assertFormField(fields);

  context("Validation", () => {
    it("shows required errors when submitted empty", () => {
      cy.getByDataTest("button-submit").click();

      cy.getByDataTest("error-name").should("contain", fields.name.required);
      cy.getByDataTest("error-address").should(
        "contain",
        fields.address.required,
      );
      cy.getByDataTest("error-email").should("contain", fields.email.required);
      cy.getByDataTest("error-phone").should("contain", fields.phone.required);
    });

    it("shows an error when name is shorter than 3 characters", () => {
      cy.getByDataTest("input-name").type("aa").blur();

      cy.getByDataTest("error-name").should("contain", fields.name.minlength);
    });

    it("accepts a name with exactly 3 characters", () => {
      cy.getByDataTest("input-name").type("abc").blur();

      cy.getByDataTest("error-name").should("not.exist");
    });

    it("accepts a name with exactly 200 characters", () => {
      const name = "a".repeat(200);
      cy.getByDataTest("input-name").type(name).blur();

      cy.getByDataTest("input-name").should("have.value", name);
      cy.getByDataTest("error-name").should("not.exist");
    });

    it("shows an error when name exceeds 200 characters", () => {
      const name = "a".repeat(201);
      cy.getByDataTest("input-name").type(name).blur();

      cy.getByDataTest("error-name").should("contain", fields.name.maxlength);
    });

    it("shows an error when address is shorter than 3 characters", () => {
      cy.getByDataTest("input-address").type("aa").blur();

      cy.getByDataTest("error-address")
        .should("be.visible")
        .and("contain", fields.address.minlength);
    });

    it("accepts an address with exactly 3 characters", () => {
      cy.getByDataTest("input-address").type("abc").blur();

      cy.getByDataTest("error-address").should("not.exist");
    });

    it("shows an error for an invalid email", () => {
      cy.getByDataTest("input-email").type("this.email@").blur();

      cy.getByDataTest("error-email").should("contain", fields.email.email);
    });

    it("shows an error when phone is shorter than 9 digits", () => {
      cy.getByDataTest("input-phone").type("12345678").blur();

      cy.getByDataTest("error-phone").should("contain", fields.phone.minlength);
    });

    it("accepts a phone number with exactly 9 digits", () => {
      cy.getByDataTest("input-phone").type("123456789").blur();

      cy.getByDataTest("error-phone").should("not.exist");
    });

    it("accepts a phone number with exactly 14 digits", () => {
      cy.getByDataTest("input-phone").type("12345678901234").blur();

      cy.getByDataTest("error-phone").should("not.exist");
    });

    it("shows an error when phone exceeds 14 digits", () => {
      cy.getByDataTest("input-phone").type("123456789012345").blur();

      cy.getByDataTest("error-phone").should("contain", fields.phone.maxlength);
    });
  });

  context("Successful creation", () => {
    it("creates a customer with valid data", () => {
      const { customer } = generateQueryCreateCustomer();

      cy.getByDataTest("input-name").type(customer.name);
      cy.getByDataTest("input-address").type(customer.address);
      cy.getByDataTest("input-email").type(customer.email);
      cy.getByDataTest("input-phone").type(customer.phone);

      cy.getByDataTest("button-submit").click();

      cy.location("pathname").should("eq", "/admin/customer");
      cy.title().should("eq", "Customer");
      cy.getByDataTest("toast-title")
        .should("be.visible")
        .should("have.text", "Data created");

      cy.getByDataTest("table-search")
        .invoke("val", customer.email)
        .trigger("keyup");

      cy.get("#table tbody tr")
        .should("have.length", 1)
        .within(() => {
          cy.contains(customer.email).should("be.visible");
        });

      cy.query(
        `SELECT id FROM t_customer WHERE email = '${customer.email}'`,
      ).then((rows) => expect(rows).to.have.length(1));

      cy.query(`DELETE FROM t_customer WHERE email = '${customer.email}'`).then(
        (queryResult) => expect(queryResult.affectedRows).to.equal(1),
      );
    });
  });
});
