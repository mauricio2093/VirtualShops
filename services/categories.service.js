const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize')

class CategoryService {
  constructor() {}

  async create(data) {
      const newCategory = await models.Category.create(data);
      return newCategory;
    };

  async find() {
    const resp = await models.Category.findAll();
    return resp;
  }

  async findOne(id) {
    return id;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Category not found');

    this.categories.splice(index, 1);

    return {
      message: 'Delete',
      status: true,
      id,
    };
  }
}

module.exports = CategoryService;
