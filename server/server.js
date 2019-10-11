const express = require('express')
const db = require('../db/db.js');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

let port = 3004;

app.get('/', function (req, res) {
  res.send('GET request to homepage')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

module.exports.port = port;
