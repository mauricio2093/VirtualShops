const express = require('express');
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);

  res.status(200).json(product);
});

router.post('/', async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'creted',
    data: newProduct,
  });
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line prefer-destructuring
    const body = req.body;
    const product = await service.update(id, body);

    res.status(206).json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
