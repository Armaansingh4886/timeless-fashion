
const Razorpay = require("razorpay");
const crypto = require("crypto");
const verifypayment = async (req, res) => {

    try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", "AcYgKzfg2yNuIolhxR1o0kvD"
			// process.env.KEY_SECRET
		)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			console.log("yes");
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}
module.exports = verifypayment;