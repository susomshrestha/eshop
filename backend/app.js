const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRouter = require('./routers/products');

require('dotenv/config');
const cors = require('cors');

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());
// middelware
app.use(express.json());
app.use(morgan('tiny')); // log http methods

// Routes
app.use(`${api}/products`, productRouter);

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
