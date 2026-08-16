const { defineConfig } = require("cypress");
const mysql = require("mysql2/promise");
const env = require("./env.config");

async function queryDb(query, config) {
  const connection = await mysql.createConnection(config);

  try {
    const [rows] = await connection.execute(query);
    return rows;
  } finally {
    await connection.end();
  }
}

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    experimentalRunAllSpecs: true,

    baseUrl: env.baseUrl,

    env: {
      login: env.login,
      db: env.db,
    },

    setupNodeEvents(on, config) {
      on("task", {
        query(query) {
          return queryDb(query, config.env.db);
        },
      });
    },
  },
});
