import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    classType: {
      type: String,
      required: true,
      // enum: ["short", "monthly"], // To ensure only "short" or "monthly" is allowed
    },
    bookingTime: {
      type: Date,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
      default: Date.now, // Defaults to the current date
    },
    studentDetails: {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      studentName: { type: String, required: true },
      studentEmail: { type: String, required: true },
      studentPhoneNumber: { type: String, required: true },
    },
    mentorDetails: {
      mentorId: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
      mentorName: { type: String, required: true },
      mentorEmail: { type: String, required: true },
    },
    paymentInformation: {
      paymentId: { type: String, required: true },
      amountPaid: { type: Number, required: true },
      paymentDate: { type: Date, default: Date.now },
      paymentStatus: {
        type: String,
        required: true,
        enum: ["successful", "pending", "failed"], // Payment status options
      },
    },
    classStatus: {
      type: String,
      default: "active", // Default status is "active"
      enum: ["active", "started", "done", "cancelled"], // Allowed values for class status
    },
  },
  { timestamps: true }
);

// Export the Bookings model
export const Booking = mongoose.model("Booking", bookingSchema);
