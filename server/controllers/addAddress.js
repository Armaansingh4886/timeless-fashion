const user = require("../schema/Userschema");
const addaddress = async (req, res) => {
    const { userId,address} = req.body;
    if (!address ||!userId) {
        return res.send({ error: "please fill all input fields" })
    }
    try {
        console.log(address);
        const itemExist = await user.updateOne({ _id :userId },{address:address})
    
        if(itemExist){
            return res.send({ status: true, message: "Added" });
        }else{
            return res.send({ status: false, message: "An error" });
        }
         
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = addaddress