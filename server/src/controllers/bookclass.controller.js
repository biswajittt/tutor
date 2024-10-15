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

/*getting payment intent and get the client secret*/
const paymentIntent = await stripe.paymentIntents.create({
  amount: 100,
  currency: "usd",
  automatic_payment_methods: {
    enabled: true,
  },
});
const getClientSecret = asyncHandler(async (req, res) => {
  // console.log(paymentIntent);
  const intent = paymentIntent;
  res.json({ client_secret: intent.client_secret });
});
/*end*/

export { getClientSecret };
