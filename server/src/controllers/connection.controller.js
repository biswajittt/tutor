import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import mongoose from "mongoose";
import { Connection } from "../models/connection.model.js";
const sendMessage = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { mentorId, studentId, message } = req.body;
  console.log(mentorId, message);
  // try {
  //   // Validate inputs
  //   if (!mongoose.Types.ObjectId.isValid(mentorId)) {
  //     return res.status(400).json(
  //       new ApiError(
  //         400, // Bad Request
  //         "Invalid mentor ID."
  //       )
  //     );
  //   }
  //   if (!mongoose.Types.ObjectId.isValid(studentId)) {
  //     return res.status(400).json(
  //       new ApiError(
  //         400, // Bad Request
  //         "Invalid student ID."
  //       )
  //     );
  //   }
  //   if (!message || typeof message !== "string" || message.trim() === "") {
  //     return res.status(400).json(
  //       new ApiError(
  //         400, // Bad Request
  //         "Message cannot be empty."
  //       )
  //     );
  //   }

  //   // Check if the connection already exists
  //   let connection = await Connection.findOne({ mentorId });

  //   if (!connection) {
  //     // If no connection exists, create one
  //     connection = new Connection({
  //       mentorId,
  //       students: [{ studentId, hasBooked: false, firstMessage: message }],
  //     });
  //   } else {
  //     // Check if the student already exists in the connection
  //     const studentEntry = connection.students.find(
  //       (student) => student.studentId.toString() === studentId.toString()
  //     );

  //     if (studentEntry) {
  //       if (!studentEntry.hasBooked) {
  //         return res.status(403).json(
  //           new ApiError(
  //             403, // Bad Request
  //             "You have already sent a message without booking a class."
  //           )
  //         );
  //       } else {
  //         return res.status(403).json(
  //           new ApiError(
  //             403, // Bad Request
  //             "You cannot send additional messages without booking a class."
  //           )
  //         );
  //       }
  //     } else {
  //       // Add the student to the array
  //       connection.students.push({
  //         studentId,
  //         hasBooked: false,
  //         firstMessage: message,
  //       });
  //     }
  //   }

  //   // Save the updated or newly created connection
  //   await connection.save();
  //   return res
  //     .status(200)
  //     .json(new ApiResponse(200, "Message sent successfully."));
  // } catch (error) {
  //   console.error("Error in sendMessage:", error);

  //   // Internal server error
  //   return {
  //     status: 500, // Internal Server Error
  //     success: false,
  //     message: "An unexpected error occurred. Please try again later.",
  //   };
  // }
});
export { sendMessage };
