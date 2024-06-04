const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const OrderSchema = new mongoose.Schema({
    sellerId:{
        type: mongoose.Types.ObjectId,
        ref: "Seller"
    },
    itemId:{
        type: mongoose.Types.ObjectId,
        ref:"Item"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    count:{
        type: Number
    },
    status:{
        type: String
    },
    placedDate:{
        type:Date
    },
    measurements:{
        type:Object
    },
    address:{
        type:Object
    },
    payment:{type:String}
   
})

const ordermodel = new mongoose.model('Order',    OrderSchema);
module.exports = ordermodel;