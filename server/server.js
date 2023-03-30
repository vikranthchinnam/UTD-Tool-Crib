const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
PORT = 5000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {console.log(err.message);}
  console.log('database ' + connection.state);
})

app.use('/tool', require('./routes/toolRoutes'))
app.use('/team', require('./routes/teamRoutes'))
app.use('/checkout', require('./routes/checkoutRoutes'))
app.use('/log', require('./routes/logRoutes'))

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
})