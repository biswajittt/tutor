import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import mongoose from "mongoose";
import { decrypt, encrypt } from "./encryption.controller.js";
// **🔹 Generate Access and Refresh Tokens**
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await Mentor.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Store refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

// **🔹 Register Mentor (No Extra Hashing)**
const registerMentor = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      aboutYou, // Changed from aboutYou to match the schema
      email,
      phoneNumber,
      location,
      mode,
      subjects, // Changed from expertise to subjects
      shortClassPrice,
      shortClassDuration,
      // monthlyClassPrice,
      password, // Password will be hashed automatically in the schema
      availability,
    } = req.body;
    // console.log(JSON.parse(availability));
    // return;
    // **🔸 Validate Required Fields**
    if (
      !name ||
      !aboutYou ||
      !email ||
      !phoneNumber ||
      !location ||
      !mode ||
      !subjects ||
      !shortClassPrice ||
      !shortClassDuration ||
      !password ||
      !availability
    ) {
      return next(new ApiError(400, "All fields are required"));
    }
    console.log("hi");
    // **🔸 Check for Mentor Image**
    const imageUrl = req.file ? req.file.path : null;
    if (!imageUrl) {
      return next(new ApiError(400, "Mentor Image is required"));
    }

    // **🔹 Upload Image to Cloudinary**
    const mentorImage = await uploadOnCloudinary(imageUrl);
    if (!mentorImage || !mentorImage.url) {
      return next(new ApiError(400, "Error uploading image"));
    }

    // **🔸 Check if Email Already Exists in Student Collection**
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return next(new ApiError(409, "User already exists as a student"));
    }

    // **🔸 Check if Mentor Already Exists**
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return next(new ApiError(409, "User already exists as a mentor"));
    }
    // convert avilability
    const availabilityObject = JSON.parse(availability);
    // Transform availabilityObject into the desired array format
    const transformedAvailability = [];
    for (const day in availabilityObject) {
      if (availabilityObject.hasOwnProperty(day)) {
        const timeSlots = availabilityObject[day];
        if (timeSlots.length > 0) {
          timeSlots.forEach((timeSlot) => {
            transformedAvailability.push({
              day: day,
              timeSlots: [timeSlot],
            });
          });
        } else {
          transformedAvailability.push({
            day: day,
            timeSlots: [],
          });
        }
      }
    }
    let lowercaseSubjects = [];
    const parseSubjects = JSON.parse(subjects);
    if (Array.isArray(parseSubjects)) {
      lowercaseSubjects = parseSubjects.map((subject) => subject.toLowerCase());
    } else if (typeof parseSubjects === "object" && parseSubjects !== null) {
      // Object check
      try {
        const subjectsArray = Object.values(parseSubjects); // try to convert object to array.
        if (Array.isArray(subjectsArray)) {
          lowercaseSubjects = subjectsArray.map((subject) =>
            subject.toLowerCase()
          );
        } else {
          console.error("subjects object could not be converted to array");
        }
      } catch (error) {
        console.error("Error converting subjects to array:", error);
      }
    } else {
      console.error("Subjects is not an array or object:", parseSubjects);
    }
    // **🔹 Create Mentor Entry (No Manual Hashing Needed)**
    const mentor = await Mentor.create({
      name,
      email,
      mentorImage: mentorImage.url || "",
      about: aboutYou,
      phoneNumber,
      location,
      mode,
      subjects: lowercaseSubjects,
      availability: transformedAvailability,
      shortClassPrice,
      shortClassDuration,
      passwordHash: password, // Schema will automatically hash it
    });

    if (!mentor) {
      return next(new ApiError(500, "Error registering mentor"));
    }

    // **🔹 Generate Tokens**
    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(mentor._id);

    // **🔹 Return Response (Exclude Password & Token in Response)**
    const createdMentor = await Mentor.findById(mentor._id).select(
      "-passwordHash -refreshToken"
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { mentor: createdMentor, accessToken, refreshToken },
          "Mentor registered successfully"
        )
      );
  } catch (error) {
    next(error);
  }
});

// **🔹 Mentor Login**
const loginMentor = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "Email and password are required"));
  }

  // **🔸 Find Mentor by Email**
  const mentor = await Mentor.findOne({ email });
  if (!mentor) {
    return next(new ApiError(401, "Invalid email or password"));
  }

  // **🔹 Check if Password is Correct**
  const isPasswordCorrect = await mentor.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return next(new ApiError(401, "Invalid email or password"));
  }

  // **🔹 Generate Access & Refresh Tokens**
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(mentor._id);
  // **🔹 Store the tokens**
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict",
    maxAgeAccessToken: 15 * 60 * 1000, // 15 minutes (example)
    maxAgeRefreshToken: 7 * 24 * 60 * 60 * 1000, // 7 days (example)
  };

  res.cookie("accessToken", accessToken, {
    cookieOptions,
    maxAge: cookieOptions.maxAgeAccessToken,
  });

  res.cookie("refreshToken", refreshToken, {
    cookieOptions,
    maxAge: cookieOptions.maxAgeRefreshToken,
  });
  // **🔹 Send Response (Exclude Password & Token in Response)**
  const loggedInMentor = await Mentor.findById(mentor._id).select(
    "-passwordHash -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { mentor: loggedInMentor }, "Login successful"));
});

// // **🔹 Mentor Logout**
// const logoutMentor = asyncHandler(async (req, res, next) => {
//   try {
//     // Clear cookies
//     res.clearCookie("accessToken");
//     res.clearCookie("refreshToken");

//     // invalidate the refresh token in the database.
//     const user = await Mentor.findById(req.user._id);
//     if (user) {
//       user.refreshToken = null;
//       await user.save();
//     }
//     const student = await Student.findById(req.user._id);
//     if (student) {
//       student.refreshToken = null;
//       await student.save();
//     }

//     res.status(200).json({ message: "Sign out successful" });
//   } catch (error) {
//     console.error("Sign out error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }

//   // // **🔸 Find Mentor by Refresh Token**
//   // const mentor = await Mentor.findOne({ refreshToken });
//   // if (!mentor) {
//   //   return next(new ApiError(401, "Invalid refresh token"));
//   // }

//   // // **🔹 Remove Refresh Token**
//   // mentor.refreshToken = null;
//   // await mentor.save({ validateBeforeSave: false });

//   // return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
// });

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
// **🔹 Get Mentor Details by ID**
const getMentorDetailsById = async (req, res) => {
  try {
    const { mentorId } = req.params;

    // **🔸 Validate Mentor ID Format**
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid mentor ID format"));
    }

    // **🔹 Fetch Mentor Details (Excluding Password & Refresh Token)**
    const mentorDetails = await Mentor.findById(mentorId).select(
      "-passwordHash -refreshToken"
    );

    if (!mentorDetails) {
      return res.status(404).json(new ApiError(404, "Mentor not found"));
    }

    // **🔹 Encrypt Class Types Before Sending**
    const encryptedShortClass = encrypt("shortclass");
    const encryptedMonthlyClass = encrypt("monthlyclass");

    // **✅ Send Response**
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          mentorDetails,
          shortClass: encryptedShortClass,
          monthlyClass: encryptedMonthlyClass,
        },
        "Mentor details fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error fetching mentor details:", error);

    // **🔹 Handle Errors**
    if (error.name === "CastError") {
      return res.status(400).json(new ApiError(400, "Invalid ID format"));
    } else if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json(new ApiError(503, "Database connection error"));
    }

    return res.status(500).json(new ApiError(500, "Unexpected error occurred"));
  }
};

// **🔹 Get Mentors by Search Query**
const getMentorsBySearchQuery = async (req, res) => {
  try {
    const { searchquery } = req.body;
    console.log(searchquery);

    if (!searchquery) {
      return res
        .status(201)
        .json(new ApiError(400, "Search query is required"));
    }

    // **🔸 Search Mentors (Case-Insensitive)**
    const mentors = await Mentor.find({
      subjects: { $regex: searchquery, $options: "i" },
    }).select("-passwordHash -refreshToken");

    if (mentors.length === 0) {
      return res.status(201).json(new ApiResponse(404, [], "No mentors found"));
    }

    // **✅ Send Response**
    return res
      .status(201)
      .json(new ApiResponse(200, mentors, "Mentors fetched successfully"));
  } catch (error) {
    console.error("Error fetching mentors:", error);

    if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json(new ApiError(503, "Database connection error"));
    }

    return res.status(500).json(new ApiError(500, "Unexpected error occurred"));
  }
};
/**
 * Converts a JSON string or object into a lowercase string array
 * Used for `tags`, `subjects`, etc.
 * @param {string | any} input - Input from frontend (stringified array or object)
 * @returns {string[]} - Cleaned lowercase array
 */
function normalizeStringArray(input) {
  let raw;
  try {
    raw = typeof input === "string" ? JSON.parse(input) : input;
  } catch (e) {
    console.error("Invalid JSON input:", input);
    return [];
  }

  if (Array.isArray(raw)) {
    return raw.map((item) => String(item).toLowerCase().trim());
  }

  if (typeof raw === "object" && raw !== null) {
    return Object.values(raw).map((item) => String(item).toLowerCase().trim());
  }

  console.warn("normalizeStringArray: Unsupported format", input);
  return [];
}

// **🔹 Get Mentors by Search Query**
const updateMentorProfile = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      location,
      mode,
      about,
      subjects,
      tags,
      shortClassPrice,
      shortClassDuration,
      monthlyClassPrice,
      monthlyClassDuration,
      monthlyClassFrequency,
    } = req.body;
    // return;
    //convert tags
    const normalizedTags = normalizeStringArray(tags);
    const normalizedSubjects = normalizeStringArray(subjects);
    // Only include fields allowed for update
    const parseNumber = (val) =>
      !isNaN(parseFloat(val)) ? parseFloat(val) : undefined;

    const updateFields = {
      ...(name && { name }),
      ...(mode && { mode }),
      ...(location && { location }),
      ...(about && { about }),
      ...(normalizedSubjects.length > 0 && { subjects: normalizedSubjects }),
      ...(normalizedTags.length > 0 && { tags: normalizedTags }),
      ...(parseNumber(shortClassPrice) !== undefined && {
        shortClassPrice: parseNumber(shortClassPrice),
      }),
      ...(parseNumber(shortClassDuration) !== undefined && {
        shortClassDuration: parseNumber(shortClassDuration),
      }),
      ...(parseNumber(monthlyClassPrice) !== undefined && {
        monthlyClassPrice: parseNumber(monthlyClassPrice),
      }),
      ...(parseNumber(monthlyClassDuration) !== undefined && {
        monthlyClassDuration: parseNumber(monthlyClassDuration),
      }),
      ...(parseNumber(monthlyClassFrequency) !== undefined && {
        monthlyClassFrequency: parseNumber(monthlyClassFrequency),
      }),
    };

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, "No valid fields provided for update"));
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    // **✅ Send Response**
    return res
      .status(201)
      .json(new ApiResponse(200, {}, "Mentor Profile Updated successfully"));
  } catch (error) {
    console.error("Error fetching mentors:", error);

    if (error.name === "MongoNetworkError") {
      return res
        .status(503)
        .json(new ApiError(503, "Database connection error"));
    }

    return res.status(500).json(new ApiError(500, "Unexpected error occurred"));
  }
});

// // refreshAccessToken***
// const refreshAccessToken = asyncHandler(async (req, res) => {
//   const incomingRefreshToken =
//     req.cookies.refreshToken || req.body.refreshToken;

//   //checking incoming refresh token
//   if (!incomingRefreshToken) {
//     throw new ApiError(401, "Unauthorized request");
//   }

//   try {
//     //decoding the token
//     const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

//     // finding user in db using decoded data
//     const user = await Mentor.findById(decodedToken._id);

//     //if not user
//     if (!user) {
//       throw new ApiError(401, "Invalid refresh token ");
//     }

//     //checking refresh token
//     if (incomingRefreshToken !== user.refreshToken) {
//       throw new ApiError(401, "Refresh token is expired or used");
//     }

//     //now generating new access token
//     const options = {
//       httpOnly: true,
//       secure: false,
//     };
//     const { accessToken, newRefreshToken } =
//       await generateAccessTokenAndRefreshToken(user._id);

//     return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", newRefreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           { accessToken, refreshToken: newRefreshToken },
//           "Access token refreshed successfully"
//         )
//       );
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid refresh token");
//   }
// });
export {
  registerMentor,
  loginMentor,

  // logoutMentor,
  //  refreshAccessToken,
  getAllMentorsData,
  getMentorDetailsById,
  getMentorsBySearchQuery,
  updateMentorProfile,
};
