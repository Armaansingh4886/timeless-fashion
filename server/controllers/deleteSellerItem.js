const item = require("../schema/ItemSchema");
const deleteItem = async (req, res) => {
    const {itemId } = req.body;
    
    try {
         await item.deleteOne({ _id : itemId })
       
            return res.send({ status: true, message: "Item is Removed" });
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = deleteItem;