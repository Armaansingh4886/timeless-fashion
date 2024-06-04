const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
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
    ],
    cart:[{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        count: Number
}],
    measurements:{
        type:Object
    },
    address:{
        type:Object
    }
})
// generate a token
userSchema.methods.generateAuthToken = async function () {
  try {
      let token = jwt.sign({ _id: this._id }, "mynameisaartivermaiamfromrajpura")
      this.tokens =this.tokens.concat({token:token})
      await this.save()
      return token;
  } catch (error) {
    console.log(error)
  }
};

const usermodel = new mongoose.model('User', userSchema);
module.exports = usermodel;