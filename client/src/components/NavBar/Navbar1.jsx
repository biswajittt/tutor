import React, { useState, useEffect } from "react";
import "./navbar.css";
import MenuToggleButton from "../Utilities/MenuToggleButton/MenuToggleButton.jsx";
import NavBarSearchInput from "../Utilities/NavBarSearchInput/NavBarSearchInput.jsx";

import { Link, NavLink } from "react-router-dom";
import useAuth from "../../handler/useAuth.js";
import StudentProfileLogo from "../Utilities/StudentProfileLogo/StudentProfileLogo.jsx";

export default function NavBar() {
  const [navbarColor, setNavbarColor] = useState("transparent");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Check if scroll position is greater than a certain value (e.g., 50px)
      if (window.scrollY > 50) {
        setNavbarColor("rgb(253 253 253)"); // Change to desired color
      } else {
        setNavbarColor("transparent"); // Initial color
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //check authenticated or not
  const { isAuthenticated, user } = useAuth();
  // console.log(user);

  //state variables
  const [clickedOnJoinButton, setClickedOnjoinButton] = useState(false);
  //after some time hide the join card if join btn clicked
  useEffect(() => {
    if (clickedOnJoinButton) {
      setTimeout(() => {
        setClickedOnjoinButton(false);
      }, 5000);
    }
  }, [clickedOnJoinButton]);

  return (
    <div className="bookmark-navbar" style={{ backgroundColor: navbarColor }}>
      <MenuToggleButton className="bookmark-navbar-menu-btn" />
      <nav className="bookmark-navbar-left">
        <ul className="bookmark-navbar-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "active" : "not-active"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>About</li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `${isActive ? "active" : "not-active"}`
              }
            >
              Search
            </NavLink>
          </li>
          <li>Store</li>
          <li>Blog</li>
        </ul>
      </nav>
      <div className="bookmark-navbar-middle">BookMark</div>
      <div className="bookmark-navbar-right">
        <ul className="bookmark-navbar-list">
          <li>
            <NavBarSearchInput newWidth="200px" newHeight="40px" />
          </li>
          {/* /* if authenticated show logout else show join */}
          <li>
            {isAuthenticated ? (
              <div className="bookmark-navbar-list-user-dropdown">
                <button
                  onClick={() => {
                    setShowUserDropdown(true);
                  }}
                >
                  {/* if mentor image existe this show mentor image else --> it is student -- show student name */}
                  {user.mentorImage ? (
                    <img
                      src={user.mentorImage}
                      alt=""
                      style={{ width: "39px", borderRadius: "50%" }}
                    />
                  ) : (
                    <StudentProfileLogo fullName={user?.name} />
                  )}
                </button>
                <div
                  className="bookmark-navbar-list-user-dropdown-content"
                  style={
                    showUserDropdown
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <a href="#home">Home</a>
                  <a href="#about">About</a>
                  <a href="#contact">Contact</a>
                </div>
              </div>
            ) : (
              <div
                className="learnerby-navbar-right-join"
                onClick={() => {
                  setClickedOnjoinButton(true);
                }}
              >
                <div className="learnerby-navbar-right-join-btn">
                  Join
                  {clickedOnJoinButton ? (
                    <div className="learnerby-navbar-right-mentor-student-join-card">
                      <span className="learnerby-navbar-right-mentor-student-join-card-mentor-btn">
                        <Link to="/auth/mentor/registration">Mentor</Link>
                      </span>
                      <span className="learnerby-navbar-right-mentor-student-join-card-student-btn">
                        <Link to="/auth/mentor/registration">Student</Link>
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
