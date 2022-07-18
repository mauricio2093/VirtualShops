const express = require('express');
const UsersServices = require('../services/users.service');

const router = express.Router();
const service = new UsersServices();

router.get('/', (req, res) => {
  const users = service.find();
  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  res.status(200).json(user);
});

router.post('/', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json({
    message: 'creted',
    data: newUser,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  const user = service.update(id, body);
  res.status(206).json(user);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.delete(id);
  res.status(206).json(user);
});

module.exports = router;
