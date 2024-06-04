const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const ItemSchema = new mongoose.Schema({
    sellerId:{
        type: mongoose.Types.ObjectId,
        ref: "Seller"
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image:{
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    rating:[{
        name:String,
        description:String,
        rating:Number
    }],
    discount: {
        type: Number,
    },
    description: {
        type: String,
       
    }
   
})

const itemmodel = new mongoose.model('Item',    ItemSchema);
module.exports = itemmodel;