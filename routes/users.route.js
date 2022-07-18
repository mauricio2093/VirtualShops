const express = require('express');
const UsersServices = require('../services/users.service');

const router = express.Router();
const service = new UsersServices();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(id);
  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json({
    message: 'creted',
    data: newUser,
  });
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line prefer-destructuring
    const body = req.body;
    const user = await service.update(id, body);

    res.status(206).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.delete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
