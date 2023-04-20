const express = require("express");
const cors = require('cors');
PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

// lets req.body objects be defined idk why
app.use(express.urlencoded({extended: false}))

// app.use('/tool', require('./routes/toolRoutes'))
app.use('/team', require('./routes/teamRoutes'))
// app.use('/checkout', require('./routes/checkoutRoutes'))
// app.use('/log', require('./routes/logRoutes'))

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
})