import { Router } from "express";
import {
  getClientSecret,
  paymentIntent,
  storeStudentDataonSuccessfullPayment,
} from "../controllers/bookclass.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// after '/payment'
// router.route("/order").post(customerPayment);
// router.route("/create-checkout-session").post(createPaymentIntent);
// router.route("/shipping-details").post(shippingDetails);
router.route("/client-secret").post(getClientSecret);
// router.route("/book-short-class").post(shortClassBooking);
// router.route("/create-checkout-session").post(session);
// router.route("/session-status").get(status);
router.route("/create-payment-intent").post(verifyJWT, paymentIntent);
router
  .route("/book-class")
  .post(verifyJWT, storeStudentDataonSuccessfullPayment);
export default router;
