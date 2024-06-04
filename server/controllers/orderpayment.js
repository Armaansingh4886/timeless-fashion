
const Razorpay = require("razorpay");
const crypto = require("crypto");
const orderpayment = async (req, res) => {
    try {
		const instance = new Razorpay({
			key_id: "rzp_test_Q7DtEmCmUWr3xD",
			key_secret: "AcYgKzfg2yNuIolhxR1o0kvD",
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
		// res.send({status:true,data:order})
			res.status(200).json({ data: order });
		console.log(order);
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}
module.exports = orderpayment;