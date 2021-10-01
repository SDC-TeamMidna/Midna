const router = require('express').Router();
const controller = require('../controllers/index');

//      /reviews/

router.get('/', (req, res) => {
  const sortOptions = ['relevant', 'newest', 'helpful'];
  const params = {
    page: Number(req.query.page) || 0,
    count: Number(req.query.count) || 5,
    sort: (sortOptions.includes(req.query.sort) ? req.query.sort : 'relevant'),
    product_id: Number(req.query.product_id),
  };

  if (!req.query.product_id || !Number(req.query.product_id)) {
    res.status(422).send('Error: invalid product_id provided');
  } else {
    //this calls on the db controller with the params
    console.log(params);
    res.send('reviews');
  }
});

// console.log(router);

// router.get('/meta', (req, res) => {

//   //success 200
// });

// router.post('/', (req, res) => {

//     //success 201
// });

// router.put('/:review_id/helpful', (req, res) => {
//   //status 204 no content
// });

// router.put('/:review_id/report', (req, res) => {
//   //status 204 no content
// });
module.exports = router;
