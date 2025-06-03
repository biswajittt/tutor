import { Review } from "../models/review.model.js";
import { Mentor } from "../models/mentor.model.js";
import { Booking } from "../models/booking.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";

// **✅ Add Review (Only if the Booking is Completed)**
const addReview = async (req, res) => {
  try {
    const { studentId, mentorId, bookingId, rating, feedback } = req.body;

    // **🔸 Validate IDs**
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(mentorId) ||
      !mongoose.Types.ObjectId.isValid(bookingId)
    ) {
      return res.status(400).json(new ApiError(400, "Invalid ID format"));
    }

    // **🔸 Ensure Booking Exists and is Completed**
    const booking = await Booking.findOne({
      _id: bookingId,
      studentId,
      mentorId,
      status: "completed",
    });
    if (!booking) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Cannot review an incomplete or non-existent booking"
          )
        );
    }

    // **🔸 Check if Student Already Reviewed the Mentor for This Booking**
    const existingReview = await Review.findOne({
      studentId,
      mentorId,
      bookingId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "You have already reviewed this mentor for this booking"
          )
        );
    }

    // **🔹 Create & Save Review**
    const review = new Review({
      studentId,
      mentorId,
      bookingId,
      rating,
      feedback,
    });
    await review.save();

    return res
      .status(201)
      .json(new ApiResponse(201, review, "Review added successfully"));
  } catch (error) {
    console.error("Error adding review:", error);
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while adding the review"));
  }
};

// **✅ Get Reviews for a Mentor**
const getMentorReviews = async (req, res) => {
  try {
    const { mentorId } = req.params;

    // **🔸 Validate Mentor ID**
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid mentor ID format"));
    }

    // **🔹 Fetch Reviews**
    const reviews = await Review.find({ mentorId }).populate(
      "studentId",
      "name profileImage"
    );

    if (!reviews.length) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No reviews found for this mentor"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, reviews, "Mentor reviews fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching mentor reviews:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "An error occurred while fetching mentor reviews")
      );
  }
};

// **✅ Update a Review (Only by the Review Author)**
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { studentId, rating, feedback } = req.body;

    // **🔸 Validate Review ID**
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid review ID format"));
    }

    // **🔹 Find & Validate Review**
    const review = await Review.findOne({ _id: reviewId, studentId });
    if (!review) {
      return res
        .status(403)
        .json(
          new ApiError(403, "You are not authorized to update this review")
        );
    }

    // **🔹 Update Review**
    if (rating) review.rating = rating;
    if (feedback) review.feedback = feedback;
    await review.save();

    return res
      .status(200)
      .json(new ApiResponse(200, review, "Review updated successfully"));
  } catch (error) {
    console.error("Error updating review:", error);
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while updating the review"));
  }
};

// **✅ Delete a Review (Only by the Review Author)**
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { studentId } = req.body;

    // **🔸 Validate Review ID**
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid review ID format"));
    }

    // **🔹 Find & Validate Review**
    const review = await Review.findOne({ _id: reviewId, studentId });
    if (!review) {
      return res
        .status(403)
        .json(
          new ApiError(403, "You are not authorized to delete this review")
        );
    }

    // **🔹 Delete Review**
    await review.deleteOne();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Review deleted successfully"));
  } catch (error) {
    console.error("Error deleting review:", error);
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while deleting the review"));
  }
};

export { addReview, getMentorReviews, updateReview, deleteReview };
