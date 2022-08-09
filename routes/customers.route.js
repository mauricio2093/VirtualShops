const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { getCustomerSchema, createCustomerSchema, updateCustomerSchema } = require('../schemas/customers.schema');
const CustomersServices = require('../services/customers.service');

const router = express.Router();
const service = new CustomersServices();

router.get('/', async (req, res) => {
  const customers = await service.find();
  res.status(200).json(customers);
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      // eslint-disable-next-line prefer-destructuring
      const body = req.body;
      const newCustomer = await service.create(body);

      res.status(201).json({
        message: 'creted',
        data: newCustomer,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // eslint-disable-next-line prefer-destructuring
      const body = req.body;
      const customer = await service.update(id, body);

      res.status(206).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.delete(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
