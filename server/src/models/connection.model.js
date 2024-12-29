import mongoose, { Schema } from "mongoose";
import { Mentor } from "./mentor.model.js";
import { Student } from "./student.model.js";

const connectionSchema = new Schema(
  {
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
    students: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        hasBooked: { type: Boolean, default: false },
        firstMessage: { type: String, required: true }, // Store the message
        messageDate: { type: Date, default: Date.now }, // Timestamp of the message
      },
    ],
  },
  { timestamps: true }
);

export const Connection = mongoose.model("Connection", connectionSchema);
