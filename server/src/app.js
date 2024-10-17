import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"], // Ensure Authorization is allowed
  })
);

//defining limitation to json file size
app.use(express.json({ limit: "16kb" }));

//url encoder
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//for public files
app.use(express.static("public"));

//using cookie parser
app.use(cookieParser());

//routers
import studentRouter from "./routes/student.routes.js";
import bookClassRouter from "./routes/bookclass.routes.js";
import mentorRouter from "./routes/mentor.routes.js";
//routes declaration
app.use("/api/v1/auth/student", studentRouter); // redirectiong to 'userRouter after '
app.use("/api/v1/bookclass/", bookClassRouter);
app.use("/api/v1/mentor/", mentorRouter);
export { app };
