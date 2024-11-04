import React, { useState } from "react";
import "./package.css";
import handleClassPayment from "../../../handler/handleClassPayment";
export default function Package({
  mentorId,
  shortClassPrice,
  monthlyClassPrice,
}) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [error, setError] = useState(null);
  const handleClassSelection = (classType) => {
    setSelectedClass(classType);
    // console.log(selectedClass);
  };
  //handle class booking
  const handleClassBooking = () => {
    handleClassPayment(mentorId, selectedClass);
  };
  return (
    <div className="learnerby-mentor-package">
      <div
        className="learnerby-mentor-package-short-topic-class"
        onClick={() => handleClassSelection("short")}
      >
        <div className="book-class-header">
          <div className="book-class-title">Book a short class</div>
          <div className="book-class-sub-title">Help with the short topics</div>
        </div>
        <div className="book-class-section">
          <div className="book-class-section-icon-details">
            <i
              class="fa-solid fa-calendar-days"
              style={{ fontSize: "2.5vw", marginRight: "10px" }}
            ></i>

            <span>Upto 1 hour class</span>
          </div>
          <div className="book-class-section-pay">
            <span className="money">₹{shortClassPrice}</span>
            <i class="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
      <div
        className="learnerby-mentor-package-monthly-class"
        onClick={() => handleClassSelection("monthly")}
      >
        <div className="book-class-header">
          <div className="book-class-title">Book class for a month</div>
          <div className="book-class-sub-title">
            Help with the monthly class
          </div>
        </div>
        <div className="book-class-section">
          <div className="book-class-section-icon-details">
            <i
              class="fa-solid fa-calendar-days"
              style={{ fontSize: "2.5vw", marginRight: "10px" }}
            ></i>

            <span>30 minutes class</span>
          </div>
          <div className="book-class-section-pay">
            <span className="money">₹{monthlyClassPrice}</span>
            <i class="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
