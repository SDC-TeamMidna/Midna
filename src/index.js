const express = require('express');
const db = require('./models/postgres');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  // console.log(req.query);
  res.send('Welcome');
});

app.get('/reviews/', (req, res) => {
  const sortOptions = ['relevant', 'newest', 'helpful'];
  const params = {
    page: Number(req.query.page) || 0,
    count: Number(req.query.count) || 5,
    sort: (sortOptions.includes(req.query.sort) ? req.query.sort : 'relevant'),
    product_id: Number(req.query.product_id),
  };
  console.log(params);

  if (!req.query.product_id || !Number(req.query.product_id)) {
    res.status(422).send('Error: invalid product_id provided');
  } else {
    console.log(params);
    res.send('reviews');
  }
});

app.get('/reviews/meta', (req, res) => {

  //success 200
});

app.post('/reviews', (req, res) => {

    //success 201
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  //status 204 no content
});

app.put('/reviews/:review_id/report', (req, res) => {
  //status 204 no content
});

app.listen(PORT, () => {
  console.log('app is running on PORT', PORT);
});
