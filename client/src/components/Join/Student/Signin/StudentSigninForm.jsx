// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

import React from "react";
import img from "../../section.png";
import AuthButton from "../../../Utilities/AuthButton/AuthButton";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../handler/useAuth.js";
import validateStudentSigninData from "../../../../validation/validateStudentSigninData.js";
import handleStudentLogin from "../../../../handler/handleStudentLogin.js";

export default function StudentSigninForm() {
  const navigate = useNavigate();
  //check user already loggedin or not
  const { isAuthenticated } = useAuth();
  // console.log(isAuthenticated);
  // If the user is already logged in, redirect to the previous page
  if (isAuthenticated === true) {
    navigate("/");
    return null;
  }

  //state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  //handle form submit
  const onSubmit = async (event) => {
    event.preventDefault();
    //start loading
    setLoading(true);
    //data validation
    if (!validateStudentSigninData(email, password)) {
      setLoading(false);
      //show error
      setError(true);
      setMsg("Please fill the data carefully");
      // console.log("error");
    } else {
      //send data to backend
      // const data = new FormData();
      // data.append("name", name);
      // data.append("email", email);
      // data.append("phoneNumber", phoneNumber);
      // data.append("location", location);
      // data.append("password", password);
      const res = await handleStudentLogin(email, password);
      if (res?.status === 404) {
        setError(true);
        setMsg("User Not Exist");
        return;
      } else if (res?.status === 200) {
        setError(false);
        setMsg("User loggedin successfully");
        // if success then clean all the data then redirect
        if (res?.status === 200) {
          navigate("/");
          // location.reload();
        }
      } else if (res?.status === 500 || res?.status === 409) {
        setError(true);
        setMsg("Something went wrong while login user");
        return;
      }
      // console.log(res);
    }

    // console.log(typeof name, email, phoneNumber, location, password);
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="text-center text-lg">
            {/* <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
            /> */}
            <Link to="/"> Learnerby</Link>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold mb-4">
              Sign in
            </h1>

            <div className="font-bold text-center text-wrap">
              {msg.length > 1 ? (
                <p
                  className="auth-response"
                  style={{ color: `${error ? "Red" : "#00e409"}` }}
                >
                  {msg}
                </p>
              ) : null}
            </div>

            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={onSubmit}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">
                    {loading ? "Loading..." : "Sign In"}
                  </span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center text-sm">
                  Don't have account?
                  <Link
                    to="/auth/student/registration"
                    className="ml-2 text-base font-bold text-indigo-700"
                  >
                    Join
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(
                  "https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
                )`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
