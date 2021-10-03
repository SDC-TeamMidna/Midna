const db = require('../db/postgres');

module.exports = {

  getAllReviews: (params) => {
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

  postURLs: (reviewId, photos) => {
    const mapUrlsToSQL = photos.map((url, index) => {
      if (index === photos.length - 1) {
        return `('${url}', ${reviewId})`;
      }
      return `('${url}', ${reviewId}), `;
    }).join(' ');
    const query = `INSERT INTO
    reviews_photos (url, review_id)
    VALUES ${mapUrlsToSQL};`;
    return db.query(query);
  },

  postCharValues: (reviewId, characteristics) => {
    const charEntries = Object.entries(characteristics);
    const mapCharsToSQL = charEntries.map((char, index) => {
      if (index === charEntries.length - 1) {
        return `(${char[0]}, ${reviewId}, ${char[1]})`;
      }
      return `(${char[0]}, ${reviewId}, ${char[1]}), `;
    }).join(' ');
    const query = `INSERT into characteristic_reviews (characteristic_id, review_id, value)
    VALUES ${mapCharsToSQL};`;
    return db.query(query);
  },

  postAReview: (inputData) => {
    // console.log(inputData, 'models');
    const {
      product_id, rating, recommend,
      body, name, email, summary, photos, characteristics,
    } = inputData;
    const date = new Date().toISOString();
    const qparams = [rating, recommend, body, date, name, product_id, email, summary];
    const query = `INSERT INTO reviews (rating, recommend, body, date, reviewer_name, product_id, reviewer_email, summary, reported)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)
    RETURNING id`;
    return db.query(query, qparams)
      .then(({ rows }) => {
        const reviewId = rows[0].id;
        module.exports.postURLs(reviewId, photos);
        return reviewId;
      })
      .then((reviewId) => module.exports.postCharValues(reviewId, characteristics));
  },

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