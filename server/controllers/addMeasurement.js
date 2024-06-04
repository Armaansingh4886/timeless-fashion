const ordermodel = require("../schema/OrderSchema");
const user = require("../schema/Userschema");

const addmeasurement = async (req, res) => {
    const { userId,measurements} = req.body;
    if (!measurements ||!userId) {
        return res.send({ error: "please fill all input fields" })
    }
    try {
        const itemExist = await user.updateOne({ _id :userId },{measurements:measurements})
    
        if(itemExist){
           
            
            return res.send({ status: true, message: "Added" });
        }else{
            return res.send({ status: false, message: "An error" });
        }
         
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = addmeasurement