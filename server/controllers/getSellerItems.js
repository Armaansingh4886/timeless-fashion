const Item= require("../schema/ItemSchema");
const getItems = async (req, res) => {
  const{ sellerId} = req.body;
    try {
        const Items = await Item.find({sellerId:sellerId})

       
            if(!Items){
                return res.send({error:"try agian"})
            }
            return res.send({ status: true, message: "Items fetched Successfully" ,data:{Items}});
            
        // }
    } catch (error) {
        console.log(error)
    }
}
module.exports = getItems;