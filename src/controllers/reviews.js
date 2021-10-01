const models = require('../models/index');
//require the models that return a promise of date from db

module.exports = {

    get: (params) => {
      console.log(params, 'review controller');
      return models.reviews.get(params);
    },

  };




  // get: function (req, res) {
  //   models.messages.getAll(function(err, results) {
  //     if (err) { /* do something */ }
  //     res.json(results);
  //   });
  // },
  // post: function (req, res) {
  //   var params = [req.body.message, req.body.username, req.body.roomname];
  //   models.messages.create(params, function(err, results) {
  //     if (err) { /* do something */ }
  //     res.sendStatus(201);
  //   });
  // }