import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    classType: {
      type: String,
      enum: ["short", "long"],
      required: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    subject: { type: String, required: true },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true, // Optimized lookup
    },
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
      index: true, // Optimized lookup
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledStartTime: {
      type: Date,
      required: true,
    },
    scheduledEndTime: {
      type: Date,
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1, // Prevents invalid durations
    },
    bookingTime: {
      type: Date,
      required: true,
      default: Date.now, // Stores when the user booked the class
    },

    classStatus: {
      type: String,
      enum: ["scheduled", "started", "completed", "canceled"],
      default: "scheduled",
    },

    classLink: {
      type: String,
      default: null, // Used for online classes
      // validate: {
      //   validator: function (v) {
      //     return this.mode === "online" ? !!v : true;
      //   },
      //   message: "Class link is required for online classes.",
      // },
    },

    paymentInfo: {
      paymentId: { type: String, required: true },
      amountPaid: { type: Number, required: true, min: 0 },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        required: true,
      },
      paymentDate: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

// Export the Booking model
export const Booking = mongoose.model("Booking", bookingSchema);
