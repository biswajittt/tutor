import React, { useState } from "react";
import "./navbarsearchinput.css";
import { useNavigate } from "react-router-dom";
export default function NavBarSearchInput({ newWidth, newHeight, classname }) {
  const navigate = useNavigate();
  //store search data
  const [searchData, setSearchData] = useState("");
  function onSubmit(event) {
    event.preventDefault();
    if (searchData.trim() !== "") {
      setSearchData(searchData.trim());
      // navigate(`/search?query=${searchData}`);
      navigate(`/search?query=${encodeURIComponent(searchData)}`);
      // console.log(searchData.trim());
    }
  }
  return (
    <form
      className={`navbar-search-input-form ${classname}`}
      style={{ width: newWidth, height: newHeight }}
      onSubmit={onSubmit}
    >
      <button>
        <svg
          width="17"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <input
        className="navbar-search-input-form-input"
        placeholder="Search your book"
        required=""
        type="text"
        onChange={(event) => {
          setSearchData(event.target.value);
        }}
      />
      <button className="reset" type="reset">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </form>
  );
}
