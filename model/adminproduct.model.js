const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    day: {
        typr: String,
    
    },
    catId: Schema.Types.ObjectId
});

module.exports = mongoose.model("product", productSchema);