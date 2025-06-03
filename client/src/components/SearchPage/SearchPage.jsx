import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./searchpage.css";
import NavBar from "../Navbar/Navbar";
import p1 from "./p1.jpg";
import { useState, useEffect } from "react";
import handleSearchResult from "../../handler/handleSearchResults";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import NavBarSearchInput from "../Utilities/NavBarSearchInput/NavBarSearchInput";

export default function SearchPage() {
  const navigate = useNavigate();
  // Use the useLocation hook to get the location object
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [searchTerm, setSearchTerm] = useState(query); // search term from URL
  const [mentorData, setMentorData] = useState([]); // mentor data
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state
  const [previousSearchTerm, setPreviousSearchTerm] = useState("");
  // Function to fetch search results
  const getSearchResult = async (searchquery) => {
    if (previousSearchTerm === searchquery) return;
    setPreviousSearchTerm(searchquery);
    try {
      setLoading(true);
      setError(null); // Reset any previous errors

      const res = await handleSearchResult(searchquery);
      console.log(res);
      if (res?.statusCode?.statusCode === 200) {
        setMentorData(res.data);
      } else if (res?.statusCode?.statusCode === 404) {
        setMentorData(null);
      } else if (res?.statusCode?.statusCode === 400) {
        setError("Enter Subject Name");
        setMentorData(null);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      setError("Facing some issue while fetching data");
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  //get the search term on search page load
  useEffect(() => {
    if (searchTerm) {
      getSearchResult(searchTerm);
    }
  }, [query]);

  //
  const showMentorProfile = (mentorId) => {
    if (!mentorId) return;
    navigate(`/mentor/${mentorId}`);
  };

  return (
    <>
      <NavBar />
      <div className="mb-8 mt-24">
        <NavBarSearchInput onChange={getSearchResult} />
      </div>
      <ScrollArea className="h-screen  rounded-md border">
        {loading ? (
          <div className="flex justify-center items-center text-xl text-blue-600">
            Loading mentors...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center text-xl text-red-600">
            {error}
          </div>
        ) : mentorData === null || mentorData.length === 0 ? (
          <div className="flex justify-center items-center text-xl text-gray-500">
            Nothing to show
          </div>
        ) : (
          mentorData.map((data, index) => (
            <div
              key={data?._id}
              class="cursor-pointer flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6 mx-auto"
              onClick={() => {
                showMentorProfile(data?._id);
              }}
            >
              <div class="flex items-center gap-4 text-slate-800">
                <img
                  src={data?.mentorImage}
                  alt="Tania Andrew"
                  class="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div class="flex w-full flex-col">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xl font-semibold text-slate-800 ">
                      {data?.name}
                    </h5>
                    {/* <div class="flex items-center bg-cyan-200 rounded-full py-1 px-2 font-bold text-xs">
                      {data?.location}
                    </div> */}
                    {/* <div class="flex items-center gap-0 5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div> */}
                  </div>
                  <p class="text-xs uppercase font-bold text-slate-500 mt-1">
                    {data?.location}
                  </p>
                </div>
              </div>

              <div class="mt-6">
                <p class="text-base text-slate-600 font-light leading-normal">
                  &quot;{data?.aboutYou}&quot;
                </p>
              </div>

              <div className="mt-6">
                <div className="flex justify-between">
                  <div className="font-bold">
                    Fee:{" "}
                    <span className="bg-emerald-500 rounded-full py-1 px-2 ">
                      {data?.shortClassPrice}₹
                    </span>
                  </div>
                  <div className="font-bold">
                    Mode:{" "}
                    <span className="bg-orange-300 rounded-full py-1 px-2">
                      {data?.mode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </>
  );
}
