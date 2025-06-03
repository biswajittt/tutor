import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Stripe from "stripe";
import { Booking } from "../models/booking.model.js";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken"; // Make sure this import exists
// import { decrypt } from "./encryption.controller.js";
import mongoose from "mongoose";
import { encrypt, decrypt } from "../utils/crypto.js";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Import and initialize Stripe // Imports and initializes Stripe with the secret key

/* Create Payment Intent and retrieve Client Secret */
const getClientSecret = asyncHandler(async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // Set the amount in cents (100 cents = 1 USD)
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(paymentIntent.client_secret);
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error); // Log Stripe error for debugging
    res.status(500).json({
      message: "An error occurred while creating payment intent",
      error: error.message,
    });
  }
});
/*end*/

// Short Class Booking Controller
// const shortClassBooking = asyncHandler(async (req, res) => {
//   const { mentorId } = req.body;
//   // console.log(mentorId);
//   try {
//     // Step 1: Authenticate user
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       throw new ApiError(401, { message: "User not logged in" });
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const { _id: userId, userType } = decodedToken;
//     // console.log(userType);
//     if (userType !== "student") {
//       throw new ApiError(403, { message: "Only students can book classes." });
//     }

//     // Step 2: Validate mentor ID and fetch class price
//     const mentor = await Mentor.findById(mentorId);
//     if (!mentor) {
//       throw new ApiError(404, { message: "Mentor not found." });
//     }
//     console.log(mentor);
//     const classPrice = mentor.shortClassPrice; // Assuming `classPrice` is a field in the Mentor model
//     if (!classPrice) {
//       throw new ApiError(400, {
//         message: "Class price not available for this mentor.",
//       });
//     }

//     // Step 3: Check for ongoing class
//     const ongoingClass = await Booking.findOne({
//       "studentDetails.studentId": userId,
//       "mentorDetails.mentorId": mentorId,
//       classType: "short",
//       classStatus: "active",
//     });

//     // if (ongoingClass) {
//     //   throw new ApiError(400, {
//     //     message: `You already have an ongoing ${classType} class with this mentor.`,
//     //   });
//     // }
//     // console.log(ongoingClass);
//     // // Step 4: Create Payment Intent using Stripe
//     // const paymentIntent = await stripe.paymentIntents.create({
//     //   amount: classPrice * 100, // Convert to cents
//     //   currency: "usd",
//     //   automatic_payment_methods: { enabled: true },
//     // });

//     // // Step 5: Create pending booking
//     // const newBooking = new Booking({
//     //   classType,
//     //   studentDetails: {
//     //     studentId: userId,
//     //     studentName: decodedToken.name, // Assuming the name is in the token
//     //     studentEmail: decodedToken.email, // Assuming the email is in the token
//     //   },
//     //   mentorDetails: {
//     //     mentorId,
//     //     mentorName: mentor.name,
//     //     mentorEmail: mentor.email,
//     //   },
//     //   paymentInformation: {
//     //     paymentId: paymentIntent.id,
//     //     amountPaid: classPrice,
//     //     paymentStatus: "pending", // Initially pending
//     //   },
//     //   classStatus: "pending", // Initially pending
//     // });

//     // const savedBooking = await newBooking.save();

//     // return res.status(200).json({
//     //   success: true,
//     //   message: "Class booking initialized. Proceed to payment.",
//     //   clientSecret: paymentIntent.client_secret,
//     //   bookingId: savedBooking._id, // Include booking ID
//     // });
//   } catch (error) {
//     if (error instanceof ApiError) {
//       return res.status(error.statusCode).json(error.details);
//     }
//     console.error("Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred during the booking process.",
//       error: error.message,
//     });
//   }
// });
// const session = asyncHandler(async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "T-shirt",
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     ui_mode: "embedded",
//     return_url:
//       "http://localhost:5173/student/book-class/payment/checkout/return?session_id={CHECKOUT_SESSION_ID}",
//   });

//   res.send({ clientSecret: session.client_secret });
// });
// const status = asyncHandler(async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//   console.log(session);
//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email,
//     payment_status: session.payment_status,
//   });
// });
// const calculateOrderAmount = (items) => {
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   let total = 0;
//   items.forEach((item) => {
//     total += item.amount;
//   });
//   return total;
// };
const paymentIntent = asyncHandler(async (req, res) => {
  // let i = 0;
  // console.log("pro: ", i++);
  const {
    mentorId,
    classType,
    teachingMode,
    selectedSubject,
    classDate,
    selectedClassTime,
  } = req.body;
  // console.log(
  //   "data: ",
  //   mentorId,
  //   classType,
  //   teachingMode,
  //   selectedSubject,
  //   classDate,
  //   selectedClassTime
  // );
  // return;
  if (!classType || !mentorId) {
    return res
      .status(400)
      .json(new ApiError(400, "Please initiate the payment again"));
  }

  // Check if the ID format is valid (optional if using MongoDB ObjectID validation)
  if (!mongoose.Types.ObjectId.isValid(mentorId)) {
    return res.status(400).json(new ApiError(400, "Invalid mentor ID format"));
  }

  // console.log(mentorId);
  const mentorDetails = await Mentor.findById(mentorId).select(
    "-password -refreshToken"
  );

  // If mentor not found
  if (!mentorDetails) {
    return res.status(404).json(new ApiError(404, "Mentor not found"));
  }

  let classPrice;
  if (classType === "short") {
    classPrice = mentorDetails.shortClassPrice;
  } else if (classType == "long") {
    classPrice = mentorDetails.monthlyClassPrice;
  }

  // Important Fix: Stripe expects the amount in cents (multiply by 100)
  // const amountInCents = classPrice * 100;
  //encrypt clss data
  const encryptedClassData = encrypt({
    mentorId,
    classType,
    teachingMode,
    classPrice,
    selectedSubject,
    classDate,
    selectedClassTime,
  });
  //sent cookies
  const options = {
    httpOnly: true,
    secure: false, //In Development: If you're testing this on localhost (HTTP), having secure: true will prevent the cookie from being set, because secure requires HTTPS. In development, you should set the secure flag conditionally.
    sameSite: "Strict", // Ensures the cookies are sent only from your own site
  };
  res.cookie("classData", encryptedClassData, options);
  // const classData = {
  //   mentorId,
  //   classType,
  //   teachingMode,
  //   classPrice,
  //   selectedSubject,
  //   classDate,
  //   selectedClassTime,
  // };

  // console.log("req", req.cookies);
  // const { mentorId, classType } = req.body;
  // if (!classType || !mentorId) {
  //   return res
  //     .status(400)
  //     .json(new ApiError(400, "Please initiate the payment again"));
  // }
  // const decryptedClassType = decrypt(classType);
  // console.log("decryptedClassType", decryptedClassType);
  try {
    // Check if the payment cookie exists or retrieve it from Authorization header
    const paymentTokenExist =
      req.cookies?.payment ||
      req.header("Authorization")?.replace("Bearer ", "");
    let decodedPaymentToken;
    if (paymentTokenExist) {
      decodedPaymentToken = jwt.verify(
        paymentTokenExist,
        process.env.PAYMENT_INTENT_TOKEN_SECRET
      );
      console.log(decodedPaymentToken?.clientSecret);
      // If the token exists, return it directly without creating a new payment intent
      if (decodedPaymentToken && decodedPaymentToken?.clientSecret) {
        return res.status(200).json(
          new ApiResponse(
            200,
            {
              clientSecret: decodedPaymentToken?.clientSecret,
              // classData,
            },
            "success"
          )
        );
      } else {
        console.log("expired");
        return res.status(401).json(new ApiError(401));
      }
    }

    // const decryptedClassType = decrypt(classType);
    // const { mentorId } = req.params;
    // console.log(mentorId);

    // console.log("classPrice", classPrice);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: classPrice,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // console.log(paymentIntent);
    //as payment start, session will start****
    const paymentToken = jwt.sign(
      {
        clientSecret: paymentIntent.client_secret,
        mentorId: mentorId,
        studentId: req?.user?._id,
        classType: classType,
      },
      process.env.PAYMENT_INTENT_TOKEN_SECRET,
      { expiresIn: process.env.PAYMENT_INTENT_TOKEN_EXPIRY }
    );
    console.log("hi10");
    // console.log(paymentToken);
    //sent cookies
    const options = {
      httpOnly: true,
      secure: false, //In Development: If you're testing this on localhost (HTTP), having secure: true will prevent the cookie from being set, because secure requires HTTPS. In development, you should set the secure flag conditionally.
      sameSite: "Strict", // Ensures the cookies are sent only from your own site
    };
    res.cookie("payment", paymentToken, options);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          clientSecret: paymentIntent?.client_secret,
        },
        "success"
      )
    );
  } catch (error) {
    console.error("PaymentIntent error:", error);
    // If token is expired
    if (error.name === "TokenExpiredError") {
      // Clear the payment cookie
      res.clearCookie("payment");

      // Respond with a message asking the user to restart the payment process
      return res
        .status(401)
        .json(
          new ApiError(401, "Session expired. Please start the payment again.")
        );
    }
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while creating the payment"));
  }
});

const storeStudentDataonSuccessfullPayment = asyncHandler(async (req, res) => {
  // console.log("hi");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Booking created successfully"));
  res.clearCookie("payment");
  const { id, amount } = req.body;
  // const studentDetails = req.user;

  try {
    // const paymentToken =
    //   req.cookies?.payment ||
    //   req.header("Authorization")?.replace("Bearer ", "");
    const classDataExist =
      req.cookies?.classData ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!classDataExist) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "Access denied. Please start the payment from starting."
          )
        );
    }
    //class data
    let classData;
    if (classDataExist) {
      classData = decrypt(classDataExist);
    }
    const {
      mentorId,
      classType,
      teachingMode,
      classPrice,
      selectedSubject,
      classDate,
      selectedClassTime,
    } = classData;

    // const decodedToken = jwt.verify(
    //   paymentToken,
    //   process.env.PAYMENT_INTENT_TOKEN_SECRET
    // );
    // console.log("decodedToken afer payment", decodedToken);
    // const { mentorId, classType, mode } = decodedToken;
    // Get mentor and student details
    const mentorDetails = await Mentor.findById(mentorId).select(
      "-password -refreshToken"
    );
    // const studentDetails = await Student.findById(studentId).select(
    //   "-password -refreshToken"
    // );
    if (!mentorDetails) {
      return res.status(404).json(new ApiError(404, "Mentor not found"));
    }
    // if (!studentDetails) {
    //   return res.status(404).json(new ApiError(404, "Student not found"));
    // }
    // Prepare the booking data
    // Extract the date part (e.g., "2025-06-04")
    const datePart = classDate.split("T")[0];
    const [start, end] = "05:38|08:38".split("|");

    // Convert start and end to Date objects on the same day
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startTime = new Date(classDate);
    startTime.setUTCHours(startHour, startMinute, 0, 0); // Adjust if you're using local time

    const endTime = new Date(classDate);
    endTime.setUTCHours(endHour, endMinute, 0, 0);

    const bookingData = {
      classType,
      // bookingTime: new Date("2024-11-20T14:00:00"), // Assuming the booking time is now
      mode: teachingMode,
      subject: selectedSubject,
      studentId: req?.user?._id,
      mentorId: mentorId,
      scheduledDate: new Date(classDate), // Assuming classDate and selectedClassTime are in the correct format
      scheduledStartTime: startTime,
      scheduledEndTime: endTime,
      durationMinutes:
        classType === "short"
          ? mentorDetails.shortClassDuration
          : mentorDetails.monthlyClassDuration,
      paymentInfo: {
        paymentId: id, // Assuming `payment` contains the payment ID
        amountPaid: amount, // You can get the actual amount paid based on classType or payment details
        paymentStatus: "paid", // Assuming payment was successful
      },
    };
    console.log("Booking date: ", bookingData);
    // Create a new Booking document
    const newBooking = await Booking.create(bookingData);
    console.log("newBooking", newBooking);
    // Send response with booking information
    return res.status(201).json({
      message: "Booking created successfully",
    });
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
export { getClientSecret, paymentIntent, storeStudentDataonSuccessfullPayment };
