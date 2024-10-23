import React, { useState } from "react";
import "./navbar.css";
import MenuToggleButton from "../Utilities/MenuToggleButton/MenuToggleButton.jsx";
import NavBarSearchInput from "../Utilities/NavBarSearchInput/NavBarSearchInput.jsx";

import { Link, NavLink } from "react-router-dom";
import useAuth from "../../handler/useAuth.js";

export default function NavBar() {
  //check authenticated or not
  const isAuthenticated = useAuth();
  // console.log(isAuthenticated);
  return (
    <div className="bookmark-navbar">
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
          {
            /* if authenticated show logout else show join */
            isAuthenticated ? (
              "Logout"
            ) : (
              <Link to="/auth/registration">Join</Link>
            )
          }
        </ul>
      </div>
    </div>
  );
}
