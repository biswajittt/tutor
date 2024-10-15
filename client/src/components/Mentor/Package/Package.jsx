import React from "react";
import "./package.css";
export default function Package() {
  return (
    <div className="learnerby-mentor-package">
      <div className="learnerby-mentor-package-short-topic-class">
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

            <span>30 minutes class</span>
          </div>
          <div className="book-class-section-pay">
            <span className="money">₹50</span>
            <i class="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
      <div className="learnerby-mentor-package-monthly-class">
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
            <span className="money">₹3000</span>
            <i class="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
