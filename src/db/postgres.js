const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

// const db = new Pool({
//   user: process.env.DB_USER,
//   host: 'localhost',
//   database: process.env.DB,
//   idleTimeoutMillis: 0,
// });

// docker
const db = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'db',
  database: process.env.DB,
  port: 5432,
});

// console.log(db);

module.exports = db;
