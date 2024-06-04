const user = require("../schema/Userschema");
const getOrderDetail = async (req, res) => {
    const { userId} = req.body;
    if (!userId) {
        return res.send({ error: "please fill all input fields" })
    }
    try {
        const User = await user.findById(userId).populate('cart.itemId').exec();
    
        if (!User) {
          console.log('User not found');
          return;
        }
    
        const totalItems = User.cart.reduce((acc, cartItem) => acc + cartItem.count, 0);
        const totalAmount = User.cart.reduce((acc, cartItem) => acc + (cartItem.count * cartItem.itemId.price), 0);

        // const itemExist = await user.findOne({ _id :userId })
    
        if(User){
            return res.send({ status: true, message: "Added",data:{totalItems,totalAmount}});
        }
        
         
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = getOrderDetail