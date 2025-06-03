import { Router } from "express";
import {
  registerStudent,
  // bookClass,
  loginStudent,
  getBookingsByStudentAndMentor,
} from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/auth/registration").post(registerStudent);
router.route("/auth/login").post(loginStudent);
router
  .route("/booking-data-by-student-mentor")
  .post(verifyJWT, getBookingsByStudentAndMentor);
//book class route
// router.route("/book-class").post(bookClass);
export default router;
