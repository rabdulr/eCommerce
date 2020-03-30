const client = require('../client');
const { hash } = require('../auth');

const users = {
  read: async()=> {
    return (await client.query('SELECT * from users')).rows;
  },
  create: async({ username, password, role, firstName, lastName, address, state, zip, city })=> {
    let userRole;

    if(!role || role === 'USER'){
      userRole = 'USER';
    } else if(role === 'ADMIN'){
      userRole = role;
    } else if(role === 'GUEST'){
      userRole = 'GUEST';
    }

    const SQL = `INSERT INTO users(username, password, role, "firstName", "lastName", "address", state, "zip", city) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
    return (await client.query(SQL, [username, await hash(password), userRole, firstName, lastName, address, state, zip, city])).rows[0];
  },
  createGuest: async({password}) => {
    const role = 'GUEST';
    return (await client.query(`INSERT INTO users(role, password) values($1, $2) RETURNING *`, [ role, await hash(password) ])).rows[0]
  },
  destroyGuest: async({id})=> {
    console.log(id)
    await client.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [id])
  }
};

module.exports = users;
