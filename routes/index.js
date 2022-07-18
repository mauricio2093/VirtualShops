const express = require('express');
const categoriesRouter = require('./categories.route');
const productsRouter = require('./products.route');
const usersRouter = require('./users.route');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
};

module.exports = routerApi;
