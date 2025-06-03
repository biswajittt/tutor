import React, { useState, useEffect } from "react";
import img from "../../section.png";
import AuthButton from "../../../Utilities/AuthButton/AuthButton";
import "../mentorauth.css";
import validateMentorSignindata from "../../../../validation/validateMentorSignindata";
import handleMentorLogin from "../../../../handler/handleMentorLogin";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../handler/useAuth.js";
export default function MentorSignin() {
  const navigate = useNavigate();
  //check user already loggedin or not
  const { isAuthenticated } = useAuth();
  // If the user is already logged in, redirect to the previous page
  useEffect(() => {
    // Navigate to the home page if the user is authenticated
    if (isAuthenticated) {
      navigate("/"); // Safely navigate after rendering
    }
  }, [isAuthenticated, navigate]); // Depend on isLoggedIn and navigate

  //state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  //handle form submit
  const onFormSubmit = async (event) => {
    event.preventDefault();
    //on submit set loading
    setLoading(true);
    //go for data validation
    const validation = validateMentorSignindata(email, password);
    if (validation === false) {
      //show error
      setError(true);
      setMsg("Please fill the data carefully");
      //set loading false
      setLoading(false);
      return false;
    } else {
      // send the data to server and set loading true
      setLoading(true);
      const res = await handleMentorLogin(email, password);
      console.log(res);
      setLoading(false);
      // console.log(res);
      if (res?.status === 200) {
        //no error
        setError(false);
        setMsg("User logged in successfully");
        navigate("/");
      } else if (res?.status === 400) {
        // error
        setError(true);
        setMsg("Email Id required");
      } else if (res?.status === 404) {
        // error
        setError(true);
        setMsg("User does not exist");
      } else if (res?.status === 401) {
        // error
        setError(true);
        setMsg("Invalid user credentials");
      }
    }
  };

  return (
    // <div className="learnerby-auth">
    //   <div className="learnerby-auth-left">
    //     <img src={img} alt="" />
    //   </div>
    //   <div className="learnerby-auth-right">
    //     <div className="learnerby-auth-right-header">
    //       <div className="learnerby-auth-right-header-logo">Learnerby</div>
    //       <div className="learnerby-auth-right-header-btn">Login</div>
    //     </div>
    //     <div className="learnerby-auth-right-form-container">
    //       {msg.length > 1 ? (
    //         <div
    //           className="auth-response"
    //           style={{ color: `${error ? "Red" : "#00e409"}` }}
    //         >
    //           {msg}
    //         </div>
    //       ) : null}
    //       <div className="auth-group">
    //         <i className="fa-solid fa-envelope icon"></i>
    //         <input
    //           className="auth-input"
    //           type="email"
    //           placeholder="Email"
    //           onChange={(e) => {
    //             setEmail(e.target.value);
    //           }}
    //         />
    //       </div>
    //       <div className="auth-group">
    //         <i className="fa-solid fa-lock icon"></i>
    //         <input
    //           className="auth-input"
    //           type="password"
    //           placeholder="Password"
    //           onChange={(e) => {
    //             setPassword(e.target.value);
    //           }}
    //         />
    //       </div>
    //       <div
    //         className="auth-group"
    //         style={{ justifyContent: "center" }}
    //         onClick={onSubmit}
    //       >
    //         <AuthButton title={loading ? "Loading" : "Login"} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section class="flex bg-white">
      <div className="learnerby-auth-left  flex flex-col justify-center items-center">
        <img src={img} alt="" />
        <div class="inline-flex rounded-md shadow-xs mt-8 border" role="group">
          <button
            type="button"
            class="mr-8 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-solid border-gray-900 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  "
            onClick={() => navigate("/auth/mentor/registration")}
          >
            <i class="fa-solid fa-user-plus mr-4"></i>
            Join
          </button>
          <button
            type="button"
            class="ml-8 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-solid rounded-r-lg border-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
            onClick={() => navigate("/")}
          >
            <i class="fa-solid fa-house-user mr-4"></i>
            Home
          </button>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Learnerby
        </a>
        <div class="w-[33vw] bg-white rounded-lg shadow border md:mt-0 xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={onFormSubmit}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Email"
                  required=""
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div class="flex justify-center">
                <button class=" relative flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    {loading ? "Loading" : "Login"}
                  </span>
                </button>
              </div>

              <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <button
                  class="text-blue-700 hover:text-blue-500"
                  onClick={() => navigate("/auth/mentor/registration")}
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" action="#">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div class="flex items-start">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="#"
                class="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </form>
        </div> */}
      </div>
    </section>
  );
}
