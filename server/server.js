const express = require('express');
const { Reviews, Products } = require('../db/db.js');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

let port = 3004;

app.get('/reviews', function (req, res) {
  // console.log(req.query.product_id);
  let product_id = req.query.product_id;
  // let product_reviews = {};
  
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
