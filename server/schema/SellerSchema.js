const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        
    },
    phone: {
        type: Number,
        required: true
    },
    state: {
        type: String,
       
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            },
        }
    ]
})
// generate a token
sellerSchema.methods.generateAuthToken = async function () {
  try {
      let token = jwt.sign({ _id: this._id }, "mynameisaartivermaiamfromrajpura")
      this.tokens =this.tokens.concat({token:token})
      await this.save()
      return token;
  } catch (error) {
    console.log(error)
  }
};

const sellermodel = new mongoose.model('Seller', sellerSchema);
module.exports = sellermodel;