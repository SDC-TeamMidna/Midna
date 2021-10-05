const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const db = new Pool({
  user: process.env.DB_USER,
  host: 'db',
  database: process.env.DB,
  password: process.env.DB_PASS,
  max: 20,
  idleTimeoutMillis: 0,
});

// console.log(db);

module.exports = db;
