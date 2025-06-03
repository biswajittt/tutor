import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
