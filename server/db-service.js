const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = connection;
