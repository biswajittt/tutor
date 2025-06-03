import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const mentorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mentorImage: { type: String, default: "" },
    about: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    mode: { type: String, required: true, enum: ["Online", "Offline", "Both"] },
    tags: { type: [String], default: [] },
    subjects: { type: [String], required: true },

    availability: [
      {
        day: { type: String, required: true },
        timeSlots: [
          {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
          },
        ],
      },
    ],

    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0, min: 0 },

    shortClassPrice: { type: Number, required: true, min: 0 },
    shortClassDuration: { type: Number, required: true, min: 0 },

    monthlyClassPrice: { type: Number, default: 0, min: 0 },
    monthlyClassDuration: { type: Number, default: 0, min: 0 },
    monthlyClassFrequency: { type: Number, default: 0, min: 0 },

    passwordHash: { type: String, required: true }, // Store hashed password
    refreshToken: { type: String, default: null }, // Security best practice
  },
  { timestamps: true }
);

// **🔹 Hash Password Before Saving**
mentorSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

// **🔹 Verify Password**
mentorSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

// **🔹 Generate Access Token**
mentorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      userType: "mentor",
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// **🔹 Generate Refresh Token**
mentorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id, userType: "mentor" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Mentor = mongoose.model("Mentor", mentorSchema);
