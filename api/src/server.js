const { Console } = require('console');
const express = require('express');
const { installHandler } = require('./apiHandler');
require('dotenv').config();
const { connectToDb } = require('./db');

const app = express();
installHandler(app);
const PORT = process.env.PORT || 3000;

(async function start() {
  try {
    await connectToDb();
    app.listen(PORT, () => console.log(`API server started on Port : ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
