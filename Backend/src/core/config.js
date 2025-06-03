const path = require('path');
const dotenv = require('dotenv');

const envFound = dotenv.config({ path: path.resolve(__dirname, '../../.env') });
if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

module.exports = {
  env: process.env.NODE_ENV,
  api: {
    prefix: '/api',
  },
  port: process.env.PORT || 8000,
  database: {
    client: process.env.DB_CONNECTION || 'pg',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME || process.env.DB_DATABASE,
  },
  emailUser: process.env.EMAIL_SENDER,
  emailPass: process.env.EMAIL_PASSWORD,
};
