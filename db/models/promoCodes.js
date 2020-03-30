const client = require('../client');

const promoCodes = {
    read: async () => {
        return (await client.query('SELECT * from "promoCodes"')).rows;
    },
    create: async ({ name, percentage, active }) => {
        const SQL = `INSERT INTO "promoCodes"(name, percentage, active) values($1, $2, $3) returning *`;
        return (await client.query(SQL, [name, percentage, active])).rows[0];
    },
};

module.exports = promoCodes;