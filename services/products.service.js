/* eslint-disable class-methods-use-this */
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category'],
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) throw boom.notFound('Product not found');
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    const product = this.products[index];

    if (index === -1) throw boom.notFound('Product not found');

    this.products[index] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Product not found');

    this.products.splice(index, 1);
    return {
      message: 'Delete',
      status: true,
      id,
    };
  }
}

module.exports = ProductsService;
