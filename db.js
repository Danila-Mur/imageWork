const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "imagework",
});

module.exports = pool;
