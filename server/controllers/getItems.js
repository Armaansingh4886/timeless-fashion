const Item= require("../schema/ItemSchema");
const getItems = async (req, res) => {
  
    try {
        const Items = await Item.find()

        // const Items = await Item.aggregate([
        //     {
        //       $unwind: "$rating" // Deconstruct the rating array
        //     },
        //     {
        //       $group: {
        //         _id: "$_id",
        //         sellerId: { $first: "$sellerId" }, // Preserve the sellerId
        //         name: { $first: "$name" }, // Preserve the name
        //         category: { $first: "$category" }, // Preserve the category
        //         price: { $first: "$price" }, // Preserve the price
        //         image: { $first: "$image" }, // Preserve the image
        //         discount: { $first: "$discount" }, // Preserve the discount
        //         description: { $first: "$description" }, // Preserve the description
        //         totalRatings: { $sum: 1 }, // Count the number of ratings
        //         sumRatings: { $sum: "$rating.rating" } // Sum up all ratings
        //       }
        //     },
        //     {
        //       $project: {
        //         sellerId: 1,
        //         name: 1,
        //         category: 1,
        //         price: 1,
        //         image: 1,
        //         discount: 1,
        //         description: 1,
        //         averageRating: {
        //           $cond: [
        //             { $eq: ["$totalRatings", 0] }, // Check if totalRatings is 0
        //             0, // Set averageRating to 0 if totalRatings is 0
        //             { $divide: ["$sumRatings", "$totalRatings"] } // Calculate averageRating
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       $project: {
        //         _id: 0, // Exclude _id field from the result
        //         sellerId: 1,
        //         name: 1,
        //         category: 1,
        //         price: 1,
        //         image: 1,
        //         discount: 1,
        //         description: 1,
        //         averageRating: { $round: ["$averageRating", 2] } // Round average rating to two decimal places
        //       }
        //     }
        //   ]);
      
        // if(token){
        //     res.cookie("token", token,{
        //         httpOnly:true,
        //     });
            // req.session.userLogin = userLogin;
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