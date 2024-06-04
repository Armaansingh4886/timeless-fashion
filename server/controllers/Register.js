const user = require("../schema/Userschema")
const Register = async (req, res) => {
    const { name, email,  phone, password } = req.body;
    if (!name || !email  || !phone || !password ) {
        res.send({ error: "please fill all fields " });
    } else {
        try {
            const userExist = await user.findOne({ email: email });
            if (userExist) {
                res.send({ error: "email is already exist" });
            } else {
                const userRegister = new user({ name, email, phone, password});
                const saveData = userRegister.save();
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
module.exports = Register