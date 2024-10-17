import React from "react";
import "../mentorauth.css";
export default function MentorSignin() {
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
    if (!validateMentorSignupdata(email, password)) {
      setLoading(false);
      //show error
      setError(true);
      setMsg("Please fill the data carefully");
      console.log("error");
    } else {
      //send data to backend
      const res = await handleMentorRegistration(
        name,
        aboutYou,
        email,
        phone,
        location,
        mode,
        expertise,
        parseFloat(shortClassPrice.trim()),
        parseFloat(monthlyClassPrice.trim()),
        password
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

    console.log(typeof name, email, phone, location, mode, expertise, password);
  };
  return (
    <div className="learnerby-mentor-auth">
      <div className="learnerby-mentor-auth-left">
        <img src={img} alt="" />
      </div>
      <div className="learnerby-mentor-auth-right">
        <div className="learnerby-mentor-auth-right-header">
          <div className="learnerby-mentor-auth-right-header-logo">
            Learnerby
          </div>
          <div className="learnerby-mentor-auth-right-header-btn">Login</div>
        </div>
        <div className="learnerby-mentor-auth-right-form-container">
          {/* show this when any response is there */}
          {msg.length > 1 ? (
            <div
              className="auth-response"
              style={{ color: `${error ? "Red" : "#00e409"}` }}
            >
              {msg}
            </div>
          ) : null}
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
                setPhone(e.target.value);
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
