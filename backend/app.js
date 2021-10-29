const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

// middelware
app.use(express.json());
app.use(morgan('tiny')); // log http methods

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'Product1',
    image: 'some_url',
  };
  res.send(product);
});

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop',
  })
  .then(() => {
    console.log('Database connection successful.');
  })
  .catch((e) => {
    console.log('Database connection failed.');
    console.log(e);
  });

app.listen(3000, () => {
  console.log(api);
  console.log('Server started');
});
