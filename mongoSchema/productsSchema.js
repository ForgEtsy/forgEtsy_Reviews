const mongoose = require('mongoose');
const imagesSchema = require('./imagesSchema.js');

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

  module.exports = { productSchema };