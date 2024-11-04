import React from "react";
import img from "../../section.jpg";
import AuthButton from "../../../Utilities/AuthButton/AuthButton";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../handler/useAuth.js";
import validateStudentSigninData from "../../../../validation/validateStudentSigninData.js";
import handleStudentLogin from "../../../../handler/handleStudentLogin.js";

export default function StudentSignin() {
  const navigate = useNavigate();
  //check user already loggedin or not
  const isAuthenticated = useAuth();
  console.log(isAuthenticated);
  // If the user is already logged in, redirect to the previous page
  if (isAuthenticated) {
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
      console.log("error");
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
        setMsg("Something went wrong while registering user");
        return;
      } else if (res?.status === 201) {
        setError(false);
        setMsg("User registered successfully");
        // if success then clean all the data then redirect
        if (res?.status === 200) {
          navigate("/");
        }
      }
      console.log(res);
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
  );
}
