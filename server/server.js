const express = require('express');
const { Reviews, Products } = require('../db/db.js');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

let port = 3004;

app.get('/reviews', function (req, res) {
  // create variable to store product ID of requested reviews
  let product_id = req.query.product_id;
  
  // create new promise to await response from Mongo 'find' query
  return new Promise((resolve, reject) => {
    Reviews.find({'product_id': product_id}, (err, result) => {
      if (err) { return reject(err) }
        return resolve(result);
    })
  })
  .then((val) => {
    res.send(val);
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

module.exports.port = port;
