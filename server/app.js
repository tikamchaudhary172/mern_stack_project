const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();

const PORT = process.env.PORT;
// Database Connection
require('./db/connectDB.js');

//Json
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

//Link The Router Files
app.use(require('./routers/auth.js'));

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})
