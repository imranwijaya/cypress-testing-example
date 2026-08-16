/// <reference path="../../../support/index.d.ts" />
/// <reference types="cypress" />

import dayjs from "dayjs";
import { generateQueryCreateCustomer } from "../../../support/generate-query";

describe("Customer List", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/customer");
  });

  context("Table", () => {
    it("displays the expected table headers", () => {
      const tableHeaders = [
        "No",
        "Name",
        "Address",
        "Phone",
        "Email",
        "Last Update",
        "Action",
      ];

      tableHeaders.forEach((value, index) => {
        cy.getByDataTest(`table-head-col-${index + 1}`).should(
          "have.text",
          value,
        );
      });
    });

    it("displays the latest customer data", () => {
      const sql = "SELECT * FROM t_customer WHERE id = 1 LIMIT 1";
      cy.query(sql).then((queryResult) => {
        const customer = queryResult[0];
        const expectedData = [
          customer.id,
          customer.name,
          customer.address,
          customer.phone,
          customer.email,
          dayjs(customer.updated_at).format("DD/MMM/YYYY HH:mm:ss"),
        ];

        expectedData.forEach((value, index) => {
          cy.getByDataTest(`table-row-1-col-${index + 1}`).should(
            "have.text",
            value,
          );
        });
      });
    });
  });

  context("Create Customer", () => {
    it("navigates to the create customer page when Create button is clicked", () => {
      cy.getByDataTest("button-add").click();
      cy.location("pathname").should("eq", "/admin/customer/create");
      cy.title().should("eq", "Create Customer");
    });
  });

  context("Update Customer", () => {
    it("navigates to the update customer page when Edit button is clicked", () => {
      cy.getByDataTest("button-edit-table-row-1").click();
      cy.location("pathname").should("include", "/admin/customer/update");
      cy.title().should("eq", "Update Customer");
    });
  });

  context("Delete Customer", () => {
    it("displays the delete confirmation dialog", () => {
      cy.getByDataTest("button-delete-table-row-2").click();

      cy.getByDataTest("delete-modal").should("be.visible");
      cy.getByDataTest("delete-confirm").should("have.text", "Yes");
      cy.getByDataTest("delete-cancel").should("have.text", "No");
    });

    it("closes the delete confirmation dialog when Cancel is clicked", () => {
      cy.getByDataTest("button-delete-table-row-2").click();

      cy.getByDataTest("delete-modal").should("be.visible");
      cy.getByDataTest("delete-cancel").click();
      cy.getByDataTest("delete-modal").should("not.exist");
    });

    it("deletes the customer and shows a success message", () => {
      const { sql, customer } = generateQueryCreateCustomer();
      cy.query(sql).then((queryResult) => {
        const customerId = queryResult.insertId;

        expect(queryResult.affectedRows).to.equal(1);
        expect(customerId).to.be.greaterThan(1);

        cy.reload();
      });

      cy.getByDataTest("table-search")
        .invoke("val", customer.email)
        .trigger("keyup");

      cy.get("#table tbody tr")
        .should("have.length", 1)
        .within(() => {
          cy.contains(customer.email).should("be.visible");
          cy.getByDataTestLike("button-delete-table-row-").click();
        });

      cy.getByDataTest("delete-modal").should("be.visible");

      cy.intercept("POST", "/admin/customer/delete/*").as("deleteCustomer");

      cy.getByDataTest("delete-confirm").click();

      cy.wait("@deleteCustomer").its("response.statusCode").should("eq", 200);

      cy.location("pathname").should("eq", "/admin/customer");
      cy.title().should("eq", "Customer");
      cy.getByDataTest("toast-title")
        .should("be.visible")
        .and("have.text", "Data deleted");

      cy.query(
        `SELECT id FROM t_customer WHERE email = '${customer.email}'`,
      ).then((rows) => expect(rows).to.have.length(0));
    });
  });
});
