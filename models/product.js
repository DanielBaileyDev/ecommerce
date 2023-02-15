const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    img: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    featured: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('product', productSchema);