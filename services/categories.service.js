const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize')

class CategoryService {
  constructor() { }

  async create(data) {
      const newCategory = await models.Category.create(data);
      return newCategory;
    }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) throw boom.notFound('Category not found');
    return category;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const resp = await model.update(changes);
    return resp;
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
