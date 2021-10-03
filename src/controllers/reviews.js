const models = require('../models/index');

module.exports = {

  getAllReviews: (params) => models.reviews.getAllReviews(params)
    .then((data) => {
      const result = {
        product: params.product_id,
        page: params.page,
        count: data.rowCount,
        results: data.rows,
      };
      return result;
    }),

  postAReview: (inputData) => {
    console.log('post controllers');
    return models.reviews.postAReview(inputData);
  },

};

//convert model into the view
