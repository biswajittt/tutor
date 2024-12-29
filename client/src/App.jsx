import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppFooter from "./components/Footer/AppFooter";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { clickedOnJoinButton } from "./features/joinModal/joinModalSlice";

function App() {
  const navigate = useNavigate();
  const openModal = useSelector((state) => state.joinModal.showJoinModal);
  //using redux -- dispatch
  // console.log(openModal);
  const dispatch = useDispatch();
  //close join modal
  const joinModalHandler = () => {
    dispatch(clickedOnJoinButton(false));
  };
  return (
    <>
      {openModal === true ? (
        /* From Uiverse.io by ilkhoeri */
        <div class="fixed  m-auto z-50 left-0 right-0 top-1/4 [--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 h-auto rounded-2xl bg-white [box-shadow:var(--shadow)] max-w-[300px]">
          {/* <div className="flex absolute z-100 right-0 mr-4 mt-1">class</div> */}
          <i
            class="fa-solid fa-x absolute z-50 right-0 mr-4 mt-3 cursor-pointer"
            onClick={() => {
              joinModalHandler();
            }}
          ></i>
          <div class="flex flex-col items-center justify-between pt-9 px-6 pb-6 relative">
            <span class="relative mx-auto -mt-16 mb-4">
              <i class="fa-solid fa-book text-5xl text-indigo-700"></i>
            </span>

            <h5 class="text-sm font-semibold mb-2 text-left mr-auto text-zinc-700">
              Your privacy is important to us
            </h5>

            <p class="w-full mb-4 text-sm text-justify">
              We process your personal information to measure and improve our
              sites and services.
            </p>

            <p className="text-lg font-bold mb-4 text-zinc-600 ">Join Us</p>

            <div className="flex justify-around">
              <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span
                  class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                  onClick={() => {
                    navigate("auth/student/registration");
                    dispatch(clickedOnJoinButton(false));
                  }}
                >
                  Student
                </span>
              </button>
              <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span
                  class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                  onClick={() => {
                    navigate("auth/mentor/registration");
                    dispatch(clickedOnJoinButton(false));
                  }}
                >
                  Mentor
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {/* <Navbar /> */}
      <Outlet />
      {/* <AppFooter /> */}
    </>
  );
}

export default App;
