import { Router } from "express";
import { registerStudent } from "../controllers/student.controller.js";

const router = Router();
router.route("/registration").post(registerStudent);
export default router;
