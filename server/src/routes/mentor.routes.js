import { Router } from "express";
import {
  registerMentor,
  loginMentor,
  refreshAccessToken,
} from "../controllers/mentor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router
  .route("/registration")
  .post(upload.single("mentorImage"), registerMentor);
// Protect dashboard route
router.get("/dashboard", verifyJWT, (req, res) => {
  console.log(`Welcome ${req.user.name}, to your dashboard!`);
  res
    .status(200)
    .json({ message: `Welcome ${req.user.name}, to your dashboard!` });
});
router.route("/login").post(loginMentor);

//if refresh token expired then generate again
router.route("/refresh-token").post(refreshAccessToken);

export default router;
