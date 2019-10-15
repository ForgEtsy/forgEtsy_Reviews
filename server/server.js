const express = require('express');
const { Reviews, Products } = require('../db/db.js');
var cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// connecting mongo container to mongo service container
mongoose.connect(`mongodb://mongo:27017/docker-node-mongo`, {useNewUrlParser: true})

//connect that shit
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`)
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

let port = 3004;

app.get('/', function (req, res) {
  let test = Promise.resolve(Reviews.find((err, result) => {
    return result;
  }));
  test.then((val) => {
    res.send(val);
  }).catch(() => {
    console.log("Promise rejected!")
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

// module.exports.port = port;
