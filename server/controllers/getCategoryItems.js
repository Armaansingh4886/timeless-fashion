const Item= require("../schema/ItemSchema");
const getItems = async (req, res) => {
  const category = req.body.category;
    try {
        // const words = category.split(' ').map(word => new RegExp(word, 'i'));
        const Items = await Item.find({category:category});
        // const Items = await Item.find({
        //     $or: [
        //       { name: { $in: words } },
        //       { description: { $in: words } },
        //       { category: { $in: words } }
        //     ]
        //   });
       console.log(Items);
      
        // if(token){
        //     res.cookie("token", token,{
        //         httpOnly:true,
        //     });
            // req.session.userLogin = userLogin;
            return res.send({ status: true, message: "Items fetched Successfully" ,data:{Items}});
        // }
    } catch (error) {
        console.log(error)
    }
}
module.exports = getItems;