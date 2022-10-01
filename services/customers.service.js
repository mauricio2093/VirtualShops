const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CostumersServices {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async find() {
    const customer = await models.Customer.findAll({
      include: ['user'],
    });
    return customer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) throw boom.notFound('Customer not found');
    return customer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const resp = await model.update(changes);
    return resp;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}
module.exports = CostumersServices;
