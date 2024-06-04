const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const RatingSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Types.ObjectId,
        ref: "Seller"
    },
    name:{
        type:String
    },
    rate:{
        type: Number
    },
    description:{
        type:String
    }
    
   
})

const ratingmodel = new mongoose.model('Rating',RatingSchema);
module.exports = ratingmodel;