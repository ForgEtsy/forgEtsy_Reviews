const express = require('express');
const { reviews, products } = require('../db/db.js');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

let port = 3004;

app.get('/', function (req, res) {
  let test = Promise.resolve(reviews.find((err, result) => {
    return result;
  }));
  test.then((val) => {
    res.send(val);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

module.exports.port = port;
