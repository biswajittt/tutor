import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Stripe from "stripe";
// import { Order } from "../models/order.model.js";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Import and initialize Stripe // Imports and initializes Stripe with the secret key
/*getting shipping details, firest store the data in a variable
when payment is successfull then olny store the whole data on databse
*/
// In-memory store  (temporary)
// const shippingData = {};
// const shippingDetails = asyncHandler(async (req, res) => {
//   const data = req.body.shippingDetails;
//   const { productPrice, customerEmail } = data;
//   shippingData[customerEmail] = data;
//   console.log(shippingData);
// });
/*end*/

/* Create Payment Intent and retrieve Client Secret */
const getClientSecret = asyncHandler(async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // Set the amount in cents (100 cents = 1 USD)
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error); // Log Stripe error for debugging
    res.status(500).json({
      message: "An error occurred while creating payment intent",
      error: error.message,
    });
  }
});
/*end*/

export { getClientSecret };
