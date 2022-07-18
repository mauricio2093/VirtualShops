const faker = require('faker');

class CategoriesServices {
  constructor() {
    this.categories = [];
    this.generate();
    this.findIndexCategory();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index += 1) {
      this.categories.push({
        id: faker.datatype.uuid(),
        product: faker.commerce.product(),
        description: faker.commerce.productDescription(),
      });
    }
  }

  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  findIndexCategory(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    return index;
  }

  update(id, changes) {
    const index = this.findIndexCategory(id);

    const category = this.categories[index];
    if (index === -1) throw new Error('Category not found');

    this.categories[index] = {
      ...category,
      ...changes,
    };

    return this.categories[index];
  }

  delete(id) {
    const index = this.findIndexCategory(id);

    if (index === -1) throw new Error('Category not found');

    this.categories.splice(index, 1);

    return {
      message: 'Delete',
      status: true,
      id,
    };
  }
}

module.exports = CategoriesServices;
