const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const db = new Pool({
  user: 'ubuntu',
  host: '3.17.163.41',
  port: 5432,
  database: process.env.PG_DB,
  password: process.env.DB_PASS2,
});

module.exports = db;
