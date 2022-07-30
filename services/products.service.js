const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index += 1) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName('girl'),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
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

  async find() {
    const query = 'SELECT * FROM public.task';
    const resp = await this.pool.query(query);
    return resp.rows;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw boom.notFound('Product not found');
    if (product.isBlock) throw boom.conflict('Product is block');
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
