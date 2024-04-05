const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

console.log(`hello, ${process.env.HELLO}`)

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1997',
  database: 'informei_db',
});

module.exports = connection;
