const client = require('./client');
const faker = require('faker');


const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = { products, users, orders, lineItems, promoCodes } = require('./models');

const {
  getCart,
  getOrders,
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  removeOrder,
  updatePassword
} = require('./userMethods');

const sync = async () => {
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS "promoCodes";
    DROP TABLE IF EXISTS "productRatings";
    DROP TABLE IF EXISTS "lineItems";
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "firstName" VARCHAR(100),
      "lastName" VARCHAR(100),
      address VARCHAR(100),
      city VARCHAR(100),
      state VARCHAR(25),
      zip VARCHAR(10),
      username VARCHAR(100) NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      password VARCHAR(100) NOT NULL,
      role VARCHAR(20) DEFAULT 'USER',
      CHECK (char_length(username) > 0)
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL UNIQUE,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL NOT NULL,
      CHECK (char_length(name) > 0)
    );
    CREATE TABLE orders(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "userId" UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      status VARCHAR(10) DEFAULT 'CART',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE "lineItems"(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "orderId" UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
      "productId" UUID REFERENCES products(id) NOT NULL,
      quantity INTEGER
    );
    CREATE TABLE "promoCodes"(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(250) NOT NULL UNIQUE,
      percentage DECIMAL(3,2) NOT NULL,
      active BOOLEAN NOT NULL
    );
  `;
  await client.query(SQL);

  const _users = {
    lucy: {
      firstName: 'Lucy',
      lastName: 'Granger',
      address: '888 Hollister',
      city: 'San Luis Obispo',
      state: 'CA',
      zip: '93405',
      username: 'lucy',
      password: 'LUCY',
      role: 'ADMIN'
    },
    moe: {
      firstName: 'Moe',
      lastName: 'Money',
      address: '123 Murray',
      city: 'San Luis Obispo',
      state: 'CA',
      zip: '93405',
      username: 'moe',
      password: 'MOE',
      role: 'USER'
    },
    curly: {
      firstName: 'Larry',
      lastName: 'Styles',
      address: '1440 California',
      city: 'San Luis Obispo',
      state: 'CA',
      zip: '93405',
      username: 'larry',
      password: 'LARRY',
      role: 'USER'
    },
    red: {
      firstName: 'Red',
      lastName: 'Abdul Rahim ',
      address: '2045 Swazey',
      city: 'San Luis Obispo',
      state: 'CA',
      zip: '93401',
      username: 'red',
      password: 'RED',
      role: 'ADMIN'
    },
  };

  const _products = {
    foo: {
      name: 'foo',
      price: 2
    },
    bar: {
      name: 'bar',
      price: 2
    },
    bazz: {
      name: 'bazz',
      price: 2.50
    },
    quq: {
      name: 'quq',
      price: 11.99
    }
  };

  const _promoCodes = {
    opening: {
      name: 'grand opening discount',
      percentage: 0.15,
      active: true
    }
  };

  const [lucy, moe] = await Promise.all(Object.values(_users).map(user => users.create(user)));
  const [opening] = await Promise.all(Object.values(_promoCodes).map(promoCode => promoCodes.create(promoCode)));
  // const [foo, bar, bazz] = await Promise.all(Object.values(_products).map(product => products.create(product)));

  for (i = 0; i < 15; i++) {
    products.create({ name: `${faker.company.bsAdjective()} ${faker.commerce.product()}`, price: faker.commerce.price(), image: `${faker.image.cats()}?random=${Math.random() * 10000000000000000}`, description: faker.company.catchPhraseDescriptor() })
  };

  const _orders = {
    moe: {
      userId: moe.id
    },
    lucy: {
      userId: lucy.id
    }
  };

  const userMap = (await users.read()).reduce((acc, user) => {
    acc[user.username] = user;
    return acc;
  }, {});
  const productMap = (await products.read()).reduce((acc, product) => {
    acc[product.name] = product;
    return acc;
  }, {});
  const promoCodeMap = (await promoCodes.read()).reduce((acc, promoCode) => {
    acc[promoCode.name] = promoCode;
    return acc;
  }, {});
  return {
    users: userMap,
    products: productMap,
    promoCodes: promoCodeMap
  };
};

module.exports = {
  sync,
  models,
  authenticate,
  findUserFromToken,
  getCart,
  getOrders,
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  removeOrder,
  updatePassword
};
