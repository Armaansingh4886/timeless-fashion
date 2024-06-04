const item = require("../schema/ItemSchema")


const postRating = async (req, res) => {

    

    const {itemId, name, rating, description } = req.body;
    if (!name || !rating||  !description ) {
        res.send({ error: `please fill all fields `});
    } else {
        try {

           
      
            
                const savedData = await item.updateOne({_id:itemId},{$push:{rating:{name,description,rating}}});
                
                if (savedData) {
                    res.send({ status: true, message: "rating posted succesfully" });
                }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
module.exports = postRating