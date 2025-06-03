import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const studentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Faster lookups
    },
    phoneNumber: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true, select: false }, // Exclude by default for security
    refreshToken: { type: String, default: null }, // Exclude from default queries
  },
  { timestamps: true }
);

// 🔹 Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

// 🔹 Validate password
studentSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.passwordHash) {
    return false; // Or throw an error, depending on your error handling strategy
  }
  return bcrypt.compare(password, this.passwordHash);
};

// 🔹 Generate Access Token (JWT)
studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      userType: "student", // Use 'role' instead of 'userType'
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// 🔹 Generate Refresh Token (JWT)
studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id, userType: "student" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// 🔹 Ensure passwordHash is included when explicitly selecting it
studentSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email }).select("+passwordHash");
};

export const Student = mongoose.model("Student", studentSchema);
