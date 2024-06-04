const orders = require("../schema/OrderSchema")
const getOrders = async (req, res) => {
  const{ userId }= req.body
    try {
        const result = await orders.find({ userId :userId }).populate('itemId')
       
       
      
        // if(token){
        //     res.cookie("token", token,{
        //         httpOnly:true,
        //     });
            // req.session.userLogin = userLogin;
            return res.send({ status: true, message: "Items fetched Successfully" ,data:{result}});
        // }
    } catch (error) {
        console.log(error)
    }
}
module.exports = getOrders;