// double check file path
const jewelry = require('../jewelry.js');
const housewares = require('../housewares.js');
const accessories = require('../accessories.js');
const toys = require('../toys.js');
const axios = require('axios');

/** import YOUR port number here */
const { port } = require('../server/server.js')
const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:${port}/products`, {useNewUrlParser: true})

//connect that shit
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`)
})

const imagesSchema = new mongoose.Schema({
  listing_image_id: Number,
  listing_id: Number,
  url_75x75: String,
  url_170x135: String,
  url_570xN: String,
  url_fullxfull: String,
  full_height: Number,
  full_width: Number,
})

const productSchema = new mongoose.Schema({
  listing_id: { // <-- product id
    type: Number,
    unique: true,
  },
  title: String,
  description: String,
  price: Number,
  category_path: [String],
  Images: [imagesSchema],
  Shop: {
    shop_id: Number,
    shop_name: String,
    title: String,
    icon_url_fullxfull: String,
  },
  
  product_options: {
    option_1: {
      title: String,
      description_1: String,
      description_2: String,
      description_3: String,
      description_4: String,
    },
    option_2: {
      title: String,
      description_1: String,
      description_2: String,
      description_3: String,
      description_4: String,
    },
    option_3: {
      title: String,
      description_1: String,
      description_2: String,
      description_3: String,
      description_4: String,
    },
  },
});

const reviewSchema = new mongoose.Schema({
  review_id:{
    type: Number,
    unique: true,
  },
  // double check date format/keyword
  date: Date,
  description: String,
  rating: Number,
  user_name: String,
  user_photo_url: String,
  product_id: Number,
  product_user_image_url: String,
})

const Products = mongoose.model('Products', productSchema);
const Reviews = mongoose.model('Reviews', reviewSchema);

const reviewsSave = reviews => {
  Reviews.insertMany(reviews)
    .then(() => {
      console.log('...Saved reviews to database...')
    })
    .catch((err) => {
      console.log('...review saving err... ', err);
    })
}

const productsSave = products => {
  Products.insertMany(products)
    .then((data) => {
      console.log('...Saved products to database...')
      
      let listingIDs = [];
      let descriptions = [];
      let reviews = [];

      for (let i = 0; i < data.length; i++) {
        let listing_id = data[i].listing_id;
        let max = 6;
        let min = 4;
        let random = Math.floor((Math.random() * (max - min)) + min+1); 

        // create an async/await response for API GET request to Ron Swanon quote generator
        async function getNewReview() {
          let res = await axios.get('http://ron-swanson-quotes.herokuapp.com/v2/quotes');
          return res;
        }

        for (var x = 0; x < random; x++) {
          descriptions.push(getNewReview()); 
          listingIDs.push(listing_id);
        }
      }

      Promise.all(descriptions)
      .then(response => {

        function randomIntFromInterval(min, max) { // min and max included 
          return Math.floor(Math.random() * (max - min + 1) + min);
        };

        for (var i = 0; i < response.length; i++) {
          let j = randomIntFromInterval(1, 1000);
          console.log('This is the data in the response ' + response[i].data);
          let review = {
            review_id: Number(`${listingIDs[i]}${i}${j}`),
            date: faker.date.past(45),
            description: response[i].data[0],
            rating: Math.floor((Math.random() * 6)),
            user_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            user_photo_url: faker.image.avatar(),
            product_id: listingIDs[i],
            product_user_image_url: 'FIND A ONE THINGY PICTURE ITEM BOI'
          }

          reviews.push(review);
        }

        return reviews;
      })
      .then((reviews) => {
        reviewsSave(reviews);
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

productsSave(jewelry.results);
productsSave(housewares.results);
productsSave(accessories.results);
productsSave(toys.results);

module.exports = { Reviews, Products };