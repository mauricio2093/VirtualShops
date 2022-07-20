const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const type = Joi.string().min(3).max(30);
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const createUserSchema = Joi.object({
  name: name.required(),
  type: type.required(),
  image: image.required(),
  isBlock: isBlock.required(),
});

const updateUserSchema = Joi.object({
  name,
  type,
  image,
  isBlock,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
