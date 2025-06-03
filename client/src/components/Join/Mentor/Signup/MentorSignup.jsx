import React, { useRef, useEffect } from "react";
import "../mentorauth.css";
import img from "../../section.png";
import AuthButton from "../../../Utilities/AuthButton/AuthButton";
import { useState } from "react";
import validateMentorSignupdata from "../../../../validation/validateMentorSignupData";
import { handleMentorRegistration } from "../../../../handler/handleMentorRegistration";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../handler/useAuth.js";
import Availability from "./Availability.jsx";
export default function MentorSignup() {
  const navigate = useNavigate();
  //check user already loggedin or not
  const { isAuthenticated } = useAuth();
  // If the user is already logged in, redirect to the previous page
  if (isAuthenticated) {
    navigate("/");
    return null;
  }
  //state variables
  const [mentorImage, setMentorImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("Mode of Teaching");
  // const [expertise, setExpertise] = useState("");
  const [password, setPassword] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [shortClassPrice, setShortClassPrice] = useState("");
  const [shortClassDuration, setShortClassDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState(1);
  const [showDateCard, setShowDateCard] = useState(false);
  const [showChooseTime, setShowChooseTime] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeFrames, setTimeFrames] = useState([]);
  const [availability, setAvailability] = useState([]);

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 4)); // Max step = 3
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // Min step = 1
  };
  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //adding multiple subjects
  const handleKeyDown = (event) => {
    if ((event.key === "Enter" || event.key === ",") && inputValue.trim()) {
      event.preventDefault(); // Prevent form submission

      if (subjects.length >= 5) {
        alert("You can only add up to 5 subjects.");
        return;
      }

      let newSubject = inputValue.trim();

      // Limit subject length (e.g., 12 characters)
      // const maxLength = 7;
      // if (newSubject.length > maxLength) {
      //   newSubject = newSubject.substring(0, maxLength) + "...";
      // }

      if (!subjects.includes(newSubject)) {
        setSubjects([...subjects, newSubject]);
      }

      setInputValue(""); // Clear input field
    }
  };

  const removeSubject = (subjectToRemove) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToRemove));
  };
  // //save time frame
  // const formatTime = (time) => {
  //   const [hours, minutes] = time.split(":");
  //   let period = "AM";
  //   let formattedHours = parseInt(hours, 10);

  //   if (formattedHours >= 12) {
  //     period = "PM";
  //     if (formattedHours > 12) {
  //       formattedHours -= 12;
  //     }
  //   } else if (formattedHours === 0) {
  //     formattedHours = 12;
  //   }

  //   return `${formattedHours}:${minutes} ${period}`;
  // };

  // const handleSaveTime = () => {
  //   if (!startTime || !endTime) {
  //     alert("Please select both start and end times.");
  //     return;
  //   }

  //   if (startTime >= endTime) {
  //     alert("Start time must be before end time.");
  //     return;
  //   }

  //   const formattedStartTime = formatTime(startTime);
  //   const formattedEndTime = formatTime(endTime);
  //   const timeFrame = `${formattedStartTime} - ${formattedEndTime}`;

  //   if (timeFrames.length < 3) {
  //     setTimeFrames([...timeFrames, timeFrame]);
  //     setStartTime("");
  //     setEndTime("");
  //     setShowChooseTime(false);
  //   } else {
  //     alert("You can only add up to 3 time frames.");
  //   }
  // };
  // const saveTimeFrame = async () => {
  //   console.log(timeFrames);
  // };
  //handle form submit
  const onSubmit = async () => {
    //start loading
    setLoading(true);
    //data validation
    if (
      !validateMentorSignupdata(
        mentorImage,
        name,
        aboutYou,
        email,
        phoneNumber,
        location,
        mode,
        subjects,
        parseFloat(shortClassPrice.trim()),
        parseFloat(shortClassDuration.trim()),
        password,
        availability
      )
    ) {
      setLoading(false);
      //show error
      setError(true);
      setMsg("Please fill the data carefully");
      console.log("error");
    } else {
      //send data to backend
      const data = new FormData();
      data.append("mentorImage", mentorImage);
      data.append("name", name);
      data.append("aboutYou", aboutYou);
      data.append("email", email);
      data.append("phoneNumber", phoneNumber);
      data.append("location", location);
      data.append("mode", mode);
      // //convert the expertise into array
      // const expertiseArray = expertise
      //   .split(",")
      //   .map((item) => item.trim())
      //   .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
      data.append("subjects", JSON.stringify(subjects));
      data.append("shortClassPrice", parseFloat(shortClassPrice.trim()));
      data.append("shortClassDuration", parseFloat(shortClassDuration.trim()));
      data.append("password", password);
      data.append("availability", JSON.stringify(availability));
      const res = await handleMentorRegistration(data);

      if (res?.status === 409) {
        setError(true);
        setLoading(false);
        setMsg("User Already Exist");
        return;
      } else if (res?.status === 500) {
        setError(true);
        setLoading(false);
        setMsg("Something went wrong while registering user");
        return;
      } else if (res?.status === 201) {
        setError(false);
        setLoading(false);
        setMsg("User registered successfully");
        // if success then clean all the data then redirect
        navigate("/");
        return;
      }
      console.log(res);
    }

    console.log(typeof name, email, phoneNumber, location, mode, password);
  };
  // set mentor available date
  const handleAvailability = (value) => {
    setAvailability(value);
  };
  return (
    <div className="learnerby-auth">
      <div className="learnerby-auth-left flex flex-col justify-center items-center">
        <img src={img} alt="" />

        <div class="inline-flex rounded-md shadow-xs mt-8 border" role="group">
          <button
            type="button"
            class="mr-8 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-solid border-gray-900 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  "
            onClick={() => navigate("/auth/mentor/login")}
          >
            <i class="fa-solid fa-user-plus mr-4"></i>
            Login
          </button>
          <button
            type="button"
            class="ml-8 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-solid rounded-r-lg border-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
            onClick={() => navigate("/")}
          >
            <i class="fa-solid fa-house-user mr-4"></i>
            Home
          </button>
        </div>
      </div>
      <div className="learnerby-auth-right">
        {/* <div className="learnerby-auth-right-header">
          <div className="learnerby-auth-right-header-logo">Learnerby</div>
          <div className="learnerby-auth-right-header-btn">Login</div>
        </div> */}

        <div class=" w-full mt-8 p-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Join as a Mentor
          </h5>

          <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            {/* <li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
              <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                <svg
                  class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
              </span>
            </li> */}
            <li
              class={`${
                step !== 1
                  ? "flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                  : "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              }`}
            >
              <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {step !== 1 ? (
                  <svg
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <span class="me-2">1</span>
                )}
                Upload <span class="hidden sm:inline-flex sm:ms-2">Image</span>
              </span>
            </li>
            <li
              class={`${
                step > 2
                  ? "flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                  : "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              }`}
            >
              <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {step > 2 ? (
                  <svg
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <span class="me-2">2</span>
                )}
                Peronal{" "}
                <span class="hidden sm:inline-flex sm:ms-2">Details</span>
              </span>
            </li>
            <li
              class={`${
                step > 3
                  ? "flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                  : "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              }`}
            >
              <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {step > 3 ? (
                  <svg
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <span class="me-2">3</span>
                )}
                Profile <span class="hidden sm:inline-flex sm:ms-2">Info</span>
              </span>
            </li>
            <li class="flex items-center">
              <span class="me-2">4</span>
              Availability
            </li>
          </ol>

          <div className="h-[29rem] py-4">
            {step === 1 && (
              <div className="mentor-auth-profile-img-container-form m-auto mt-[5rem]">
                <span className="mentor-auth-profile-img-container-form-title">
                  Upload your profile image
                </span>
                <p className="mentor-auth-profile-img-container-form-paragraph">
                  File should be an image
                </p>
                <label
                  htmlFor="mentor-auth-profile-img-container-form-file-input"
                  className="mentor-auth-profile-img-container-form-drop-container"
                >
                  <span className="mentor-auth-profile-img-container-form-drop-title">
                    Drop files here
                  </span>
                  or
                  <input
                    type="file"
                    accept="image/*"
                    name="productImage"
                    required
                    id="mentor-auth-profile-img-container-form-file-input"
                    onChange={(event) => setMentorImage(event.target.files[0])}
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="max-w-sm mx-auto">
                <label
                  htmlFor="name"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  aria-describedby="helper-text-explanation"
                  class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label
                  htmlFor="about"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  About you
                </label>
                <textarea
                  id="about"
                  rows="2"
                  class="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write about you"
                  onChange={(e) => {
                    setAboutYou(e.target.value);
                  }}
                ></textarea>
                <label
                  htmlFor="email"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  aria-describedby="helper-text-explanation"
                  class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@learnerby.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label
                  htmlFor="number"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Your number
                </label>
                <input
                  type="text"
                  id="number"
                  aria-describedby="helper-text-explanation"
                  class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your phone number"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
                <label
                  htmlFor="location"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Your location
                </label>
                <input
                  type="text"
                  id="location"
                  aria-describedby="helper-text-explanation"
                  class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your location"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
            )}

            {step === 3 && (
              <div className="max-w-sm mx-auto">
                <label
                  htmlFor="expertise"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Your expertise
                </label>
                <div className="mb-4 flex flex-wrap gap-2 border rounded-lg p-2 min-h-[40px] bg-gray-50">
                  {subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {subject}
                      <button
                        onClick={() => removeSubject(subject)}
                        className="ml-2 text-white font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {subjects.length < 5 && (
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="border-none bg-gray-50 outline-none flex-grow p-1"
                      placeholder="Type a subject and press Enter or Comma..."
                    />
                  )}
                </div>
                <label
                  htmlFor="mode"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Mode of Teaching
                </label>
                <select
                  id="mode"
                  class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                >
                  <option value="">Mode of Teaching</option>
                  <option value="Online">Online</option>
                  <option value="Online">Offline</option>
                  <option value="Online">Both</option>
                </select>

                <label
                  htmlFor="shortclass"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Price for Single Session
                </label>
                <input
                  type="text"
                  id="shortclass"
                  aria-describedby="helper-text-explanation"
                  class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Price for single session"
                  onChange={(e) => {
                    setShortClassPrice(e.target.value);
                  }}
                />

                <label
                  htmlFor="singlesessionduration"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Duration for Single Session
                </label>
                <div class="flex">
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"></div>
                    <input
                      type="text"
                      id="singlesessionduration"
                      class="block w-full p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Enter duration"
                      onChange={(event) => {
                        setShortClassDuration(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <button
                    id="dropdown-currency-button"
                    data-dropdown-toggle="dropdown-currency"
                    class="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                  >
                    <i class="fa-regular fa-clock mr-2 font-bold"></i>
                    Minutes
                  </button>
                </div>
                <p className="mb-4 mt-[5px] text-gray-500 text-xs">
                  Enter the duration between{" "}
                  <u class="underline">10 minutes to 60 minutes</u> only
                </p>
                {/* <label
                  htmlFor="monthlyclass"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Price for monthly class
                </label>
                <input
                  type="text"
                  id="monthlyclass"
                  aria-describedby="helper-text-explanation"
                  class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Price for monthly class"
                  onChange={(e) => {
                    setMonthlyClassPrice(e.target.value);
                  }}
                /> */}
                <label
                  htmlFor="password"
                  class="text-start block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  aria-describedby="helper-text-explanation"
                  class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            )}

            {step === 4 && (
              <div className="max-w-lg mx-auto">
                <div class="mt-4 p-6 bg-white border border-solid border-gray-200 rounded-lg shadow-sm">
                  <Availability onChange={handleAvailability} />
                  {/* <div>
                    <button
                      id="dropdownTimepickerButton"
                      data-dropdown-toggle="dropdownTimepicker"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={() => {
                        setShowChooseTime(true);
                      }}
                    >
                      Choose time{" "}
                      <svg
                        class="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    {showChooseTime && (
                      <div
                        id="dropdownTimepicker"
                        class="z-10 bg-white rounded-lg shadow-sm w-auto dark:bg-gray-700 p-3"
                      >
                        <div class="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 mb-2">
                          <div>
                            <label
                              for="start-time"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Start time:
                            </label>
                            <div class="relative">
                              <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                <svg
                                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </div>
                              <input
                                type="time"
                                id="start-time"
                                class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                min="09:00"
                                max="18:00"
                                value={startTime}
                                onChange={(event) => {
                                  setStartTime(event.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              for="end-time"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              End time:
                            </label>
                            <div class="relative">
                              <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                <svg
                                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </div>
                              <input
                                type="time"
                                id="end-time"
                                class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                min="09:00"
                                max="18:00"
                                value={endTime}
                                onChange={(event) => {
                                  setEndTime(event.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          id="saveTimeButton"
                          type="button"
                          class="text-blue-700 dark:text-blue-500 text-sm hover:underline p-0"
                          onClick={saveTimeFrame}
                        >
                          Save time
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      setShowDateCard(false);
                    }}
                  >
                    Add
                    <svg
                      class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button> */}
                </div>

                {/* <div class="mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center min-w-[4rem]">
                      <input
                        id="tuesday"
                        name="days"
                        type="checkbox"
                        value="tuesday"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="tuesday"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Tue
                      </label>
                    </div>
                    <div class="w-full max-w-[7rem]">
                      <label for="start-time-tuesday" class="sr-only">
                        Start time:
                      </label>
                      <div class="relative">
                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="time"
                          id="start-time-tuesday"
                          name="start-time-tuesday"
                          class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          min="09:00"
                          max="18:00"
                          value="00:00"
                          required
                        />
                      </div>
                    </div>
                    <div class="w-full max-w-[7rem]">
                      <label for="end-time-tuesday" class="sr-only">
                        End time:
                      </label>
                      <div class="relative">
                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="time"
                          id="end-time-tuesday"
                          name="end-time-tuesday"
                          class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          min="09:00"
                          max="18:00"
                          value="00:00"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            )}
          </div>

          <div class="items-center justify-between space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            <button
              type="button"
              class={`text-white ${
                step === 1 ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
              }  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              onClick={handlePrevStep}
              disabled={step === 1}
            >
              <i class="text-lg fa-solid fa-arrow-left"></i>
            </button>
            {step === 4 ? (
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                onClick={onSubmit}
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  {loading ? "Loading..." : "Submit"}
                </span>
              </button>
            ) : (
              <button
                type="button"
                class={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                onClick={handleNextStep}
                disabled={step === 4}
              >
                <i class="text-lg fa-solid fa-arrow-right"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
