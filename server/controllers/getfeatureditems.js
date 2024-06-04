const item = require("../schema/ItemSchema");
const getFeaturedItems= async (req, res) => {
    
    try {
        // const BigDiscount = "BigDiscount"
        const bigdiscount = await item.find({ type: "BigDiscount"})
    const newarrival = await item.find({type: "NewArrival"})
    const bestsales = await item.find({type:"BestSales"})
        if(bigdiscount && newarrival && bestsales){
            return res.send({ status: true, message: "fetched",data:{bigdiscount,newarrival,bestsales} });
        }else{
            return res.send({ status: false, message: "An error" });
        }
         
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = getFeaturedItems