// double check file path
import products from './products.json';
import reviews from './reviews.json';

/** import YOUR port number here */

const mongoose = require('mongoose');
mongoose.connect('YOUR LOCALHOST', {useNewUrlParser: true})
//connect that shit

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
})


const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    unique: true,
  },
  product_title: String,
  product_description: String,
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
  price: Number,
  category_name: String,
  company_name: String,
  company_location: String,
  company_owner: String,
  company_rating: Number,
  image1_title: String,
  image1_url_large: String,
  image1_url_small: String,
  image2_title: String,
  image2_url_large: String,
  image2_url_small: String,
  image3_title: String,
  image3_url_large: String,
  image3_url_small: String,
  image4_title: String,
  image4_url_large: String,
  image4_url_small: String,
  image5_title: String,
  image5_url_large: String,
  image5_url_small: String,
  image6_title: String,
  image6_url_large: String,
  image6_url_small: String,
  image7_title: String,
  image7_url_large: String,
  image7_url_small: String,
  image8_title: String,
  image8_url_large: String,
  image8_url_small: String,
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

const productsSave = products => {
  Products.insertMany(products)
    .tap(() => {
      console.log('...Saved products to database...')
    })
    .then(() => {
      // retrieve all the database thingies
      // or whatever you need specifically
    })
    .then((data) => {
      // populate component with data
    })
    .catch((err) => {
      console.log('...product saving err... :(');
    })
}

const reviewsSave = review => {
  Reviews.insertMany(reviews)
    .tap(() => {
      console.log('...Saved reviews to database...')
    })
    .then(() => {
      // retrieve all the database thingies
      // or whatever you need specifically
    })
    .then((data) => {
      // populate component with data
    })
    .catch((err) => {
      console.log('...review saving err... :(');
    })
}