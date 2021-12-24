const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const auth = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const cors = require('cors');
require('dotenv/config');

const productRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');
const userRouter = require('./routers/users');
const orderRouter = require('./routers/orders');

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());

// middelware
app.use(express.json());
app.use(morgan('tiny')); // log http methods
app.use(auth());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// Routes
app.use(`${api}/products`, productRouter);
app.use(`${api}/user`, userRouter);
app.use(`${api}/order`, orderRouter);
app.use(`${api}/category`, categoryRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log('Database connection successful.');
  })
  .catch((e) => {
    console.log('Database connection failed.');
    console.log(e);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});
