import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//register user***
const getSearchResults = asyncHandler(async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // Check if searchTerm is provided
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json(new ApiError(400, "Search term is required"));
    }

    // console.log("Search Term:", searchTerm);

    // Search for mentors with expertise matching the search term (case-insensitive)
    const mentors = await Mentor.find({
      expertise: { $regex: searchTerm, $options: "i" }, // Case-insensitive match
    }).select("-password -refreshToken");

    // Handle case: no mentors found
    if (mentors.length === 0) {
      return res
        .status(404)
        .json(new ApiError(404, "No mentors found matching the search term"));
    }

    // Return the list of mentors
    return res
      .status(200)
      .json(
        new ApiResponse(200, mentors, `${mentors.length} mentor(s) found.`)
      );
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    return res
      .status(500)
      .json(
        new ApiError(500, "An error occurred while fetching search results.")
      );
  }
});

// **🔹 User Logout**
const logoutUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(200)
        .json(new ApiError(401, "Access denied. No token provided."));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //check user type
    const userType = decodedToken?.userType;
    let user;
    if (userType == "student") {
      user = await Student.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
      user.refreshToken = null;
      await user.save();
    } else if (userType === "mentor") {
      user = await Mentor.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
      user.refreshToken = null;
      await user.save();
    }
    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
  } catch (error) {
    console.error("Sign out error:", error);
    return res.status(200).json(new ApiError(500, "Internal server error"));
  }

  // // **🔸 Find Mentor by Refresh Token**
  // const mentor = await Mentor.findOne({ refreshToken });
  // if (!mentor) {
  //   return next(new ApiError(401, "Invalid refresh token"));
  // }

  // // **🔹 Remove Refresh Token**
  // mentor.refreshToken = null;
  // await mentor.save({ validateBeforeSave: false });

  // return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
});
export { getSearchResults, logoutUser };
