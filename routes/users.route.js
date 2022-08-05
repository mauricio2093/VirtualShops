const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { getUserSchema, createUserSchema, updateUserSchema } = require('../schemas/users.shema');
const UsersServices = require('../services/users.service');

const router = express.Router();
const service = new UsersServices();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.status(200).json(users);
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      // eslint-disable-next-line prefer-destructuring
      const body = req.body;
      const newUser = await service.create(body);

      res.status(201).json({
        message: 'creted',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // eslint-disable-next-line prefer-destructuring
      const body = req.body;
      const user = await service.update(id, body);

      res.status(206).json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
