import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // console.log("hi");
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .json(new ApiError(401, "Access denied. No token provided."));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decodedToken);
    //check user type
    const userType = decodedToken?.userType;
    let user;
    if (userType == "student") {
      user = await Student.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
    } else if (userType === "mentor") {
      user = await Mentor.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
    }
    // console.log(user);
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    //user available
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
