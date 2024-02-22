const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1997',
  database: 'mais1code',
});

module.exports = connection;
