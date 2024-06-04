const item = require("../schema/ItemSchema")
const Order = require("../schema/OrderSchema")

const changeStatus = async (req, res) => {

    

    const {orderId, status} = req.body;
    // if (!name || !category || !price ||  !description ) {
    //     res.send({ error: `please fill all fields xc`});
    // } else
     {
        try {

           const result = await Order.updateOne({_id: orderId},{$set:{status}})
      
            
                // const newItem = new item({sellerId: sellerId , name, category, price, discount, description,image});
                // const saveData = newItem.save();
                if (result) {
                    res.send({ status: true, message: "status changed successfully" });
                }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
module.exports = changeStatus