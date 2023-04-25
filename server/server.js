const express = require("express");
const mysql = require('mysql');
const PORT = 5000;
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

const app = express();

// app.use(cors());
// app.use(express.json());

// const connection = mysql.createConnection({
//   user: process.env.USER,
//   host: process.env.HOST,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// connection.connect((err) => {
//   if (err) {console.log(err.message);}
//   console.log('database ' + connection.state);
// })

app.listen(PORT, () => {
  console.log("Yay you're port is running");
});