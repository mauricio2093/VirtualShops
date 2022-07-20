const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { getCategoriesSchema, createCategoriesSchema, updateCategoriesSchema } = require('../schemas/categories.schema');
const CategoriesServices = require('../services/categories.service');

const service = new CategoriesServices();
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get(
  '/:categoryId',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.findOne(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCategoriesSchema, 'body'),
  async (req, res) => {
    // eslint-disable-next-line prefer-destructuring
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json({
      message: 'creted',
      data: newCategory,
    });
  },
);

router.patch(
  '/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  validatorHandler(updateCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // eslint-disable-next-line prefer-destructuring
      const body = req.body;
      const category = await service.update(id, body);

      res.status(206).json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.delete(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
