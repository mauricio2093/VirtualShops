const faker = require('faker');
const boom = require('@hapi/boom');

class UsersServices {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index += 1) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        type: faker.name.jobTitle(),
        img: faker.image.people(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if (!user) throw boom.notFound('User not found');
    if (user.isBlock) throw boom.conflict('User is block');
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('User not found');

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };

    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('User not found');

    this.users.splice(index, 1);

    return {
      message: 'Delete',
      status: true,
      id,
    };
  }
}
module.exports = UsersServices;
