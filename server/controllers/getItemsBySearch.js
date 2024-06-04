const Item= require("../schema/ItemSchema");
const getItemsBySearch = async (req, res) => {
  const searchItem = req.body.searchItem;
    try {
        const words = searchItem.split(' ').map(word => new RegExp(word, 'i'));
     
        const Items = await Item.find({
            $or: [
              { name: { $in: words } },
              { description: { $in: words } },
              { category: { $in: words } }
            ]
          });
       console.log("search", Items);
      
     
            return res.send({ status: true, message: "Items fetched Successfully" ,data:{Items}});
        // }
    } catch (error) { 
        console.log(error)
    }
}
module.exports = getItemsBySearch;