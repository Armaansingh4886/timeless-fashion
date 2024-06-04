const Order = require("../schema/OrderSchema");
const user = require("../schema/Userschema");

const PlaceOrder = async (req, res) => {
    const {userId ,payment} = req.body;
    if (!userId ) {
        return res.send({ error: "please fill all input fields" })
    }
    try {
        
        try {
            // Fetch the user document
            const User = await user.findById(userId).populate('cart.itemId').exec();
            
            if (!user) {
              console.log('User not found');
              return;
            }
        
            // Iterate over the items in the user's cart
            for (const cartItem of User.cart) {
              // Create a new order object
              const newOrder = new Order({
                userId: User._id,
                itemId: cartItem.itemId._id,
                count: cartItem.count,
                address: User.address,
                status:"Ordered",
                payment:payment,
                placedDate : Date.now()
              });
        
              // Save the order object to the database
              await newOrder.save();
            }
            await user.updateOne({ _id: User._id }, { $set: { cart: [] } });
            res.send({success:true,message:"ordered placed succesfully"})
            console.log('Orders created successfully');
        }catch (error) {
            console.error('Error creating orders:', error);
          } 
    } catch (error) {
        console.log(error)
    }
}
module.exports = PlaceOrder