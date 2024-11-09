import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import mongoose from "mongoose";
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
  console.log("mentorImage", mentorImage);
  //*image is not required****
  if (!mentorImage) {
    return res.status(400).json(new ApiError(400, "Mentor Image is required"));
  }
  //check other validation ......

  //check user is already exist as mentor or student
  const existedMentorEmailinStudentCollection = await Student.findOne({
    email,
  });
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
    .status(200)
    .json(new ApiResponse(200, createdMentor, "User registered successfully"));
});

//login mentor**
const loginMentor = asyncHandler(async (req, res) => {
  //if already loggedin then do not show login just return

  //get data req body
  const { email, password } = req.body;
  // console.log(email, password);
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

// get mentor data on home screen
const getAllMentorsData = asyncHandler(async (req, res) => {
  try {
    const mentors = await Mentor.find().select("-password -refreshToken");

    if (!mentors || mentors.length === 0) {
      return res.status(404).json(new ApiError(404, "No mentors found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, mentors, "Mentors fetched successfully"));
  } catch (error) {
    console.error("Error fetching mentors:", error);

    if (error.name === "CastError") {
      // Handle invalid ID format errors (if any)
      return res.status(400).json(new ApiError(400, "Invalid ID format"));
    } else if (error.name === "ValidationError") {
      // Handle validation errors
      return res.status(400).json(new ApiError(400, error.message));
    } else if (error.name === "MongoNetworkError") {
      // Handle MongoDB connection issues
      return res
        .status(503)
        .json(new ApiError(503, "Database connection error"));
    }

    // For any other unexpected errors
    return res
      .status(500)
      .json(
        new ApiError(500, "An unexpected error occurred while fetching mentors")
      );
  }
});
//get Mentor Details By Id
const getMentorDetailsById = async (req, res) => {
  try {
    const { mentorId } = req.params;
    // console.log(mentorId);
    // Check if the ID format is valid (optional if using MongoDB ObjectID validation)
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid mentor ID format"));
    }

    const mentorDetails = await Mentor.findById(mentorId).select(
      "-password -refreshToken"
    );

    // If mentor not found
    if (!mentorDetails) {
      return res.status(404).json(new ApiError(404, "Mentor not found"));
    }

    // Successful response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          mentorDetails,
          "Mentor details fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching mentor details:", error);

    if (error.name === "CastError") {
      // Handle invalid ID format error
      return res.status(400).json(new ApiError(400, "Invalid ID format"));
    } else if (error.name === "MongoNetworkError") {
      // Handle MongoDB connection issues
      return res
        .status(503)
        .json(new ApiError(503, "Database connection error"));
    }

    // For any other unexpected errors
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "An unexpected error occurred while fetching mentor details"
        )
      );
  }
};
//getMentorsDetaBySearchQuery
const getMentorsDetaBySearchQuery = async (req, res) => {
  try {
    const searchQuery = req.params.searchquery;

    // Validate if the searchQuery is provided
    if (!searchQuery) {
      return res
        .status(400)
        .json(new ApiError(400, "Search query parameter is required"));
    }

    // Search mentors whose expertise array includes the search term (case-insensitive)
    const mentorDetailsBySearchQuery = await Mentor.find({
      expertise: { $regex: searchQuery, $options: "i" }, // 'i' for case-insensitive search
    });

    // If no mentors match the search query
    if (mentorDetailsBySearchQuery.length === 0) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            [],
            "No mentors found with the specified expertise"
          )
        );
    }

    // Successful response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          mentorDetailsBySearchQuery,
          "Mentors fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching mentors by search query:", error);

    // Database connection error handling
    if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json(new ApiError(503, "Database connection error"));
    }

    // For any other unexpected errors
    return res
      .status(500)
      .json(
        new ApiError(500, "An unexpected error occurred while fetching mentors")
      );
  }
};

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
export {
  registerMentor,
  loginMentor,
  refreshAccessToken,
  getAllMentorsData,
  getMentorDetailsById,
  getMentorsDetaBySearchQuery,
};
