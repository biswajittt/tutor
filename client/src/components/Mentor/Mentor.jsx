import React from "react";
import "./mentor.css";
import NavBar from "../Navbar/Navbar";
import Package from "./Package/Package";
export default function Mentor() {
  return (
    <>
      <NavBar />
      <div className="learnerby-mentor">
        <div className="learnerby-mentor-left">
          <div className="learnerby-mentor-left-header-section">
            <img
              src=""
              alt=""
              className="learnerby-mentor-left-header-section-mentor-logo"
            />
            <div className="learnerby-mentor-left-header-section-mentor-name">
              Biswajit Debnath
            </div>
            <div className="learnerby-mentor-left-header-section-mentor-gender-age">
              Male . 30 years
            </div>
            <div className="learnerby-mentor-left-header-section-mentor-contact-list"></div>
          </div>
          <div className="learnerby-mentor-vertical-line"></div>
          <div className="learnerby-mentor-left-mentor-about">
            <div className="about-title"> About</div>
            <div className="about">
              Hi 🙌, I am Biswajit Debnath. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Ratione dolore ab reprehenderit
              repudiandae assumenda in incidunt consequuntur dolor sequi
              laborum, autem nostrum deleniti a odio obcaecati, voluptatum
              reiciendis? Pariatur, distinctio.
            </div>
          </div>
          <div className="learnerby-mentor-vertical-line"></div>
          <div className="learnerby-mentor-left-mode-of-class-section">
            <div>Mode of Class</div>
            <div className="learnerby-mentor-left-mode-of-class">
              <p>Offline</p> <p>Online</p>
            </div>
          </div>
          <div className="learnerby-mentor-vertical-line"></div>
          <div className="learnerby-mentor-left-specialization-section">
            <div>Expertise</div>
            <div className="learnerby-mentor-left-specializations">
              <p>Computer</p>
              <p>Data Structure</p>
              <p>Networking</p>
              <p>JavaScript</p>
            </div>
          </div>
          <div className="learnerby-mentor-left-rating-review-section">
            <div className="rating-review-text">Community</div>
            <div className="rating-review">
              <div className="rating-review-taught-student">
                <i class="fa-solid fa-user-group"></i>{" "}
                <span style={{ color: "black" }}>1k+ Students</span>
              </div>
              <div className="rating-review-ratings">
                <i class="fa-solid fa-star"></i>{" "}
                <span style={{ color: "black" }}>560 Ratings</span>
              </div>
              <div className="rating-review-reviews">
                <i class="fa-solid fa-comments"></i>{" "}
                <span style={{ color: "black" }}> 340 Reviews</span>
              </div>
            </div>
          </div>
          <div className="learnerby-mentor-vertical-line"></div>
        </div>
        <div className="learnerby-mentor-right">
          <Package />
        </div>
      </div>
    </>
  );
}
