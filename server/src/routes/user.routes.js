import { Router } from "express";
import {
  getSearchResults,
  logoutUser,
} from "../controllers/user.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/search-mentor").post(getSearchResults);
router.route("/signout").post(logoutUser);
export default router;
