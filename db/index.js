const client = require('./client');

const { authenticate, compare, findUserFromToken, hash } = require('./auth');

const models = { products, users, orders, lineItems } = require('./models');

const {
  getCart,
  getOrders,
  addToCart,
  removeFromCart,
  createOrder,
  getLineItems,
  removeOrder
} = require('./userMethods');

const sync = async () => {
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS "lineItems";
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(20) DEFAULT 'USER',
      CHECK (char_length(username) > 0)
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL UNIQUE,
      price DECIMAL NOT NULL,
      CHECK (char_length(name) > 0)
    );
    CREATE TABLE orders(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "userId" UUID REFERENCES users(id) NOT NULL,
      status VARCHAR(10) DEFAULT 'CART',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE "lineItems"(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      "orderId" UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
      "productId" UUID REFERENCES products(id) NOT NULL,
      quantity INTEGER DEFAULT 1
    );
  `;
  await client.query(SQL);

  const _users = {
    lucy: {
      username: 'lucy',
      password: 'LUCY',
      role: 'ADMIN'
    },
    moe: {
      username: 'moe',
      password: 'MOE',
      role: null
    },
    curly: {
      username: 'larry',
      password: 'LARRY',
      role: null
    },
    red: {
      username: 'red',
      password: 'RED',
      role: null
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
  const [lucy, moe] = await Promise.all(Object.values(_users).map(user => users.create(user)));
  const [foo, bar, bazz] = await Promise.all(Object.values(_products).map(product => products.create(product)));

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
  return {
    users: userMap,
    products: productMap
  };
};

const createUserAccount = async ({ username, password }) => {
  const SQL = 'INSERT INTO users(username, password) values($1, $2) returning *'; return (await client.query(SQL, [username, password])).rows;
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
  createUserAccount
};
