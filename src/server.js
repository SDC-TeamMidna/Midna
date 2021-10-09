require('newrelic');

const path = require('path');
const express = require('express');
const router = require('./routes/routes');
require('dotenv').config({ path: path.join(__dirname, '/config/.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/reviews', router);

// app.get('/loaderio-3adea258eed4ca8f25ef44aa0c3ced52', (req, res) => {
//   res.send('loaderio-3adea258eed4ca8f25ef44aa0c3ced52');
// });

app.listen(PORT, () => {
  console.log('app is running on PORT', PORT);
});
