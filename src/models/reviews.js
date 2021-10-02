const db = require('../db/postgres');

module.exports = {

  //get reviews query
  get: (params) => {
    const {
      page, count, sort, product_id
    } = params;
    const sortOptions = { helpful: 'helpfulness', newest: 'date', relevant: 'review_id' };
    const qsort = sortOptions[sort];
    const qpage = (page - 1) * count;
    const qparams = [product_id, qsort, count, qpage];
    console.log(qparams);
    const query = `SELECT reviews.id as review_id, rating, summary, recommend, body,
    date, reviewer_name, helpfulness,
    JSON_AGG(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url) ORDER BY reviews_photos.id ASC) as photos
    FROM public.reviews LEFT JOIN public.reviews_photos ON reviews.id = reviews_photos.review_id
    WHERE product_id=$1
    GROUP BY reviews.id
    ORDER BY $2 DESC
    LIMIT $3
    OFFSET $4 ROWS`;
    return db.query(query, qparams);
  },

  //post reviews query

};
