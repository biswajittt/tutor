import React from "react";
import "../mentorauth.css";
import img from "../../section.jpg";
import AuthButton from "../../../Utilities/AuthButton/AuthButton";
import { useState } from "react";
import validateMentorSignupdata from "../../../../validation/validateMentorSignupData";
import { handleMentorRegistration } from "../../../../handler/handleMentorRegistration";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../handler/useAuth.js";
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
  const [expertise, setExpertise] = useState("");
  const [password, setPassword] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [shortClassPrice, setShortClassPrice] = useState("");
  const [monthlyClassPrice, setMonthlyClassPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
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
        expertise,
        parseFloat(shortClassPrice.trim()),
        monthlyClassPrice,
        password
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
      //convert the expertise into array
      const expertiseArray = expertise
        .split(",")
        .map((item) => item.trim())
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
      data.append("expertise", expertiseArray);
      data.append("shortClassPrice", parseFloat(shortClassPrice.trim()));
      data.append("monthlyClassPrice", parseFloat(monthlyClassPrice.trim()));
      data.append("password", password);
      const res = await handleMentorRegistration(
        // mentorImage,
        // name,
        // aboutYou,
        // email,
        // phoneNumber,
        // location,
        // mode,
        // expertise,
        // parseFloat(shortClassPrice.trim()),
        // parseFloat(monthlyClassPrice.trim()),
        // password
        data
      );
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
        return;
      }
      console.log(res);
    }

    console.log(
      typeof name,
      email,
      phoneNumber,
      location,
      mode,
      expertise,
      password
    );
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
            <div className="mentor-auth-profile-img">
              <div className="mentor-auth-profile-img-container">
                <form className="mentor-auth-profile-img-container-form">
                  <span className="mentor-auth-profile-img-container-form-title">
                    Upload your profile image
                  </span>
                  <p className="mentor-auth-profile-img-container-form-paragraph">
                    File should be an image
                  </p>
                  <label
                    htmlFor="file-input"
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
                      required=""
                      id="mentor-auth-profile-img-container-form-file-input"
                      onChange={(event) => {
                        setMentorImage(event.target.files[0]);
                      }}
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-user icon"></i>
            <input
              class="auth-input"
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-brain icon"></i>
            <textarea
              className="auth-input"
              placeholder="About You"
              onChange={(e) => {
                setAboutYou(e.target.value);
              }}
            ></textarea>
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-envelope icon"></i>
            <input
              class="auth-input"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-phone icon"></i>
            <input
              class="auth-input"
              type="tel"
              placeholder="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-location-dot icon"></i>
            <input
              class="auth-input"
              type="text"
              placeholder="Location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-chalkboard-user icon"></i>
            <select
              name=""
              id=""
              className="auth-input"
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
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-brain icon"></i>
            <textarea
              className="auth-input"
              placeholder="Add expertise seperated by comma"
              onChange={(e) => {
                setExpertise(e.target.value);
              }}
            ></textarea>
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-user icon"></i>
            <input
              class="auth-input"
              type="text"
              placeholder="Price for Short Class"
              onChange={(e) => {
                setShortClassPrice(e.target.value);
              }}
            />
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-user icon"></i>
            <input
              class="auth-input"
              type="text"
              placeholder="Price for Monthly Class"
              onChange={(e) => {
                setMonthlyClassPrice(e.target.value);
              }}
            />
          </div>
          <div class="auth-group">
            <i class="fa-solid fa-lock icon"></i>
            <input
              class="auth-input"
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
