/* eslint-disable class-methods-use-this */
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CostumersServices {
  // eslint-disable-next-line no-empty-function, no-useless-constructor
  constructor() {}

  async find() {
    const resp = await models.Customer.findAll({
      include: ['user'],
    });
    return resp;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) throw boom.notFound('Customer not found');
    return customer;
  }

  async create(data) {
    const NewCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return NewCustomer;
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
