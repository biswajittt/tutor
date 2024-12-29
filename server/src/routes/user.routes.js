import { Router } from "express";
import { getSearchResults } from "../controllers/user.controller.js";

const router = Router();
router.route("/search-mentor").post(getSearchResults);
export default router;
