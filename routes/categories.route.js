const express = require('express');
const CategoriesServices = require('../services/categories.service');

const service = new CategoriesServices();
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const category = await service.findOne(categoryId);
  res.json(category);
});

router.post('/', async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json({
    message: 'creted',
    data: newCategory,
  });
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line prefer-destructuring
    const body = req.body;
    const category = await service.update(id, body);

    res.status(206).json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await service.delete(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
