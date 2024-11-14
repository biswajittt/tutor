import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing, Book, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";
import "./mentor.css";
import NavBar from "../Navbar/Navbar";
import Package from "./Package/Package";
import { useParams } from "react-router-dom";
import fetchingMentorDetailsByIdHandler from "../../handler/fetching/fetchingMentorDetailsByIdHandler";
export default function Mentor() {
  const { mentorId } = useParams(); // Get the mentor ID from the URL
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mentorDetails, setMentorDetails] = useState(null);

  //fetch mentor detials
  const getMentorDetails = async () => {
    const res = await fetchingMentorDetailsByIdHandler(mentorId);
    setShowLoading(false);
    // if successfull store mentor detials
    if (res?.status === 200) {
      setMentorDetails(res.data?.data);
      console.log(res.data?.data);
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
  return (
    // <>
    //   <NavBar />
    //   {showLoading && mentorDetails === null ? (
    //     "Loading"
    //   ) : (
    //     <div className="learnerby-mentor">
    //       <div className="learnerby-mentor-left">
    //         <div className="learnerby-mentor-left-header-section">
    //           <img
    //             src={mentorDetails.mentorImage}
    //             alt=""
    //             className="learnerby-mentor-left-header-section-mentor-logo"
    //           />
    //           <div className="learnerby-mentor-left-header-section-mentor-name">
    //             {mentorDetails.name}
    //           </div>
    //           <div className="learnerby-mentor-left-header-section-mentor-gender-age">
    //             Male . 30 years
    //           </div>
    //           <div className="learnerby-mentor-left-header-section-mentor-contact-list"></div>
    //         </div>
    //         <div className="learnerby-mentor-vertical-line"></div>
    //         <div className="learnerby-mentor-left-mentor-about">
    //           <div className="about-title"> About</div>
    //           <div className="about">{mentorDetails.aboutYou}</div>
    //         </div>
    //         <div className="learnerby-mentor-vertical-line"></div>
    //         <div className="learnerby-mentor-left-mode-of-class-section">
    //           <div>Mode of Class</div>
    //           <div className="learnerby-mentor-left-mode-of-class">
    //             {mentorDetails.mode === "both" ? (
    //               <>
    //                 <p>Offline</p> <p>Online</p>
    //               </>
    //             ) : (
    //               mentorDetails.mode
    //             )}
    //           </div>
    //         </div>
    //         <div className="learnerby-mentor-vertical-line"></div>
    //         <div className="learnerby-mentor-left-specialization-section">
    //           <div>Expertise</div>
    //           <div className="learnerby-mentor-left-specializations">
    //             {mentorDetails.expertise.map((data, index) => (
    //               <p key={index}>{data}</p>
    //             ))}
    //           </div>
    //         </div>
    //         <div className="learnerby-mentor-left-rating-review-section">
    //           <div className="rating-review-text">Community</div>
    //           <div className="rating-review">
    //             <div className="rating-review-taught-student">
    //               <i class="fa-solid fa-user-group"></i>{" "}
    //               <span style={{ color: "black" }}>1k+ Students</span>
    //             </div>
    //             <div className="rating-review-ratings">
    //               <i class="fa-solid fa-star"></i>{" "}
    //               <span style={{ color: "black" }}>560 Ratings</span>
    //             </div>
    //             <div className="rating-review-reviews">
    //               <i class="fa-solid fa-comments"></i>{" "}
    //               <span style={{ color: "black" }}> 340 Reviews</span>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="learnerby-mentor-vertical-line"></div>
    //       </div>
    //       <div className="learnerby-mentor-right">
    //         <Package
    //           mentorId={mentorDetails._id}
    //           shortClassPrice={mentorDetails.shortClassPrice}
    //           monthlyClassPrice={mentorDetails.monthlyClassPrice}
    //         />
    //       </div>
    //     </div>
    //   )}
    // </>
    <>
      <NavBar />
      <div class="flex justify-center mt-20 relative">
        <ScrollArea className="fixed">
          <Card>
            <CardContent>
              <div class="flex items-center p-3 w-96 h-28 bg-white rounded-md shadow-lg">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={mentorDetails?.mentorImage} alt="@shadcn" />
                  <AvatarFallback>Learnerby</AvatarFallback>
                </Avatar>

                <section class="block border-l border-gray-300 m-3">
                  <div class="pl-3">
                    <h3 class="text-gray-600 font-semibold text-xl">
                      {mentorDetails?.name}
                    </h3>
                    {/* <p class="">
                      <i class="fa-solid fa-chalkboard-user"></i>{" "}
                      <span>Mode:</span>
                      <span>{mentorDetails?.mode}</span>
                    </p> */}
                    <p class="mt-1">
                      <i class="fa-solid fa-location-dot mr-1"></i>
                      <span className="mr-1">Location:</span>
                      <span>{mentorDetails?.location}</span>
                    </p>
                  </div>
                  {/* <div class="flex gap-3 pt-2 pl-3">
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                        <svg
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                        >
                          <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                        </svg>
                      </div> */}
                </section>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div class="flex flex-col gap-1 justify-center w-96 items-start w-[280px] bg-white dark:bg-transparent px-4 py-4 shadow-xl rounded-lg">
                <p class="font-semibold text-xl text-gray-600 mb-2">About</p>
                <div class="flex flex-wrap gap-2">
                  {mentorDetails?.aboutYou}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div class="flex flex-col gap-1 w-96  justify-center items-start w-[280px] bg-white dark:bg-transparent px-4 py-4 shadow-xl rounded-lg">
                <p class="font-semibold text-xl text-gray-600 mb-2">Contacts</p>
                <div className="flex flex-col gap-2">
                  <p class="px-3 py-1 text-[12px] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3]">
                    <i class="fa-solid fa-phone mr-2"></i>
                    <span>{mentorDetails?.phoneNumber}</span>
                  </p>
                  <p class="px-3 py-1 text-[12px] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3]">
                    <i class="fa-solid fa-envelope mr-2"></i>
                    <span>{mentorDetails?.email}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div class="flex flex-col gap-1 w-96  justify-center items-start w-[280px] bg-white dark:bg-transparent px-4 py-4 shadow-xl rounded-lg">
                <p class="font-semibold text-xl text-gray-600 mb-2">
                  Expertise
                </p>
                <div class="flex flex-wrap gap-2">
                  <div class="flex flex-wrap -mx-1">
                    <div class="px-2 py-1 m-0.5 border border-solid border-black bg-white/10 rounded-full text-xs font-medium  shadow-sm transition-all duration-300 hover:bg-white/20">
                      Real-time Sync
                    </div>
                    <div class="px-2 py-1 m-0.5 border border-solid border-black bg-white/10 rounded-full text-xs font-medium  shadow-sm transition-all duration-300 hover:bg-white/20">
                      Real-time Sync
                    </div>
                    <div class="px-2 py-1 m-0.5 border border-solid border-black bg-white/10 rounded-full text-xs font-medium  shadow-sm transition-all duration-300 hover:bg-white/20">
                      Real-time Sync
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent>
              <div class="flex flex-col gap-1 w-96  justify-center items-start w-[280px] bg-white dark:bg-transparent px-4 py-4 shadow-xl rounded-lg">
                <p class="font-semibold text-xl text-gray-600 mb-2">
                  Additional Information
                </p>
                <div class="flex flex-wrap gap-2">
                  <div class="">
                    <Card className="border-solid">
                      <CardContent className="grid gap-4">
                        <div className=" flex items-center space-x-4 rounded-md border p-4">
                          <Book className="w-12 h-12" />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Short Time Class
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {mentorDetails?.shortClassPrice}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </ScrollArea>
        {/* <ScrollArea className="">
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
                <Button className="w-full">
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
                <Button className="w-full">
                  <Check /> Book Monthly Class
                </Button>
              </CardFooter>
            </Card>
          </div>
        </ScrollArea> */}
      </div>
    </>
  );
}
