const user = require("../schema/Userschema");
const addcart = async (req, res) => {
    
   const {userId} = req.body
   if(!userId){
    return res.send({error:"log in first"})
   }
    try {
        const itemExist = await user.findOne({ _id :userId },{cart:1,_id:0}).populate('cart.itemId')
        console.log(itemExist);
       
            return res.send({ status: true, message: "Added to cart" ,data :itemExist});
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = addcart