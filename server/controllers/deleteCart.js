const user = require("../schema/Userschema");
const deleteCart = async (req, res) => {
    const {userId, id } = req.body;
    
    try {
         await user.updateOne({ _id : userId },{$pull:{cart:{_id:id}}})
       
            return res.send({ status: true, message: "Removed From Cart" });
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = deleteCart;