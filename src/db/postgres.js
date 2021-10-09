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
  user: 'ubuntu',
  host: '3.17.163.41',
  port: 5432,
  database: 'sdcv2',
  password: 'password',
});

// console.log(db);

module.exports = db;
