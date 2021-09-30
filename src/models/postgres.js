const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'bishalgautam',
  host: 'localhost',
  database: 'sdcv2',
  password: '',
  port: 5432,
  //max number of connections in pool
  max: 20,
  //destroy a connection: never
  idleTimeoutMillis: 0,
});

// //example query: keep pool running, don't pool.end() after every client query
// pool.query('SELECT * FROM public.reviews ORDER BY id ASC LIMIT 30', (err, res) => {
//   // console.log(err, res);
//   pool.end();
// });

module.exports = pool;
