import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../handler/useAuth.js";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { clickedOnJoinButton } from "../../features/joinModal/joinModalSlice.js";
import { clickedOnMentorMessageButton } from "@/features/mentorMessageBox/mentorMessageBoxSlice.js";

export default function NavBar() {
  //check authenticated or not
  const { isAuthenticated, user } = useAuth();
  // console.log(user);
  //using redux -- dispatch
  const dispatch = useDispatch();
  const joinModalHandler = (event) => {
    //if other modal are opne then close them first
    dispatch(clickedOnMentorMessageButton(false));
    //then show mentor box
    dispatch(clickedOnJoinButton(true));
  };
  return (
    <Navbar className="fixed w-full z-20 top-0 start-0 pr-4 pl-4 pb-2 pt-2">
      <Navbar.Brand href="https://flowbite-react.com">
        {/* <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Learnerby
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isAuthenticated === true ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Biswajit Debnath</span>
                <span className="block truncate text-sm font-medium">
                  biswajit@gmail.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                {isAuthenticated && user?.expertise ? (
                  <Link to="mentor/dashboard">Dashboard</Link>
                ) : (
                  <Link to="student/dashboard">Dashboard</Link>
                )}
              </Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </>
        ) : (
          <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span
              className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              onClick={() => {
                joinModalHandler();
              }}
            >
              Join
            </span>
          </button>
        )}
      </div>
      <Navbar.Collapse>
        <Navbar.Link>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "active" : "text-slate-500"} font-bold`
            }
          >
            Home
          </NavLink>
        </Navbar.Link>
        <Navbar.Link href="#">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? "active" : "text-slate-500"} font-bold`
            }
          >
            About
          </NavLink>
        </Navbar.Link>
        <Navbar.Link href="#">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${isActive ? "active" : "text-slate-500"} font-bold`
            }
          >
            Services
          </NavLink>
        </Navbar.Link>
        <Navbar.Link href="#">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `${isActive ? "active" : "text-slate-500"} font-bold`
            }
          >
            Search
          </NavLink>
        </Navbar.Link>
        <Navbar.Link href="#">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? "active" : "text-slate-500"} font-bold`
            }
          >
            Contact
          </NavLink>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>

    // <nav class="bg-white border-gray-200 dark:bg-gray-900">
    //   <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <a
    //       href="https://flowbite.com/"
    //       class="flex items-center space-x-3 rtl:space-x-reverse"
    //     >
    //       <img
    //         src="https://flowbite.com/docs/images/logo.svg"
    //         class="h-8"
    //         alt="Flowbite Logo"
    //       />
    //       <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //         Flowbite
    //       </span>
    //     </a>

    //     <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    //       <Menu as="div" className="relative inline-block text-left">
    //         <div>
    //           <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
    //             Options
    //             <ChevronDownIcon
    //               aria-hidden="true"
    //               className="-mr-1 size-5 text-gray-400"
    //             />
    //           </MenuButton>
    //         </div>

    //         <MenuItems
    //           transition
    //           className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    //         >
    //           <div className="py-1">
    //             <MenuItem>
    //               <a
    //                 href="#"
    //                 className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
    //               >
    //                 Account settings
    //               </a>
    //             </MenuItem>
    //             <MenuItem>
    //               <a
    //                 href="#"
    //                 className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
    //               >
    //                 Support
    //               </a>
    //             </MenuItem>
    //             <MenuItem>
    //               <a
    //                 href="#"
    //                 className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
    //               >
    //                 License
    //               </a>
    //             </MenuItem>
    //             <form action="#" method="POST">
    //               <MenuItem>
    //                 <button
    //                   type="submit"
    //                   className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
    //                 >
    //                   Sign out
    //                 </button>
    //               </MenuItem>
    //             </form>
    //           </div>
    //         </MenuItems>
    //       </Menu>
    //       <button
    //         dataCollapseToggle="navbar-user"
    //         type="button"
    //         class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //         ariaControls="navbar-user"
    //         ariaExpanded="false"
    //       >
    //         <span class="sr-only">Open main menu</span>
    //         <svg
    //           class="w-5 h-5"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 17 14"
    //         >
    //           <path
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M1 1h15M1 7h15M1 13h15"
    //           />
    //         </svg>
    //       </button>
    //     </div>

    //     <div
    //       class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
    //       id="navbar-user"
    //     >
    //       <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //         <li>
    //           <a
    //             href="#"
    //             class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
    //             aria-current="page"
    //           >
    //             Home
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             About
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Services
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Pricing
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Contact
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}

{
  /* <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    Join
  </span>
</button>; */
}
