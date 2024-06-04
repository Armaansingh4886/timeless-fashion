const user = require("../schema/Userschema");
const addcart = async (req, res) => {
    const { userId,itemId, count } = req.body;
    if (!itemId|| !count ||!userId) {
        return res.send({ error: "please fill all input fields" })
    }
    try {
        const updateResult = await user.updateOne(
            { _id: userId, 'cart.itemId': itemId },
            { $set: { 'cart.$.count': count } }
          );
      
          if (updateResult.matchedCount === 0) {
            // Item is not in the cart, add it
            await user.updateOne(
              { _id: userId },
              { $push: { cart: { itemId: itemId, count } } }
            );
          }

       
            return res.send({ status: true, message: "Added to cart" });
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = addcart