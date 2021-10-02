const models = require('../models/index');

module.exports = {

  get: (params) => {
    console.log(params, 'review controller');
    return models.reviews.get(params);
  },

};

//convert model into the view
