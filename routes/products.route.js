const express = require('express');
const ProductsService = require('../services/products.service');

const service = new ProductsService();
const router = express.Router();

router.get('/', (req, res) => { // en este endpoint se espera una lista de productos
  const products = service.find();

  res.status(200).json(products);
});

router.get('/filter', (resq, res) => { // los endpoint especificos deben ir antes de los dinamicos
  res.send('Filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);

  res.status(200).json(product);
});

router.post('/', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json({
    message: 'creted',
    data: newProduct,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  const product = service.update(id, body);

  res.status(206).json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.delete(id);
  res.status(200).json(product);
});

module.exports = router;
