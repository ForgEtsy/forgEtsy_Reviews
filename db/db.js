// import mongoose and faker for schemas, import port number from server
const mongoose = require('mongoose');
const faker = require('faker');
// const { port } = require('../server/server.js')

// import data for schemas
const jewelry = require('../data/jewelry.js');
const housewares = require('../data/housewares.js');
const accessories = require('../data/accessories.js');
const toys = require('../data/toys.js');

// Require mongo schema to create mongo database
const productSchema = require('../mongoSchema/productsSchema.js')
const reviewSchema = require('../mongoSchema/reviewsSchema.js')

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

module.exports = { Reviews, Products };