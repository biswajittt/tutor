import { Router } from "express";
import { registerMentor } from "../controllers/mentor.controller.js";

const router = Router();
router.route("/registration").post(registerMentor);
export default router;
