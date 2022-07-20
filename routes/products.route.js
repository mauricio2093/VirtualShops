const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/product.schema');
const ProductsService = require('../services/products.service');

const service = new ProductsService();
const router = express.Router();

router.get('/', async (req, res) => { // en este endpoint se espera una lista de productos
  const products = await service.find();

  res.status(200).json(products);
});

router.get('/filter', (resq, res) => { // los endpoint especificos deben ir antes de los dinamicos
  res.send('Filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'creted',
      data: newProduct,
    });
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // eslint-disable-next-line prefer-destructuring
      const body = req.body;
      const product = await service.update(id, body);

      res.status(206).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
