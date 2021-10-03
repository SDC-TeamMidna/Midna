const router = require('express').Router();
const controllers = require('../controllers/index');

router.get('/', (req, res) => {
  const sortOptions = ['relevant', 'newest', 'helpful'];
  const params = {
    page: Number(req.query.page) || 1,
    count: Number(req.query.count) || 5,
    sort: (sortOptions.includes(req.query.sort) ? req.query.sort : 'relevant'),
    product_id: Number(req.query.product_id),
  };

  if (!req.query.product_id || !Number(req.query.product_id)) {
    res.status(422).send('Error: invalid product_id provided');
  } else {
    controllers.reviews.getAllReviews(params)
      .then((data) => {
        // console.log(data.rows);
        res.json(data);
      })
      .catch((err) => console.log(err.stack, 'error in get reviews request, in router'));
  }
});

router.get('/meta', (req, res) => {
  const productId = Number(req.query.product_id);
  if (!productId) {
    res.status(422).send('Error: invalid product_id provided');
  } else {
    controllers.reviewsmeta.getAllMetaData(productId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err.stack, 'err in meta fetch, router'));
  }
});

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(422).send('Error: Review body contains invalid entries');
  } else {
    controllers.reviews.postAReview(req.body)
      .then(() => res.status(201).send('Created'))
      .catch((err) => console.log(err.stack, 'err in post route, router'));
  }
});

// router.put('/:review_id/helpful', (req, res) => {
//   //status 204 no content
// });

// router.put('/:review_id/report', (req, res) => {
//   //status 204 no content
// });
module.exports = router;
