const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategoriesSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategoriesSchema = Joi.object({
  name,
  image,
});

const getCategoriesSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategoriesSchema, updateCategoriesSchema, getCategoriesSchema };
