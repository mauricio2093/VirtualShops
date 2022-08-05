/* eslint-disable class-methods-use-this */
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersServices {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const resp = await models.User.findAll();
    return resp;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) throw boom.notFound('User not found');
    return user;
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    const resp = await user.update(changes);
    return resp;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    await user.destroy();
    return { id };
  }
}
module.exports = UsersServices;
