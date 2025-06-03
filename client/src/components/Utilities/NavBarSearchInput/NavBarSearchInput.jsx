import React, { useState } from "react";
import "./navbarsearchinput.css";
import { useNavigate } from "react-router-dom";
export default function NavBarSearchInput({
  newWidth,
  newHeight,
  classname,
  onChange,
}) {
  const navigate = useNavigate();
  //store search data
  const [searchData, setSearchData] = useState("");
  function onSubmit(event) {
    event.preventDefault();
    if (searchData.trim() !== "") {
      setSearchData(searchData.trim());
      // navigate(`/search?query=${searchData}`);
      // navigate(`/search?query=${encodeURIComponent(searchData)}`);
      // console.log(encodeURIComponent(searchData));
      onChange(searchData.trim());
    }
  }
  return (
    <form
      className={`max-w-lg mx-auto ${classname}`}
      style={{ width: newWidth, height: newHeight }}
      onSubmit={onSubmit}
    >
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="min-w-80 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 from-purple-600 to-blue-500 w-56"
          placeholder="Search..."
          required
          style={{ width: "32rem" }}
          onChange={(event) => {
            setSearchData(event.target.value);
          }}
        />
        <button
          type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
