const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1997',
  database: 'informei_db',
});

module.exports = connection;
