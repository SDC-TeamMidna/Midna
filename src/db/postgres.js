const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const db = new Pool({
  user: process.env.USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB || 'postgres',
  password: '',
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 0,
});

module.exports = db;
