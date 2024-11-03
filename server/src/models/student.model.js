import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Mentor } from "./mentor.model.js";
const studentScheme = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // Array to store booked class details
    bookedClasses: [
      {
        classType: String, // e.g., "short" or "monthly"
        classPrice: Number,
        bookingTime: Date,
        classStatus: { type: String, default: "booked" },
        mentorDetails: {
          mentorId: { type: Schema.Types.ObjectId, ref: "Mentor" },
          mentorName: String,
          mentorEmail: String,
          mentorPhoneNumber: String,
        },
        paymentInformation: {
          paymentId: String,
          amountPaid: Number,
          paymentDate: { type: Date, default: Date.now },
          paymentStatus: String,
        },
      },
    ],
    mentorReviews: [
      {
        rating: { type: Number, min: 1, max: 5, required: true },
        review: { type: String, required: true },
        mentorId: {
          type: Schema.Types.ObjectId,
          ref: "Mentor",
          required: true,
        },
        mentorName: { type: String, required: true },
        reviewDate: { type: Date, default: Date.now },
        // additional fields if needed
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// hashing password before saving the data on database and the calling next
studentScheme.pre("save", async function (next) {
  // return if password is not modified again. Only  hash the password first time
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//creating one function to check the password while user login
studentScheme.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

//gererating access token (jwt)
studentScheme.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      userType: "student", // Add user type
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//gererating refresh token (jwt) -- have less information
studentScheme.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userType: "student", // Add user type
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const Student = mongoose.model("Student", studentScheme);
