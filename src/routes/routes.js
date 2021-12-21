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
        res.json(data);
      })
      .catch((err) => res.json(err));
  }
});

router.get('/meta', (req, res) => {
  const productId = Number(req.query.product_id);
  if (!productId) {
    res.status(422).send('Error: invalid product_id provided');
  } else {
    controllers.reviewsmeta.getAllMetaData(productId)
      .then((data) => {
        console.log(POSTGRES_USER);
        res.json(data);
      })
      .catch(() => res.status(500).send('An error occurred. If this error persists, contact your instruction team.'));
  }
});

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(422).send('Error: Review body contains invalid entries');
    console.log('no body');
  } else {
    // console.log(req.body, 'body');
    controllers.reviews.postAReview(req.body)
      .then(() => res.status(201).send('Created'))
      .catch(() => res.status(500).send('An error occurred. If this error persists, contact your instruction team.'));
  }
});

router.put('/:review_id/helpful', (req, res) => {
  const reviewId = req.params.review_id;
  controllers.reviews.updateHelpful(reviewId)
    .then(() => {
      res.status(201).send(`Updated review ${reviewId} as helpful`);
    })
    .catch(() => res.status(500).send('An error occurred. If this error persists, contact your instruction team.'));
});

router.put('/:review_id/report', (req, res) => {
  const reviewId = req.params.review_id;
  controllers.reviews.reportReview(reviewId)
    .then(() => {
      res.status(201).send(`Reported review ${reviewId}.`);
    })
    .catch(() => res.status(500).send('An error occurred. If this error persists, contact your instruction team.'));
});

module.exports = router;
