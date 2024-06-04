const item = require("../schema/ItemSchema")


const postItem = async (req, res) => {

    

    const {sellerId, name, category, image,price, discount, description } = req.body;
    if (!name || !category || !price ||  !description ) {
        res.send({ error: `please fill all fields xc`});
    } else {
        try {

           
      
            
                const newItem = new item({sellerId: sellerId , name, category, price, discount, description,image});
                const saveData = newItem.save();
                if (saveData) {
                    res.send({ status: true, message: "user Registration successfully" });
                }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
module.exports = postItem