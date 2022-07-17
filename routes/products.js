const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => { // en este endpoint se espera una lista de productos
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index += 1) {
    products.push({
      name: faker.commerce.productName('girl'),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }

  res.json(products);
});

router.get('/filter', (resq, res) => { // los endpoint especificos deben ir antes de los dinamicos
  res.send('Filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 1000,
  });
});

router.post('/', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  res.json({
    message: 'created',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id,
  });
});

module.exports = router;
