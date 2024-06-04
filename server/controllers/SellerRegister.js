const seller = require("../schema/SellerSchema")
const sellerRegister = async (req, res) => {
    const { name, email, city, phone, password,state } = req.body;
    if (!name || !email || !phone || !password ) {
        res.send({ error: "please fill all fields" });
    } else {
        try {
            const userExist = await seller.findOne({ email: email });
            if (userExist) {
                res.send({ error: "email is already exist" });
            } else {
                const newRegister = new seller({ name, email, city, phone, password,state });
                const saveData = newRegister.save();
                if (saveData) {
                    // Send the success response here.
                    res.send({ status: true, message: "user Registration successfully" });
                }
            }
        } catch (error) {
            // Handle the error without sending a response here.
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
module.exports = sellerRegister