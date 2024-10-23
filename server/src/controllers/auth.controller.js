import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Mentor } from "../models/mentor.model.js";
import jwt from "jsonwebtoken"; // Make sure this import exists

const checkIfLoggedIn = asyncHandler(async (req, res) => {
  // console.log(req.cookies); // Log the cookies
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("token: ", token); // Log the token

    if (!token) {
      return res
        .status(401)
        .json(new ApiError(401, { message: "User not logged in" }));
    }

    // Decode the token with error handling
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("decodedToken", decodedToken); // Log the decoded token

      // Find the user based on the token's decoded payload
      const user = await Mentor.findById(decodedToken._id).select(
        "-password -refreshToken"
      );

      // console.log("user", user); // Log the user data

      if (!user) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // User is authenticated, send user details
      return res.status(200).json({ user });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      return res.status(500).json({ message: "Authentication error" });
    }
  } catch (error) {
    console.error("Error during authentication", error); // Log the error
    return res.status(500).json({ message: "Authentication error" });
  }
});

export { checkIfLoggedIn };
