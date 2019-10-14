const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    listing_image_id: Number,
    listing_id: Number,
    url_75x75: String,
    url_170x135: String,
    url_570xN: String,
    url_fullxfull: String,
    full_height: Number,
full_width: Number,
});

module.exports = { imagesSchema };

