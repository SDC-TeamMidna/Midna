const { Pool } = require('pg');

const db = new Pool({
  user: 'bishalgautam',
  host: 'localhost',
  database: 'sdcv2',
  password: '',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 0,
});

module.exports = db;
