const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index += 1) {
    users.push({
      name: faker.name.findName(),
      type: faker.name.jobTitle(),
      img: faker.image.people(),
    });
  }
  res.status(200).json(users);
  /* const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  }
  res.send('no hay parametros'); */
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (Number(id) > 999) {
    res.status(404).json({
      messege: 'Not Found',
    });
  }
  res.status(200).json({
    id,
    name: 'Arturo',
    type: 'employee',
  });
});

router.post('/', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  res.status(206).json({
    message: 'update',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'delete',
    id,
  });
});

module.exports = router;
