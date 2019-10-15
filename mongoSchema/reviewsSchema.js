const mongoose = require('mongoose');

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

  module.exports = { reviewSchema };