const db = require('../db/postgres');

module.exports = {

//get reviews query
  get: (params) => {
    const { page, count, sort, product_id } = params;
    const query = `SELECT * FROM public.reviews WHERE product_id=${product_id} ORDER BY id ASC LIMIT ${count}`;
    return db.query(query);
  },

//post reviews query

};

//return a promise
