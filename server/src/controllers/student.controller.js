import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Mentor } from "../models/mentor.model.js";

//Generate access and refresh token
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await Student.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //adding refresh token
    user.refreshToken = refreshToken;

    //saving the refresh token
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong, while generating access and refresh token"
    );
  }
};
//register user***
const registerStudent = asyncHandler(async (req, res) => {
  //get user data from font-end
  // console.log("hi", req);
  const { name, email, phoneNumber, location, password } = req.body;

  // console.log("from backend", name, email, phoneNumber, location, password);
  //data validation
  if (
    [name, email, phoneNumber, location, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    return res.status(409).json(new ApiError(409, "All fields are required"));
  }
  //check other validation ......

  //check user is already exist or not
  //check user is already exist as mentor or student
  const existedStudentEmailinMentorCollection = await Mentor.findOne({
    email,
  });
  if (existedStudentEmailinMentorCollection) {
    // throw new ApiError(409, "User already exists");
    return res.status(409).json(new ApiError(409, "User Already Exists"));
  }
  //check user is already exist as mentor or student
  const existedStudentEmail = await Student.findOne({ email });
  if (existedStudentEmail) {
    // throw new ApiError(409, "User already exists");
    return res.status(409).json(new ApiError(409, "User Already Exists"));
  }

  //create object of user - create entry in db
  const user = await Student.create({
    name,
    email,
    phoneNumber,
    location,
    password,
  });

  //check user is created or not and remove password and refresh token from user
  const createdUser = await Student.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while registering user"));
  }
  //generating acces and refresh token
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(createdUser._id);
  //sent cookies
  const options = {
    httpOnly: true,
    secure: false, //In Development: If you're testing this on localhost (HTTP), having secure: true will prevent the cookie from being set, because secure requires HTTPS. In development, you should set the secure flag conditionally.
    sameSite: "None", // Ensures the cookies are sent only from your own site
  };
  //send response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: createdUser,
          accessToken,
          refreshToken,
        },
        "User registered successfully"
      )
    );
  // return res
  //   .status(200)
  //   .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
//login mentor**
const loginStudent = asyncHandler(async (req, res) => {
  //if already loggedin then do not show login just return

  //get data req body
  const { email, password } = req.body;
  console.log(email, password);
  //check email
  if (!email) {
    return res.status(400).json(new ApiError(400, "Email Id required"));
  }

  //find user
  const user = await Student.findOne({ email });

  //check user
  if (!user) {
    return res.status(404).json(new ApiError(404, "User does not exist"));
  }

  //check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid user credentials"));
  }

  //generating acces and refresh token
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  //again calling database for user access and refresh token -- we cal also update the user object without a new call
  const loggedInUser = await Mentor.findById(user._id).select(
    "-password -refreshToken"
  );

  //sent cookies
  const options = {
    httpOnly: true,
    secure: false, //In Development: If you're testing this on localhost (HTTP), having secure: true will prevent the cookie from being set, because secure requires HTTPS. In development, you should set the secure flag conditionally.
    sameSite: "Strict", // Ensures the cookies are sent only from your own site
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});
//book class
const bookClass = asyncHandler(async (req, res) => {
  const { userId, classType, mentorId } = req.body;
});
export { registerStudent, bookClass, loginStudent };
