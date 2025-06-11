import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing, Book, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";
import "./mentor.css";
import NavBar from "../Navbar/Navbar";
import Package from "./Package/Package";
import { useNavigate, useParams } from "react-router-dom";
import fetchingMentorDetailsByIdHandler from "../../handler/fetching/fetchingMentorDetailsByIdHandler";
import Rating from "../Utilities/Rating/Rating";
import handleShortClassBooking from "@/handler/handleShortClassBooking";
import useAuth from "@/handler/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { clickedOnJoinButton } from "@/features/joinModal/joinModalSlice";
import { clickedOnMentorMessageButton } from "@/features/mentorMessageBox/mentorMessageBoxSlice";
import MessageBox from "./MessageBox/MessageBox";
import MentorReview from "./MentorReview";
import MentorAvailability from "./MentorAvailability";
import fetchingBookingDataByMentorAndStudent from "@/handler/handleFetchingBookingDataByMentorAndStudent";

//class deatails component
// function ClassDetails() {
//   return (
//     <div class="fixed p-4 m-auto z-50 left-0 right-0 top-1/4 [--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 h-auto rounded-2xl bg-white [box-shadow:var(--shadow)] max-w-[300px]">
//       <i
//         class="fa-solid fa-x absolute z-50 right-0 mr-4 mt-3 cursor-pointer"
//         onClick={() => {
//           mentorMessageBoxHandler();
//         }}
//       ></i>
//       <form>
//         <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
//           <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
//             <label for="comment" class="sr-only">
//               Your message
//             </label>
//             <textarea
//               id="comment"
//               rows="4"
//               class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
//               placeholder="Write a message..."
//               onChange={(event) => setMessage(event.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div class="flex items-center justify-center px-3 py-2 border-t dark:border-gray-600">
//             <button
//               onClick={() => mentorMessageFormHandler(event)}
//               type="submit"
//               class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
//             >
//               Message
//             </button>
//           </div>
//         </div>
//       </form>
//       <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">
//         Remember, message to a mentor should follow our{" "}
//         <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">
//           Community Guidelines
//         </a>
//         .
//       </p>
//     </div>
//   );
// }

export default function Mentor() {
  //check authenticated or not
  const { isAuthenticated, user } = useAuth();
  //using redux -- dispatch
  const dispatch = useDispatch();
  const joinModalHandler = (event) => {
    //if other modal are opne then close them first
    dispatch(clickedOnMentorMessageButton(false));
    //then show mentor box
    dispatch(clickedOnJoinButton(true));
  };
  // // mentor message box handler from redux
  // const openMessageBox = useSelector(
  //   (state) => state.mentorMessageBox.showMentorMessageBox
  // );
  // console.log(openMessageBox);
  // const mentorMessageBoxHandler = (event) => {
  //   //if other modal are opne then close them first
  //   dispatch(clickedOnJoinButton(false));
  //   //then show mentor box
  //   dispatch(clickedOnMentorMessageButton(true));
  // };
  /*redux end*/

  const navigate = useNavigate();
  const { mentorId } = useParams(); // Get the mentor ID from the URL
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mentorDetails, setMentorDetails] = useState(null);
  const [shortClass, setShortClass] = useState({});
  const [monthlyClass, setMonthlyClass] = useState({});
  const [showMentorAvailability, setShowMentorAvailability] = useState(false);
  const [studentHasActiveClass, setStudentHasActiveClass] = useState(-1); //-1 means not loggedin, 0 means not has any class, 1 mean has active class
  const [classDetails, setClassDetails] = useState({});
  const [subjects, setSubjects] = useState([]);
  //1. fetch mentor detials
  const getMentorDetails = async () => {
    setShowLoading(true);
    const res = await fetchingMentorDetailsByIdHandler(mentorId);
    // console.log(res.data?.data?.mentorDetails.subjects);
    setShowLoading(false);
    // if successfull store mentor detials
    if (res?.status === 200) {
      setMentorDetails(res.data?.data?.mentorDetails);
      setSubjects(res.data?.data?.mentorDetails?.subjects);
      setShortClass(res.data?.data?.shortClass);
      setMonthlyClass(res.data?.data?.monthlyClass);
      // console.log(shortClass);
    }
    // console.log(res);
  };
  //2. Get booking data by mentor and student id
  const getBookingDataByMentorAndStudent = async () => {
    // console.log(mentorId);
    const res = await fetchingBookingDataByMentorAndStudent(mentorId);
    if (res?.data?.statusCode === 404) {
      setStudentHasActiveClass(0);
    } else if (res?.data?.statusCode === 200) {
      setStudentHasActiveClass(1);
    }
    // console.log("data: ", res);
  };

  //1. fetch data on page load
  useEffect(() => {
    getMentorDetails();
  }, []);
  // console.log(subjects);
  //2. fetch data on page load
  useEffect(() => {
    if (isAuthenticated) {
      getBookingDataByMentorAndStudent();
    }
  }, [isAuthenticated]);

  // mentorDetails.expertise.map((data) => {
  //   console.log(data);
  // });

  //short class handler
  const shortClassHandler = async (mentorId) => {
    if (isAuthenticated === false) {
      console.log(mentorId);
      joinModalHandler();
    } else {
      navigate("/student/book-class/payment", {
        state: {
          mentorId: mentorId,
          classType: shortClass,
        },
      });
      const response = await handleShortClassBooking(mentorId);
      console.log(response);
    }
  };
  //monthly class handler
  const monthlyClassHandler = async (mentorId) => {
    console.log(mentorId);
  };

  //show mentor availability card
  const showMentorAvailabilityCardHandler = (value) => {
    setShowMentorAvailability(value);
  };
  // console.log("dsdsds", mentorDetails?.mode);
  return (
    <>
      {/* {openMessageBox === true ? <MessageBox /> : null} */}
      <NavBar />
      {/* <div className="flex justify-start mt-20">
        <div className="ml-10 ">
          <Card className="mb-2">
            <CardContent>
              <div className="flex items-center justify-between w-96 h-28 px-4 py-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={mentorDetails?.mentorImage} alt="@shadcn" />
                  <AvatarFallback>Learnerby</AvatarFallback>
                </Avatar>

                <section className="block border-l border-gray-300 m-3">
                  <div className="pl-3">
                    <h3 className="text-gray-600 font-semibold text-xl">
                      {mentorDetails?.name}
                    </h3>
                    <p className="mt-1">
                      <i className="fa-solid fa-location-dot mr-1"></i>
                      <span className="mr-1">Location:</span>
                      <span>{mentorDetails?.location}</span>
                    </p>
                  </div>

                  
                </section>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-2">
            <CardContent>
              <div className="flex flex-col gap-1 justify-center w-96 items-start dark:bg-transparent px-4 py-4">
                <p className="font-semibold text-xl text-gray-600 mb-2">
                  About
                </p>
                <div className="flex flex-wrap gap-2">
                  {mentorDetails?.aboutYou}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-2">
            <CardContent>
              <div className="flex flex-col gap-1 w-96  justify-center items-start  dark:bg-transparent px-4 py-4 ">
                <p className="font-semibold text-xl text-gray-600 mb-2">
                  Contacts
                </p>
                <div className="flex flex-col gap-2">
                  <p className="px-3 py-1 text-[12px] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3]">
                    <i className="fa-solid fa-phone mr-2"></i>
                    <span>{mentorDetails?.phoneNumber}</span>
                  </p>
                  <p className="px-3 py-1 text-[12px] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3]">
                    <i className="fa-solid fa-envelope mr-2"></i>
                    <span>{mentorDetails?.email}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardContent>
              <div className="flex flex-col gap-1 w-96  justify-center items-start dark:bg-transparent px-4 py-4">
                <p className="font-semibold text-xl text-gray-600 mb-2">
                  Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap -mx-1">
                    <div className="px-2 py-1 m-0.5 border border-solid border-black bg-white/10 rounded-full text-xs font-medium  shadow-sm transition-all duration-300 hover:bg-white/20">
                      Real-time Sync
                    </div>
                    <div className="px-2 py-1 m-0.5 border border-solid border-black bg-white/10 rounded-full text-xs font-medium  shadow-sm transition-all duration-300 hover:bg-white/20">
                      Real-time Sync
                    </div>
                    <div className="px-2 py-1 m-0.5 border border-solid border-black bg-white/10 rounded-full text-xs font-medium  shadow-sm transition-all duration-300 hover:bg-white/20">
                      Real-time Sync
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <ScrollArea
          className="mx-10 w-full rounded-md border"
          style={{ height: "88vh" }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <Card className="border-solid">
              <CardHeader>
                <CardTitle>Short Time Class</CardTitle>
                <CardDescription>
                  Can't understand a small topic
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <BellRing />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {mentorDetails?.shortClassPrice}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Book {mentorDetails?.name}'s short class
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    shortClassHandler(mentorDetails?._id);
                  }}
                >
                  <Check /> Book Short Class
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-solid">
              <CardHeader>
                <CardTitle>Monthly Class</CardTitle>
                <CardDescription>Can't understand a big topic</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <BellRing />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {mentorDetails?.monthlyClassPrice}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Book {mentorDetails?.name}'s monthly class
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    monthlyClassHandler(mentorDetails?._id);
                  }}
                >
                  <Check /> Book Monthly Class
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Feedback & rating</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col px-4 mb-4">
                    <Textarea
                      placeholder="Type your message here."
                      className="border-2 border-solid"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Rating />
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </ScrollArea>
      </div> */}
      {showLoading ? (
        "Loading.."
      ) : (
        <div className="mt-[60px]">
          <aside
            id="default-sidebar"
            class=" mt-[60px] fixed top-0 left-0 z-40 w-[23rem] h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul class="space-y-2 font-medium">
                <li>
                  <div class="bg-white flex max-w-sm p-8 border border-solid border-gray-200 rounded-lg shadow-sm ">
                    <div class="flex items-center gap-4">
                      <img
                        class="w-12 h-12 rounded-full"
                        src={mentorDetails?.mentorImage}
                        alt=""
                      />
                      <div class="font-medium dark:text-white">
                        <div>{mentorDetails?.name}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                          Joined{" "}
                          {new Date(
                            mentorDetails?.createdAt
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="bg-white flex max-w-sm p-6 border border-solid border-gray-200 rounded-lg shadow-sm ">
                    <div class="flex items-center gap-4">
                      <div class="font-medium dark:text-white">
                        <div>About</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                          {mentorDetails?.about}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="bg-white flex max-w-sm p-6 border border-solid border-gray-200 rounded-lg shadow-sm ">
                    <div class="flex items-center gap-4">
                      <div class="font-medium dark:text-white">
                        <div className="mb-2">Contact Details</div>
                        {studentHasActiveClass === 1 ? (
                          <>
                            <div class="text-sm text-gray-500 dark:text-gray-400  mb-[4px]">
                              Email{" "}
                              <span class="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-indigo-400 border border-solid border-indigo-400">
                                {mentorDetails?.email}
                              </span>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 mb-[4px]">
                              Number
                              <span class="ml-2 bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-purple-400 border border-solid border-purple-400">
                                {mentorDetails?.phoneNumber}
                              </span>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                              Location
                              <span class="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-yellow-300 border border-solid border-pink-400">
                                {mentorDetails?.location}
                              </span>
                            </div>
                          </>
                        ) : studentHasActiveClass === -1 ? (
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            Login to View Data
                          </div>
                        ) : (
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            Book Class to View
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="bg-white flex max-w-sm p-6 border border-solid border-gray-200 rounded-lg shadow-sm ">
                    <div class="flex items-center gap-4">
                      <div class="font-medium dark:text-white">
                        <div>Teaching Mode</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                          {mentorDetails?.mode}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="bg-white flex max-w-sm p-6 border border-solid border-gray-200 rounded-lg shadow-sm ">
                    <div class="flex items-center gap-4">
                      <div class="font-medium dark:text-white">
                        <div className="mb-2">Expertise</div>
                        <div className="flex flex-wrap gap-y-[7px]">
                          {mentorDetails?.subjects.map((subject, index) => {
                            const colors = [
                              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                              "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
                              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                              "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
                              "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
                              "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
                            ];

                            const colorClass = colors[index % colors.length]; // Cycle through colors

                            function capitalizeWords(str) {
                              return str
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ");
                            }

                            return (
                              <span
                                key={subject}
                                className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${colorClass}`}
                              >
                                {capitalizeWords(subject)}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          <div class="p-4 sm:ml-[23rem]">
            <div class="">
              <div className="flex justify-center gap-x-[20px]">
                <div class="group hover:shadow-xl flex flex-col h-[12rem] justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Can't understand a small topic?
                  </h5>
                  <div class="p-2 bg-gray-200 border border-solid border-gray-200 rounded-xl shadow-sm">
                    <div class="flex justify-between">
                      <div className="flex items-center gap-4">
                        <i class="text-2xl text-gray-500 group-hover:text-gray-800 fa-solid fa-calendar-days"></i>
                        <div class="font-medium dark:text-white">
                          <div className="text-base font-bold text-gray-900">
                            ₹ {mentorDetails?.shortClassPrice}
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            {mentorDetails?.shortClassDuration} mins
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="text-gray-900 group-hover:text-white group-hover:bg-gray-800 border border-solid border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                        onClick={() => {
                          setShowMentorAvailability(true);
                          setClassDetails({
                            classType: "short",
                            duration: mentorDetails?.shortClassDuration,
                            price: mentorDetails?.shortClassPrice,
                          });
                        }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
                <div class="group hover:shadow-xl flex flex-col h-[12rem] justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Want to book monthly class?
                  </h5>
                  <div class="p-2 bg-gray-200 border border-solid border-gray-200 rounded-xl shadow-sm">
                    <div class="flex justify-between">
                      <div className="flex items-center gap-4">
                        <i class="text-2xl text-gray-500 group-hover:text-gray-800 fa-solid fa-calendar-days"></i>
                        <div class="font-medium dark:text-white">
                          <div className="text-base font-bold text-gray-900">
                            ₹ {mentorDetails?.monthlyClassPrice}
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            {mentorDetails?.monthlyClassDuration} hours
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="text-gray-900 group-hover:text-white group-hover:bg-gray-800 border border-solid border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <MentorReview studentHasActiveClass={studentHasActiveClass} />
            </div>
          </div>

          {/* show mentor availability */}
          {showMentorAvailability && (
            <MentorAvailability
              onChangeShowCard={showMentorAvailabilityCardHandler}
              mentorId={mentorId}
              mentorAvailability={mentorDetails?.availability}
              classDetails={classDetails}
              offeredSubjects={subjects}
            />
          )}
        </div>
      )}
    </>
  );
}
