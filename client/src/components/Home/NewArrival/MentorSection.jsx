import React, { useEffect, useState } from "react";
import "./home-mentor-section.css";
// import img1 from "./images/img1.webp";
// import img2 from "./images/img2.jpg";
// import img3 from "./images/img3.jpg";
// import img4 from "./images/img4.jpg";
// import img5 from "./images/img5.jpg";
import { useNavigate } from "react-router-dom";
import fetchingMentorsDataHandler from "../../../handler/fetching/fetchingMentorsDataHandler.js";
export default function MentorSection() {
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mentorsData, setMentorsData] = useState(null);
  //get the mentor details based on some criteria for the home screen
  const getMentorsData = async () => {
    const res = await fetchingMentorsDataHandler();
    //success
    if (res?.status === 200) {
      setShowLoading(false);
      setMentorsData(res.data.data);
    }
    // console.log(res);
  };

  //on page load fetch data
  useEffect(() => {
    getMentorsData();
  }, []);

  //on click on the mentor container -- redirect to mentor page
  const navigate = useNavigate();
  const onClickMentorContainer = (mentorId) => {
    navigate(`/mentor/${mentorId}`);
  };
  return (
    <div className="learnerby-home-mentor-section">
      <div className="learnerby-home-mentor-section-title">
        Explore Trending Mentors
      </div>
      <div className="learnerby-home-mentor-section-container">
        {showLoading
          ? "Loading"
          : mentorsData.length > 0
          ? mentorsData.map((mentor, index) => (
              <div
                className="learnerby-home-mentor-section-card"
                key={index}
                onClick={() => {
                  onClickMentorContainer(mentor._id);
                }}
              >
                <div className="learnerby-home-mentor-section-top">
                  <img
                    className="learnerby-home-mentor-section-top-img"
                    src={mentor.mentorImage}
                    alt=""
                  />
                </div>
                <div className="learnerby-home-mentor-section-bottom">
                  <div className="learnerby-home-mentor-section-bottom-rating-review">
                    <i className="star fa-solid fa-star"></i>
                    <span className="learnerby-home-mentor-section-bottom-rating-review-star-number">
                      5
                    </span>
                    <span className="learnerby-home-mentor-section-bottom-rating-review-reviews">
                      <span>150</span> reviews
                    </span>
                  </div>
                  <div className="learnerby-home-mentor-section-bottom-tagline">
                    {mentor.aboutYou}
                  </div>
                  <div className="learnerby-home-mentor-section-bottom-price">
                    ₹{mentor.shortClassPrice}rs/hr
                  </div>
                </div>
              </div>
            ))
          : "Error"}
      </div>
    </div>
  );
}
