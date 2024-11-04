import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken"; // Make sure this import exists

const checkIfLoggedIn = asyncHandler(async (req, res) => {
  // console.log(req.cookies); // Log the cookies
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .json(new ApiError(401, { message: "User not logged in" }));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { _id, userType } = decodedToken;

    let user;
    if (userType === "mentor") {
      user = await Mentor.findById(_id).select("-password -refreshToken");
    } else if (userType === "student") {
      user = await Student.findById(_id).select("-password -refreshToken");
    } else {
      return res.status(403).json({ message: "Invalid user type" });
    }

    if (!user) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // User is authenticated, send user details
    return res.status(200).json({ user, userType });
  } catch (error) {
    return res.status(500).json({ message: "Authentication error" });
  }
});

export { checkIfLoggedIn };
