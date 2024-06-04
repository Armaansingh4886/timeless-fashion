const item = require("../schema/ItemSchema")


const postItem = async (req, res) => {

    

    const {itemId, data} = req.body;
    const {name,category,image,price,discount,description} = data
    if (!name || !category || !price ||  !description ) {
        res.send({ error: `please fill all fields xc`});
    } else {
        try {

           const result = await item.updateOne({_id: itemId},{$set:{name,category,price,discount,description,image}})
      
            
                // const newItem = new item({sellerId: sellerId , name, category, price, discount, description,image});
                // const saveData = newItem.save();
                if (result) {
                    res.send({ status: true, message: "user Registration successfully" });
                }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
module.exports = postItem