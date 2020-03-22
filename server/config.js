require('dotenv').config();
params = {
  env: process.env.NODE_ENV,
  setup_port: process.env.SETUP_PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_name: process.env.DB_NAME
}

module.exports = params