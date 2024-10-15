import { Router } from "express";
import { getClientSecret } from "../controllers/bookclass.controller.js";

const router = Router();

// after '/payment'
// router.route("/order").post(customerPayment);
// router.route("/create-checkout-session").post(createPaymentIntent);
// router.route("/shipping-details").post(shippingDetails);
router.route("/client-secret").get(getClientSecret);
export default router;
