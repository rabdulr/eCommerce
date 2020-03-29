const client = require('../client');
const { hash } = require('../auth');

const users = {
  read: async()=> {
    return (await client.query('SELECT * from users')).rows;
  },
  create: async({ username, password, role, firstName, lastName, address, state, zip, city })=> {
    const SQL = `INSERT INTO users(username, password, role, "firstName", "lastName", "address", state, "zip", city) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
    return (await client.query(SQL, [username, await hash(password), role, firstName, lastName, address, state, zip, city])).rows[0];
  },
};

module.exports = users;
