const express = require('express')
// const axios = require('axios');
const db = require('../db/db.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let port = 3004;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

module.exports.port = port;
