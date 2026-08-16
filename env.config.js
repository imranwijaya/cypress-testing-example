const { z } = require("zod");
const dotenv = require("dotenv");

dotenv.config();

const envSchema = z.object({
  CYPRESS_BASE_URL: z.url(),

  CYPRESS_LOGIN_NAME: z.string().min(1),
  CYPRESS_LOGIN_EMAIL: z.email(),
  CYPRESS_LOGIN_PASSWORD: z.string().min(1),

  CYPRESS_DB_HOST: z.string().min(1),
  CYPRESS_DB_USER: z.string().min(1),
  CYPRESS_DB_PASSWORD: z.string().min(1),
  CYPRESS_DB_NAME: z.string().min(1),
  CYPRESS_DB_PORT: z.coerce.number().int().positive(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment configuration:");
  console.error(z.prettifyError(result.error));
  throw new Error("Environment configuration validation failed.");
}

const env = result.data;

module.exports = {
  baseUrl: env.CYPRESS_BASE_URL,

  login: {
    name: env.CYPRESS_LOGIN_NAME,
    email: env.CYPRESS_LOGIN_EMAIL,
    password: env.CYPRESS_LOGIN_PASSWORD,
  },

  db: {
    host: env.CYPRESS_DB_HOST,
    user: env.CYPRESS_DB_USER,
    password: env.CYPRESS_DB_PASSWORD,
    database: env.CYPRESS_DB_NAME,
    port: env.CYPRESS_DB_PORT,
    dateStrings: ["DATE", "DATETIME"],
  },
};
