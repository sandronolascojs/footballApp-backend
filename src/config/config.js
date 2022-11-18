import { config } from 'dotenv'
config()

module.exports = {
  NODE_ENV: process.env.NODE_ENVIRONMENT,
  PORT: process.env.PORT,
  DB: {
    production: {
      dialect: process.env.PRODUCTION_DB_DIALECT,
      name: process.env.PRODUCTION_DB_NAME,
      host: process.env.PRODUCTION_DB_HOST,
      port: process.env.PRODUCTION_DB_PORT,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASSWORD
    }
  },
  IPLOOKUP: {
    apiUrl: process.env.API_LOOKUP_URL,
    apiKey: process.env.API_LOOKUP_KEY,
    apiHost: process.env.APILOOKUP_API_HOST
  },
  JWT_SECRET: process.env.JWT_SECRET,
  NODEMAILER: {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    username: process.env.NODEMAILER_USERNAME,
    password: process.env.NODEMAILER_PASSWORD
  },
  MONGODB_URI: process.env.MONGODB_URI,
  CLIENT_URI: {
    production: process.env.CLIENT_URI_PRODUCTION,
    development: process.env.CLIENT_URI_DEVELOPMENT
  }
}
