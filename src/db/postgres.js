const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const db = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'sdcv2' || process.env.DB,
  idleTimeoutMillis: 0,
});

// console.log(db);

module.exports = db;
