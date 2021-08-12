const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantName: {type: String, required: true, trim: true},
    caption: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    images: {type: Array, default: []}
});
