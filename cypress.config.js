const { defineConfig } = require("cypress");
const mysql = require("mysql2/promise");

async function queryDb(query, config) {
  // Create connection using configurations stored in env variables
  const connection = await mysql.createConnection(config);

  try {
    const [rows] = await connection.execute(query);
    return rows;
  } finally {
    await connection.end(); // Always close the connection
  }
}

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: "https://project-for-testing.abangkito.com/admin",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        query(query) {
          return queryDb(query, config.env.db);
        },
      });
    },
  },
});
