const user = require("../schema/Userschema");
const getmeasurement = async (req, res) => {
    const { userId} = req.body;
    if (!userId) {
        return res.send({ error: "please fill all input fields" })
    }
    try {
        const itemExist = await user.findOne({ _id :userId })
    
        if(itemExist){
            return res.send({ status: true, message: "Added",data:itemExist.measurements });
        }else{
            return res.send({ status: false, message: "An error" });
        }
         
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = getmeasurement