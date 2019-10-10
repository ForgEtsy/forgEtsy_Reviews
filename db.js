// double check file path
const jewelry = require('./jewelry.js');
const housewares = require('./housewares.js');
const accessories = require('./accessories.js');
const toys = require('./toys.js');
// import reviews from './reviews.json';
/** import YOUR port number here */
const { port } = require('./server/server.js')

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
      console.log('...review saving err... :(', err);
    })
}

const productsSave = products => {
  Products.insertMany(products)
    .then((data) => {
      console.log('...Saved products to database...')
      const reviews = [];
      for(let i = 0; i < data.length; i++){
        let listing_id = data[i].listing_id;
        let max = 6;
        let min = 4;
        const random = Math.floor((Math.random() * (max - min)) + min+1);
        for(let j = 0; j < random; j++){
          let review = {
            review_id: Number(`${listing_id}${i}${j}`),
            date: faker.date.past(45),
            description: faker.lorem.sentences(),
            rating: Math.floor((Math.random() * 6)),
            user_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            user_photo_url: faker.image.avatar(),
            product_id: listing_id,
            product_user_image_url: 'FIND A ONE THINGY PICTURE ITEM BOI',
          }
          reviews.push(review);
        }
      }
      return reviews;
    })
    .then((reviews) => {
      reviewsSave(reviews);
    })
    .then((data) => {
      // populate component with data

    })
    .catch((err) => {
      console.log('...product saving err... :(');
    })
}

productsSave(jewelry.results);
productsSave(housewares.results);
productsSave(accessories.results);
productsSave(toys.results);