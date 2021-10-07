const { reviewsmeta } = require('../models/index');

module.exports = {
  getAllMetaData: (productId) => reviewsmeta.getAllMetaData(productId)
    .then(({ rows }) => {
      const response = {
        product_id: productId.toString(),
        ratings: rows[1].json_object_agg,
        recommended: rows[2].json_object_agg,
        characteristics: rows[0].json_object_agg,
      };
      return response;
    }),

};
