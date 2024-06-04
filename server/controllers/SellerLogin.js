const seller = require("../schema/SellerSchema");
const SellerLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.send({ error: "please fill all input fields" })
    }
    try {
        const LoginExist = await seller.findOne({ email: email, password: password })
        if (!LoginExist) {
            return res.send({  error:"Invalid Credientials" })
        }
        const token=await LoginExist.generateAuthToken();
        if(token){
            res.cookie("token", token,{
                httpOnly:true,
            });
            // req.session.userLogin = userLogin;
            return res.send({ status: true, message: "User Login Successfully", token: token,id:LoginExist._id });
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = SellerLogin