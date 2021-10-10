const db = require('../db/postgres');

module.exports = {

  // getReviewMetaRatings: (productId) => {
  //   const psqlQuery = `SELECT
  //   json_object_agg(
  //     to_char(results.rating, 'FM9'),
  //     to_char(results.count, 'FM9')) AS ratings
  //   FROM
  //   (SELECT reviews.rating,
  //   COUNT(*)
  //   FROM reviews
  //   WHERE product_id = ${productId}
  //   GROUP BY 1
  //   ORDER BY 1) results
  //   `;
  //   return db.query(psqlQuery);
  // },

  // getReviewMetaRecs: (productId) => {
  //   const psqlQuery = `SELECT
  //   json_build_object(
  //   'false', to_char(SUM(CASE WHEN "recommend" = false THEN 1 ELSE 0 END), 'FM9'),
  //   'true', to_char(SUM(CASE WHEN "recommend" = true THEN 1 ELSE 0 END), 'FM9')
  //   ) AS recommended
  //   FROM reviews
  //   WHERE reviews.product_id = ${productId}
  //   GROUP BY reviews.product_id
  //   `;
  //   return db.query(psqlQuery);
  // },

  // getReviewMetaChar: (productId) => {
  //   const psqlQuery = `SELECT json_object_agg(results.name, results.json_build_object) AS characteristics FROM
  //   (SELECT
  //   characteristics.product_id as product_id,
  //   characteristics.name,
  //   json_build_object('id', characteristics.id, 'value', to_char(AVG(characteristic_reviews.value), 'FM9.000000009'))
  //   FROM characteristics
  //   INNER JOIN characteristic_reviews
  //   ON characteristics.id = characteristic_reviews.characteristic_id
  //   WHERE characteristics.product_id = ${productId}
  //   GROUP BY
  //   characteristics.product_id,
  //   characteristics.id) results
  //   `;
  //   return db.query(psqlQuery);
  // },

  // getAllMetaData: (productId) => Promise.all([module.exports.getReviewMetaRatings(productId),
  //   module.exports.getReviewMetaRecs(productId), module.exports.getReviewMetaChar(productId)]),
  getAllMetaData: (productId) => {
    const psqlQuery = `SELECT json_object_agg(results.name, results.json_build_object) from
    (SELECT
    product.id as product_id,
    characteristics.name,
    json_build_object('id', characteristics.id, 'value', sum(characteristic_reviews.value)::float8 / count(characteristic_reviews.value)::float8)
    FROM product
    INNER JOIN characteristics
    ON product.id = characteristics.product_id
    INNER JOIN characteristic_reviews
    ON characteristics.id = characteristic_reviews.characteristic_id
    WHERE product.id = ${productId}
    GROUP BY
    product.id,
    characteristics.id) results
    UNION ALL
    SELECT
        json_object_agg(
          to_char(results.rating, 'FM9'),
          to_char(results.count, 'FM9')) AS ratings
        FROM
        (SELECT reviews.rating,
        COUNT(*)
        FROM reviews
        WHERE product_id = ${productId}
        GROUP BY 1
        ORDER BY 1) results
    UNION ALL
    SELECT
        json_build_object(
        'false', to_char(SUM(CASE WHEN "recommend" = false THEN 1 ELSE 0 END), 'FM999999'),
        'true', to_char(SUM(CASE WHEN "recommend" = true THEN 1 ELSE 0 END), 'FM9999999')
        ) AS recommended
        FROM reviews
        WHERE reviews.product_id = ${productId}
        GROUP BY reviews.product_id`;
    return db.query(psqlQuery);
  },

};


    // .then((result) => {
    //   // console.log('result', result[0].rows.ratings['2'].length, result[1].rows, result[2].rows);
    //   const reviewMeta = {
    //     product_id: productId,
    //     ratings: result[0].rows[0].ratings,
    //     recommended: result[1].rows[0].recommended,
    //     characteristics: result[2].rows[0].characteristics,
    //   };
    //   res.status(200).send(reviewMeta);
    // })
    // .catch((err) => {
    //   console.log('error', err);
    //   res.status(404).send(err);
    // }),