const client = require('../client');

const products = {
  read: async()=> {
    return (await client.query('SELECT * from products')).rows;
  },
  create: async({ name, price, image, description })=> {
    const SQL = `INSERT INTO products(name, price, image, description) values($1, $2, $3, $4) returning *`;
    return (await client.query(SQL, [name, price, image, description ])).rows[0];
  },
};

module.exports = products;
