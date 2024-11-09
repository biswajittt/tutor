import React, { useState, useEffect } from "react";
import img from "../../section.jpg";
import AuthButton from "../../../Utilities/AuthButton/AuthButton";
import "../mentorauth.css";
import validateMentorSignindata from "../../../../validation/validateMentorSignindata";
import handleMentorLogin from "../../../../handler/handleMentorLogin";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../handler/useAuth.js";
export default function MentorSignin() {
  const navigate = useNavigate();
  //check user already loggedin or not
  const { isAuthenticated } = useAuth();
  // If the user is already logged in, redirect to the previous page
  useEffect(() => {
    // Navigate to the home page if the user is authenticated
    if (isAuthenticated) {
      navigate("/"); // Safely navigate after rendering
    }
  }, [isAuthenticated, navigate]); // Depend on isLoggedIn and navigate

  //state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  //handle form submit
  const onSubmit = async () => {
    //on submit set loading
    setLoading(true);
    //go for data validation
    const validation = validateMentorSignindata(email, password);
    if (validation === false) {
      //show error
      setError(true);
      setMsg("Please fill the data carefully");
      //set loading false
      setLoading(false);
      return false;
    } else {
      // send the data to server and set loading true
      setLoading(true);
      const res = await handleMentorLogin(email, password);
      setLoading(false);
      // console.log(res);
      if (res?.status === 200) {
        //no error
        setError(false);
        setMsg("User logged in successfully");
        navigate("/");
      } else if (res?.status === 400) {
        // error
        setError(true);
        setMsg("Email Id required");
      } else if (res?.status === 404) {
        // error
        setError(true);
        setMsg("User does not exist");
      } else if (res?.status === 401) {
        // error
        setError(true);
        setMsg("Invalid user credentials");
      }
    }
  };

  return (
    <div className="learnerby-auth">
      <div className="learnerby-auth-left">
        <img src={img} alt="" />
      </div>
      <div className="learnerby-auth-right">
        <div className="learnerby-auth-right-header">
          <div className="learnerby-auth-right-header-logo">Learnerby</div>
          <div className="learnerby-auth-right-header-btn">Login</div>
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
            <AuthButton title={loading ? "Loading" : "Login"} />
          </div>
        </div>
      </div>
    </div>
  );
}
