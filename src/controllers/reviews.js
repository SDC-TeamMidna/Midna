const models = require('../models/index');
//require the models that return a promise of date from db

module.exports = {

  get: (params) => {
    console.log(params, 'review controller');
    const resFormat = {
      product: '',
      page: 0,
      count: 5,
      results: [],
    };
    return models.reviews.get(params)
  },

};

//convert model into the view
