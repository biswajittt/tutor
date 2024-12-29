import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Mentor } from "../models/mentor.model.js";

//register user***
const getSearchResults = asyncHandler(async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // Check if searchTerm is provided
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json(new ApiError(400, "Search term is required"));
    }

    // console.log("Search Term:", searchTerm);

    // Search for mentors with expertise matching the search term (case-insensitive)
    const mentors = await Mentor.find({
      expertise: { $regex: searchTerm, $options: "i" }, // Case-insensitive match
    }).select("-password -refreshToken");

    // Handle case: no mentors found
    if (mentors.length === 0) {
      return res
        .status(404)
        .json(new ApiError(404, "No mentors found matching the search term"));
    }

    // Return the list of mentors
    return res
      .status(200)
      .json(
        new ApiResponse(200, mentors, `${mentors.length} mentor(s) found.`)
      );
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    return res
      .status(500)
      .json(
        new ApiError(500, "An error occurred while fetching search results.")
      );
  }
});
export { getSearchResults };
