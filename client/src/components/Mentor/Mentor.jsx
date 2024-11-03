import React, { useState, useEffect } from "react";
import "./mentor.css";
import NavBar from "../Navbar/Navbar";
import Package from "./Package/Package";
import { useParams } from "react-router-dom";
import fetchingMentorDetailsByIdHandler from "../../handler/fetching/fetchingMentorDetailsByIdHandler";
export default function Mentor() {
  const { mentorId } = useParams(); // Get the mentor ID from the URL
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mentorDetails, setMentorDetails] = useState(null);

  //fetch mentor detials
  const getMentorDetails = async () => {
    const res = await fetchingMentorDetailsByIdHandler(mentorId);
    setShowLoading(false);
    // if successfull store mentor detials
    if (res.status === 200) {
      setMentorDetails(res.data?.data);
    }
    console.log(res);
  };

  //fetch data on page load
  useEffect(() => {
    getMentorDetails();
  }, []);
  // mentorDetails.expertise.map((data) => {
  //   console.log(data);
  // });
  return (
    <>
      <NavBar />
      {showLoading && mentorDetails === null ? (
        "Loading"
      ) : (
        <div className="learnerby-mentor">
          <div className="learnerby-mentor-left">
            <div className="learnerby-mentor-left-header-section">
              <img
                src={mentorDetails.mentorImage}
                alt=""
                className="learnerby-mentor-left-header-section-mentor-logo"
              />
              <div className="learnerby-mentor-left-header-section-mentor-name">
                {mentorDetails.name}
              </div>
              <div className="learnerby-mentor-left-header-section-mentor-gender-age">
                Male . 30 years
              </div>
              <div className="learnerby-mentor-left-header-section-mentor-contact-list"></div>
            </div>
            <div className="learnerby-mentor-vertical-line"></div>
            <div className="learnerby-mentor-left-mentor-about">
              <div className="about-title"> About</div>
              <div className="about">{mentorDetails.aboutYou}</div>
            </div>
            <div className="learnerby-mentor-vertical-line"></div>
            <div className="learnerby-mentor-left-mode-of-class-section">
              <div>Mode of Class</div>
              <div className="learnerby-mentor-left-mode-of-class">
                {mentorDetails.mode === "both" ? (
                  <>
                    <p>Offline</p> <p>Online</p>
                  </>
                ) : (
                  mentorDetails.mode
                )}
              </div>
            </div>
            <div className="learnerby-mentor-vertical-line"></div>
            <div className="learnerby-mentor-left-specialization-section">
              <div>Expertise</div>
              <div className="learnerby-mentor-left-specializations">
                {mentorDetails.expertise.map((data, index) => (
                  <p key={index}>{data}</p>
                ))}
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
            <Package
              mentorId={mentorDetails._id}
              shortClassPrice={mentorDetails.shortClassPrice}
              monthlyClassPrice={mentorDetails.monthlyClassPrice}
            />
          </div>
        </div>
      )}
    </>
  );
}
