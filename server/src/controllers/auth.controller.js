import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken"; // Make sure this import exists//

export const checkIfLoggedIn = asyncHandler(async (req, res) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return refreshTokenHandler(req, res);
      // return res.status(401).json(new ApiError(401, "Access token missing"));
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const { _id, userType } = decodedToken;
    let user;
    if (userType === "mentor") {
      user = await Mentor.findById(_id).select("-passwordHash -refreshToken");
    } else if (userType === "student") {
      user = await Student.findById(_id).select("-passwordHash -refreshToken");
    } else {
      return res.status(200).json(new ApiError(403, "Invalid user type"));
    }
    if (!user) {
      return res
        .status(200)
        .json(new ApiError(401, "Invalid or expired token"));
    }

    return res.status(200).json(new ApiResponse(200, { user, userType }));
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return refreshTokenHandler(req, res);
    } else if (error.name === "JsonWebTokenError") {
      return res.status(200).json(new ApiError(401, "Invalid access token"));
    } else {
      console.error("Authentication error:", error);
      return res.status(200).json(new ApiError(500, "Authentication error"));
    }
  }
});
//refresh the token
const refreshTokenHandler = async (req, res) => {
  // console.log("in refreshTokenHandler: auth.controller.js");
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(200).json(new ApiError(401, "Refresh token missing"));
    }

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const { _id, userType } = decodedRefreshToken;
    let user;
    if (userType === "mentor") {
      user = await Mentor.findById(_id);
    } else if (userType === "student") {
      user = await Student.findById(_id);
    }
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(200).json(new ApiError(401, "Invalid refresh token"));
    }
    const accessToken = user.generateAccessToken();
    // console.log("accessToken", accessToken);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    return res.status(200).json(new ApiResponse(200, { user, userType }, "")); //send user data after refresh
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(200).json(new ApiError(401, "Invalid refresh token"));
  }
};
// export { checkIfLoggedIn };
