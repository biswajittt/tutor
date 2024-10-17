import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
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
const registerMentor = asyncHandler(async (req, res) => {
  //get user data from font-end

  const {
    name,
    aboutYou,
    email,
    phonenumber,
    location,
    mode,
    expertise,
    shortClassPrice,
    monthlyClassPrice,
    password,
  } = req.body;

  console.log(
    "from backend",
    name,
    aboutYou,
    email,
    phonenumber,
    location,
    mode,
    expertise,
    shortClassPrice,
    monthlyClassPrice,
    password
  );
  // Get the file path from Multer
  const imageUrl = req.file ? req.file.path : null;
  console.log(imageUrl);
  // //checking  fileds are not empty
  // if (
  //   [
  //     productTitle,
  //     productDescription,
  //     conditionRating,
  //     conditionDescription,
  //     shippingOption,
  //     productPrice,
  //     imageUrl,
  //     sellerName,
  //     contactDetails,
  //     sellerAddress,
  //   ].some((filed) => filed?.trim() === "")
  // ) {
  //   return res.status(409).json() new ApiError(400, "All fields are required");
  // }
  // //check product image
  if (imageUrl === null) {
    return res.status(400).json(new ApiError(400, "Mentor Image is required"));
  }
  //upload image to cloudinary
  const mentorImage = await uploadOnCloudinary(imageUrl);
  console.log(mentorImage);
  //*image is not required****
  if (!mentorImage) {
    return res.status(400).json(new ApiError(400, "Mentor Image is required"));
  }
  //check other validation ......

  //check user is already exist as mentor or student
  let existedMentor = await Student.findOne({ email });
  if (existedMentor) {
    // throw new ApiError(409, "User already exists");
    return res.status(409).json(new ApiError(409, "User Already Exists"));
  }
  //check user is already exist as mentor or student
  existedMentor = await Mentor.findOne({ email });
  if (existedMentor) {
    // throw new ApiError(409, "User already exists");
    return res.status(409).json(new ApiError(409, "User Already Exists"));
  }

  //create object of user - create entry in db
  const mentor = await Mentor.create({
    name,
    email,
    mentorImage: mentorImage?.url || "",
    aboutYou,
    phonenumber,
    location,
    mode,
    expertise,
    shortClassPrice,
    monthlyClassPrice,
    password,
  });

  //check user is created or not and remove password and refresh token from user
  const createdMentor = await Mentor.findById(mentor._id).select(
    "-password -refreshToken"
  );
  if (!createdMentor) {
    // throw new ApiError(500, "Something went wrong while registering user");
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while registering user"));
  }

  //send response
  return res
    .status(201)
    .json(new ApiResponse(200, createdMentor, "User registered successfully"));
});
export { registerMentor };
