import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { Booking } from "../models/booking.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Mentor } from "../models/mentor.model.js";
import bcrypt from "bcryptjs";
// ** Generate Access & Refresh Tokens**
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await Student.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Store refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating access & refresh tokens");
  }
};

// ** Register Student**
export const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, location, password } = req.body;

  // **🔹 Validate Input**
  if (
    [name, email, phoneNumber, location, password].some(
      (field) => !field?.trim()
    )
  ) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  // **🔹 Check if Email Already Exists in Student or Mentor Collection**
  const isEmailTaken =
    (await Student.findOne({ email })) || (await Mentor.findOne({ email }));
  if (isEmailTaken) {
    return res.status(409).json(new ApiError(409, "Email already in use"));
  }

  // **🔹 Create New Student**
  const student = await Student.create({
    name,
    email,
    phoneNumber,
    location,
    passwordHash: password,
  });

  // **🔹 Generate Tokens**
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(student._id);

  // **🔹 Send Secure Cookies**
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };

  // **🔹 Response**
  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        { user: student, accessToken, refreshToken },
        "Student registered successfully"
      )
    );
});

// ** Login Student**
export const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // **🔹 Validate Input**
  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "Email and password are required"));
  }

  // **🔹 Find Student**
  const student = await Student.findByEmail(email);
  if (!student) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }
  // **🔹 Verify Password**
  const isPasswordCorrect = await student.isPasswordCorrect(password); //use the isPasswordCorrect method.
  if (!isPasswordCorrect) {
    return res.status(201).json(new ApiError(401, "Invalid credentials"));
  }

  // **🔹 Generate Tokens**
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(student._id);
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
  const loggedInStudent = await Student.findById(student._id).select(
    "-passwordHash -refreshToken"
  );
  // **🔹 Send Cookies & Response**
  return res
    .status(200)
    .json(new ApiResponse(200, { user: loggedInStudent }, "Login successful"));
});

// ** Logout Student**
export const logoutStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.user;

  // **🔹 Remove Refresh Token from DB**
  await Student.findByIdAndUpdate(studentId, { refreshToken: null });

  // **🔹 Clear Cookies & Response**
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "Logout successful"));
});

// ** get all bokings by student id**
export const getAllBookingsByStudentId = asyncHandler(async (req, res) => {
  const { _id: studentId } = req.user;

  // **🔹 Validate Student ID**
  if (!studentId) {
    throw new ApiError(400, "Student ID is required.");
  }

  // **🔹 Find Bookings by Student ID**
  const bookings = await Booking.find({ studentId });
  // console.log(bookings);
  // **🔹 Check if Bookings Exist**
  if (!bookings || bookings.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "No bookings found for this student."));
  }
  // 1. Filter for "Active/Upcoming" bookings (status: "scheduled" or "started")
  const activeOrUpcomingBookings = bookings.filter((booking) =>
    ["scheduled", "started"].includes(booking.classStatus)
  );

  // 2. Filter for "Completed" bookings
  const completedBookings = bookings.filter(
    (booking) => booking.classStatus === "completed"
  );
  // **🔹 Send Response**
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { activeOrUpcomingBookings, completedBookings },
        "Bookings retrieved successfully."
      )
    );
});

// // **Get booking data by mentor and student id**
// export const getBookingsByStudentAndMentor = asyncHandler(async (req, res) => {
//   // console.log("hi888");
//   const { mentorId } = req.body;
//   const { _id } = req.user;
//   const studentId = _id;
//   // console.log(studentId);
//   // console.log(mentorId);
//   if (!studentId || !mentorId) {
//     throw new ApiError(400, "Student ID and Mentor ID are required.");
//   }
//   // Find the active booking for the given student and mentor
//   const activeBooking = await Booking.findOne({
//     studentId,
//     mentorId,
//     classStatus: { $in: ["scheduled", "started"] },
//   });
//   // console.log(activeBooking);
//   if (!activeBooking) {
//     return res
//       .status(200)
//       .json(
//         new ApiResponse(
//           404,
//           null,
//           "No active booking found for this student and mentor."
//         )
//       );
//   }

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         activeBooking,
//         "Active booking data retrieved successfully."
//       )
//     );
// });
// export { registerStudent, loginStudent };
