import { Router } from "express";
import { checkIfLoggedIn } from "../controllers/auth.controller.js";

const router = Router();

router.route("/check-user-authentication").post(checkIfLoggedIn);
export default router;
