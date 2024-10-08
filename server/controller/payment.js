const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'rzp_test_hra2QVyvVAP9HL',
    key_secret: 'KCO6t7UpqZuEEa4Qf1HWk0CE',
  });

module.exports.postPayment = async (req,res) => {
    console.log('run');
    const { amount, currency, receipt } = req.body;
    console.log(amount, currency, receipt);
    const options = {
        amount: amount * 100, // amount in the smallest currency unit (e.g., 500 => 5.00 INR)
        currency: currency,
        receipt: receipt,
    };

    try {
        const order = await razorpay.orders.create(options);

        res.json({
            amount:order.amount,
            currency:order.currency
        }); // Send back the order details to the frontend
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
      }
}
module.exports.getPayment = async () => {
    const{paymentId}=req.body;
    try{
        const payment= await razorpay.payments.fetch(paymentId)
        if(!payment){
            return res.status(200).json('Error at razor pay')
        }
        res.json({
            status:payment.status,
            metthod:payment.method,
            amount:payment.amount,
            currency:payment.currency
        })
    }catch(err){
        res.status(500).json('feach to fail')
    }

}