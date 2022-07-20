const Joi = require('joi');

const id = Joi.string().uuid();
const product = Joi.string().min(3).max(30);
const description = Joi.string().min(3).max(80);
const isBlock = Joi.boolean();

const createCategoriesSchema = Joi.object({
  product: product.required(),
  description: description.required(),
  isBlock: isBlock.required(),
});

const updateCategoriesSchema = Joi.object({
  product,
  description,
  isBlock,
});

const getCategoriesSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategoriesSchema, updateCategoriesSchema, getCategoriesSchema };
