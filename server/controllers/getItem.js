const Item = require("../schema/ItemSchema");
const addcart = async (req, res) => {
    
   const {itemId} = req.body
    try {
        const itemExist = await Item.findOne({ _id :itemId })
        console.log(itemExist);
       
            return res.send({ status: true, message: "Added to cart" ,data :itemExist});
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = addcart