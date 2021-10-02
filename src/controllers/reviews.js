const models = require('../models/index');

module.exports = {

  getAllReviews: (params) => {
    console.log(params, 'review controller');
    return models.reviews.getAllReviews(params)
      .then((data) => {
        const result = {
          product: params.product_id,
          page: params.page,
          count: data.rowCount,
          results: data.rows,
        };
        return result;
      });
  },

};

//convert model into the view
