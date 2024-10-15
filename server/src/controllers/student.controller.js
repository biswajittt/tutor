import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// //Generate access and refresh token
// const generateAccessTokenAndRefreshToken = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     //adding refresh token
//     user.refreshToken = refreshToken;

//     //saving the refresh token
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(
//       500,
//       "Something went wrong, while generating access and refresh token"
//     );
//   }
// };
//register user***
const registerStudent = asyncHandler(async (req, res) => {
  //get user data from font-end

  const { email, password, name, category, phonenumber } = req.body;

  console.log("from backend", email, password, name, category, phonenumber);
  //data validation
  if ([email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  //check other validation ......

  //check user is already exist or not
  const existedUser = await Student.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  //create object of user - create entry in db
  const user = await Student.create({
    name,
    email,
    phonenumber,
    category,
    password,
  });

  //check user is created or not and remove password and refresh token from user
  const createdUser = await Student.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  //send response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
export { registerStudent };
