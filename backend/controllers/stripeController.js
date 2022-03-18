import Stripe from "stripe";
import asyncHandler from "express-async-handler";

const calculateOrderAmount = (price) => {
  return price * 100;
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const stripeAccount = asyncHandler(async (req, res) => {
  const stripe = Stripe(`${process.env.STRIPE_API_SK}`);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(req.body.totalPrice),
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(401);
    throw new Error("remove_order");
  }
});

export { stripeAccount };
