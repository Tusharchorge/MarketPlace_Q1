const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root12345',
  database: 'marketplace'
});

module.exports = pool;
