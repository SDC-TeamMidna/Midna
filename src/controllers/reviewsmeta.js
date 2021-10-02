const { reviewsmeta } = require('../models/index');

module.exports = {
  getAllMetaData: (productId) => reviewsmeta.getAllMetaData(productId)
    .then((data) => {
      const response = {
        product_id: productId.toString(),
        ratings: data[0].rows[0].ratings,
        recommended: data[1].rows[0].recommended,
        characteristics: data[2].rows[0].characteristics,
      };
      return response;
    }),

};
