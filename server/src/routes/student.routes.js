import { Router } from "express";
import {
  registerStudent,
  bookClass,
  loginStudent,
} from "../controllers/student.controller.js";

const router = Router();
router.route("/auth/registration").post(registerStudent);
router.route("/auth/login").post(loginStudent);
//book class route
router.route("/book-class").post(bookClass);
export default router;
