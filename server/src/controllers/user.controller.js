import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//register user***
const getSearchresults = asyncHandler(async (req, res) => {
  //get user data from font-end

  const { searchTerm } = req.body;

  console.log("from backend", searchTerm);

  //check user is already exist or not
  const existedUser = await Student.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  //create object of user - create entry in db
  const user = await Student.create({
    name,
    email,
    phonenumber,
    category,
    password,
  });

  //check user is created or not and remove password and refresh token from user
  const createdUser = await Student.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  //send response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
export { getSearchresults };
