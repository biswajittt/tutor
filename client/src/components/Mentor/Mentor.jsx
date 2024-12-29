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
  // mentor message box handler from redux
  const openMessageBox = useSelector(
    (state) => state.mentorMessageBox.showMentorMessageBox
  );
  console.log(openMessageBox);
  const mentorMessageBoxHandler = (event) => {
    //if other modal are opne then close them first
    dispatch(clickedOnJoinButton(false));
    //then show mentor box
    dispatch(clickedOnMentorMessageButton(true));
  };
  /*redux end*/

  const navigate = useNavigate();
  const { mentorId } = useParams(); // Get the mentor ID from the URL
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mentorDetails, setMentorDetails] = useState(null);
  const [shortClass, setShortClass] = useState({});
  const [monthlyClass, setMonthlyClass] = useState({});
  //fetch mentor detials
  const getMentorDetails = async () => {
    const res = await fetchingMentorDetailsByIdHandler(mentorId);
    setShowLoading(false);
    // if successfull store mentor detials
    if (res?.status === 200) {
      setMentorDetails(res.data?.data?.mentorDetails);
      setShortClass(res.data?.data?.shortClass);
      setMonthlyClass(res.data?.data?.monthlyClass);
      // console.log(shortClass);
    }
    // console.log(res);
  };

  //fetch data on page load
  useEffect(() => {
    getMentorDetails();
  }, []);
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

  return (
    <>
      {openMessageBox === true ? <MessageBox /> : null}
      <NavBar />
      <div className="flex justify-start mt-20">
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
                    {/* <p className="">
                      <i className="fa-solid fa-chalkboard-user"></i>{" "}
                      <span>Mode:</span>
                      <span>{mentorDetails?.mode}</span>
                    </p> */}
                    <p className="mt-1">
                      <i className="fa-solid fa-location-dot mr-1"></i>
                      <span className="mr-1">Location:</span>
                      <span>{mentorDetails?.location}</span>
                    </p>
                  </div>

                  {/* <div className="flex gap-3 pt-2 pl-3">
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                        >
                          <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                        </svg>
                      </div> */}
                </section>
                <button
                  type="button"
                  class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-400 border-solid focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                  onClick={() => {
                    mentorMessageBoxHandler();
                  }}
                >
                  Message
                </button>
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
      </div>
    </>
  );
}
