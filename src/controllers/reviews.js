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

  postAReview: (inputData) => models.reviews.postAReview(inputData),

  updateHelpful: (reviewId) => models.reviews.updateHelpful(reviewId),

  reportReview: (reviewId) => models.reviews.reportReview(reviewId),

};

//convert model into the view
