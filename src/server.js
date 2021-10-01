const express = require('express');
const router = require('./routes/routes');
// console.log(router);

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/reviews', router);

app.listen(PORT, () => {
  console.log('app is running on PORT', PORT);
});
