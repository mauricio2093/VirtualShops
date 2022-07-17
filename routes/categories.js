const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index += 1) {
    categories.push({
      products: faker.commerce.product(),
      description: faker.commerce.productDescription(),
    });
  }
  res.json(categories);
});

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json([
    {
      categoryId,
      product: 'Computer',
      description: 'Is big',
    },
  ]);
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.post('/', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  res.json({
    message: 'creted',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  res.json({
    message: 'Update',
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
