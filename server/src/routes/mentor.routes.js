import { Router } from "express";
import {
  registerMentor,
  loginMentor,
  // refreshAccessToken,
  getAllMentorsData,
  getMentorDetailsById,
  updateMentorProfile,
  // logoutMentor,
} from "../controllers/mentor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router
  .route("/registration")
  .post(upload.single("mentorImage"), registerMentor);
// Protect dashboard route
// router.get("/dashboard", verifyJWT, (req, res) => {
//   console.log(`Welcome ${req.user.name}, to your dashboard!`);
//   res
//     .status(200)
//     .json({ message: `Welcome ${req.user.name}, to your dashboard!` });
// });
router.route("/login").post(loginMentor);

router.route("/update-profile").post(verifyJWT, updateMentorProfile);

// get mentor data on home screen
router.route("/all-mentors-data").post(getAllMentorsData);
//get mentor details by id
router.route("/:mentorId").post(getMentorDetailsById);

//if refresh token expired then generate again
// router.route("/refresh-token").post(refreshAccessToken);
// router.route("/logout").post(verifyJWT, logoutMentor);
export default router;
