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
import img from "../../section.jpg";
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
  console.log(isAuthenticated);
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
  const onSubmit = async () => {
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
      if (res?.status === 409) {
        setError(true);
        setMsg("User Already Exist");
        return;
      } else if (res?.status === 500) {
        setError(true);
        setMsg("Something went wrong while login user");
        return;
      } else if (res?.status === 200) {
        setError(false);
        setMsg("User loggedin successfully");
        // if success then clean all the data then redirect
        if (res?.status === 200) {
          navigate("/");
        }
      }
      // console.log(res);
    }

    // console.log(typeof name, email, phoneNumber, location, password);
  };
  return (
    <div className="learnerby-auth">
      <div className="learnerby-auth-left">
        <img src={img} alt="" />
      </div>
      <div className="learnerby-auth-right">
        <div className="learnerby-auth-right-header">
          <div className="learnerby-auth-right-header-logo">Learnerby</div>
          <div className="learnerby-auth-right-header-btn">
            <Link to="/auth/student/registration">Registration</Link>
          </div>
        </div>
        <div className="learnerby-auth-right-form-container">
          {/* show this when any response is there */}
          {msg.length > 1 ? (
            <div
              className="auth-response"
              style={{ color: `${error ? "Red" : "#00e409"}` }}
            >
              {msg}
            </div>
          ) : null}
          <div className="auth-group">
            <i className="fa-solid fa-envelope icon"></i>
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="auth-group">
            <i className="fa-solid fa-lock icon"></i>
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div
            className="auth-group"
            style={{ justifyContent: "center" }}
            onClick={onSubmit}
          >
            <AuthButton title={loading ? "Loading" : "Get Started"} />
          </div>
        </div>
      </div>
    </div>
    // <Card className="mx-auto max-w-sm">
    //   <CardHeader>
    //     <CardTitle className="text-2xl">Login</CardTitle>
    //     <CardDescription>
    //       Enter your email below to login to your account
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="p-6">
    //     <div className="grid gap-4">
    //       <div className="grid gap-2">
    //         <Label htmlFor="email">Email</Label>
    //         <Input
    //           id="email"
    //           type="email"
    //           placeholder="m@example.com"
    //           required
    //         />
    //       </div>
    //       <div className="grid gap-2">
    //         <div className="flex items-center">
    //           <Label htmlFor="password">Password</Label>
    //           <Link href="#" className="ml-auto inline-block text-sm underline">
    //             Forgot your password?
    //           </Link>
    //         </div>
    //         <Input id="password" type="password" required />
    //       </div>
    //       <Button type="submit" className="w-full">
    //         Login
    //       </Button>
    //       <Button variant="outline" className="w-full">
    //         Login with Google
    //       </Button>
    //     </div>
    //     <div className="mt-4 text-center text-sm">
    //       Don&apos;t have an account?{" "}
    //       <Link href="#" className="underline">
    //         Sign up
    //       </Link>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
