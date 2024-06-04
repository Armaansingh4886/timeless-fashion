const Item= require("../schema/ItemSchema");
const Seller = require("../schema/SellerSchema");
const Orders = require("../schema/OrderSchema")
const getSellerhome = async (req, res) => {
  const{ sellerId} = req.body;
    try {
        const User = await Seller.find({_id:sellerId});
const items = await Item.countDocuments({sellerId:sellerId});
const itemsdata = await Item.find({sellerId:sellerId});
// const result = await orders.find().populate('itemId')
const orders = await Orders.find({ itemId: { $in: itemsdata } ,status:"delivered"}).populate("itemId");
const ordercount = orders.length;

const totalPrice = orders.reduce((sum, order) => {
    return sum + (order.count * order.itemId.price);
}, 0);
            // if(!Items){
            //     return res.send({error:"try agian"})
            // }
            return res.send({ status: true, message: "Items fetched Successfully" ,data:{User,items,ordercount,totalPrice}});
            
        // }
    } catch (error) {
        console.log(error)
    }
}
module.exports = getSellerhome;