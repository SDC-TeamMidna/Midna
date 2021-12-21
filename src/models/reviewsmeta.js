const db = require('../db/postgres');

module.exports = {

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
