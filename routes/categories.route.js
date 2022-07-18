const express = require('express');
const CategoriesServices = require('../services/categories.service');

const service = new CategoriesServices();
const router = express.Router();

router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const category = service.findOne(categoryId);
  res.json(category);
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
  const newCategory = service.create(body);
  res.status(201).json({
    message: 'creted',
    data: newCategory,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  const category = service.update(id, body);
  res.status(206).json(category);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.delete(id);
  res.status(206).json(category);
});

module.exports = router;
