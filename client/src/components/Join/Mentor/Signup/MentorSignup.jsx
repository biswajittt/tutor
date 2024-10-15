import React from "react";
import "./mentorsignup.css";
import img from "../../section.jpg";
export default function MentorSignup() {
  return (
    <div className="learnerby-mentor-registration">
      <div className="learnerby-mentor-registration-left">
        <img src={img} alt="" />
      </div>
      <div className="learnerby-mentor-registration-right">
        <div className="learnerby-mentor-registration-right-form-container">
          <div class="auth-group">
            <input class="auth-input" type="password" placeholder="password" />
          </div>
        </div>
      </div>
    </div>
  );
}
