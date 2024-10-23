import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
//Generate access and refresh token
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await Mentor.findById(userId);
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
const registerMentor = asyncHandler(async (req, res) => {
  //get user data from font-end

  const {
    name,
    aboutYou,
    email,
    phoneNumber,
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
    phoneNumber,
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
  //   return res.status(409).json(new ApiError(409, "All fields are required"));
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
  const existedMentorEmailinStudentCollection = await Student.findOne({
    email,
  });
  // let existedMentor = await Student.findOne({
  //   $or: [{ email }, { phoneNumber }],
  // });
  if (existedMentorEmailinStudentCollection) {
    // throw new ApiError(409, "User already exists");
    return res.status(409).json(new ApiError(409, "User Already Exists"));
  }
  //check user is already exist as mentor or student
  const existedMentorEmail = await Mentor.findOne({ email });
  if (existedMentorEmail) {
    // throw new ApiError(409, "User already exists");
    return res.status(409).json(new ApiError(409, "User Already Exists"));
  }

  //create object of user - create entry in db
  const mentor = await Mentor.create({
    name,
    email,
    mentorImage: mentorImage?.url || "",
    aboutYou,
    phoneNumber,
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

//login mentor**
const loginMentor = asyncHandler(async (req, res) => {
  //if already loggedin then do not show login just return

  //get data req body
  const { email, password } = req.body;
  console.log(email, password);
  //check email
  if (!email) {
    return res.status(400).json(new ApiError(400, "Email Id required"));
  }

  //find user
  const user = await Mentor.findOne({ email });

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
    sameSite: "None", // Ensures the cookies are sent only from your own site
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

// refreshAccessToken***
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  //checking incoming refresh token
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    //decoding the token
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // finding user in db using decoded data
    const user = await Mentor.findById(decodedToken._id);

    //if not user
    if (!user) {
      throw new ApiError(401, "Invalid refresh token ");
    }

    //checking refresh token
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    //now generating new access token
    const options = {
      httpOnly: true,
      secure: false,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
export { registerMentor, loginMentor, refreshAccessToken };
