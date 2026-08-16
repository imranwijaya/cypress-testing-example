import mysql from "mysql2/promise";

declare namespace Cypress {
  interface Chainable {
    /**
     * Logs into the application via API.
     * @example cy.login('user@example.com', 'password123')
     */
    login(email: string, password: string): Chainable<void>;

    /**
     * Custom command to select a DOM element by its data-test attribute.
     * @example cy.getByDataTest('button-submit')
     */
    getByDataTest(
      selector: string,
      ...args: any[]
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select a DOM element by its data-test* attribute.
     * @example cy.getByDataTest('button-submit')
     */
    getByDataTestLike(
      selector: string,
      ...args: any[]
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to get data from database
     * @example cy.query("SELECT '1'")
     */
    query(query: string): Promise<mysql.QueryResult>;
  }
}
