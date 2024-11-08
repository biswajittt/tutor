import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userScheme = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    category: {
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
    phonenumber: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerifiedByOtp: {
      type: Boolean,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// hashing password before saving the data on database and the calling next
userScheme.pre("save", async function (next) {
  // return if password is not modified again. Only  hash the password first time
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//creating one function to check the password while user login
userScheme.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

//gererating access token (jwt)
userScheme.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//gererating refresh token (jwt) -- have less information
userScheme.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userScheme);
