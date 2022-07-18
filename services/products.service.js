const faker = require('faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index += 1) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName('girl'),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    const product = this.products[index];

    if (index === -1) throw new Error('Product not found');

    this.products[index] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw new Error('Product not found');

    this.products.splice(index, 1);
    return {
      message: 'Delete',
      status: true,
      id,
    };
  }
}

module.exports = ProductsService;
