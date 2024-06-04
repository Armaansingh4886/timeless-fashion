const orders = require("../schema/OrderSchema")
const item =require("../schema/ItemSchema")
const seller = require("../schema/SellerSchema")
const getSellerOrders = async (req, res) => {
  const{ sellerId }= req.body
    try {

        const items = await item.find({sellerId:sellerId});
        // const result = await orders.find().populate('itemId')
        const result = await orders.find({ itemId: { $in: items } }).populate('itemId');
console.log(result);
       
      
            return res.send({ status: true, message: "Items fetched Successfully" ,data:{result}});
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = getSellerOrders;