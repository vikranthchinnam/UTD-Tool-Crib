const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'toolcrib'
});

module.exports = connection;

