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
    const qparams = [product_id, count, qpage];
    // console.log(qparams, 'sort params');
    const query = `SELECT reviews.id as review_id, rating, summary, recommend,
    CASE WHEN reviews.response = 'null' THEN NULL ELSE reviews.response END as response, body,
    date, reviewer_name, helpfulness,
    COALESCE(JSON_AGG(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)
    ORDER BY reviews_photos.id ASC) FILTER (WHERE reviews_photos.url IS NOT NULL), '[]') as photos
    FROM public.reviews LEFT JOIN public.reviews_photos ON reviews.id = reviews_photos.review_id
    WHERE product_id=$1
    GROUP BY reviews.id
    ORDER BY ${qsort} DESC
    OFFSET $3 ROWS
    FETCH NEXT $2 ROWS ONLY`;
    return db.query(query, qparams);
  },

  //post reviews query

};

// COALESCE(JSON_AGG(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)
// ORDER BY reviews_photos.id ASC) FILTER (WHERE reviews_photos.url IS NOT NULL), '[]') as photos

// SELECT * FROM (SELECT reviews.id
//   as review_id, rating, summary, recommend,
//   CASE WHEN reviews.response = 'null' THEN NULL ELSE reviews.response END as response,
//   body, date, reviewer_name, helpfulness,
//   COALESCE(JSON_AGG(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)
//   ORDER BY reviews_photos.id ASC) FILTER (WHERE reviews_photos.url IS NOT NULL), '[]') as photos
//   FROM public.reviews LEFT JOIN public.reviews_photos
//   ON reviews.id = reviews_photos.review_id
//   WHERE product_id=40355
//   GROUP BY reviews.id
//   OFFSET 3 ROWS
//   FETCH FIRST 3 ROWS ONLY) AS data
//   ORDER BY data.helpfulness DESC