const express = require('express');
const db = require('./models/postgres');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(PORT, () => {
  console.log('app is running on PORT', PORT);
});
