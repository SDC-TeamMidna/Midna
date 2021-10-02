const db = require('../db/postgres');
module.exports = {

  //get reviews query
  get: (params) => {
    const {
      page, count, sort, product_id
    } = params;
    const query = `SELECT reviews.id as review_id, rating, summary, recommend, body, to_char(date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as date, reviewer_name, helpfulness, JSON_AGG(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url) ORDER BY reviews_photos.id ASC) as photos FROM public.reviews LEFT JOIN public.reviews_photos ON reviews.id = reviews_photos.review_id WHERE product_id=2 GROUP BY reviews.id ORDER BY date DESC LIMIT 20`;
    return db.query(query);
  },

  //post reviews query

};

// SELECT row_to_json(d) FROM
// (SELECT
// reviews.id as review_id,
// rating,
// summary,
// recommend,
// body,
// to_char(date at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as date,
// reviewer_name,
// helpfulness,
// JSON_AGG(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)) as photos
// FROM public.reviews
// LEFT JOIN public.reviews_photos
// ON reviews.id = reviews_photos.review_id
// WHERE product_id=2
// GROUP BY reviews.id
// ORDER BY date DESC LIMIT 50) as d