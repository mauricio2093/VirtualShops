const express = require('express');
const faker = require('faker');
const productsRouter = require('./products');

export const app = express();
export const router = express.Router();
export const contextualData = faker;

export const routerApi = (endPoint) => {
  endPoint.use('/categories', productsRouter);
  endPoint.use('/products', productsRouter);
  endPoint.use('/users', productsRouter);
};
