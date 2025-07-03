import React, { useState, useEffect } from "react";
import useAuth from "../../../../handler/useAuth.js";
import fetchingBookingsByStudentId from "@/handler/fetching/fetchingBookingsByStudentId.js";
export default function BookingandClasses() {
  const { isAuthenticated, user } = useAuth();
  // console.log(user);
  const [activeClassData, setActiveClassData] = useState(null);
  const [completedClassData, setCompletedClassData] = useState(null);
  const fetchBookings = async () => {
    const res = await fetchingBookingsByStudentId();
    console.log(res?.data?.data);
    setActiveClassData(res?.data?.data?.activeOrUpcomingBookings || []);
    setCompletedClassData(res?.data?.data?.pastBookings || []);
    console.log(res?.data?.data?.pastBookings);
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-64">
        <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">
          Active Classes
        </h1>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Subject
              </th>
              <th scope="col" class="px-6 py-3">
                Type
              </th>
              <th scope="col" class="px-6 py-3">
                Scheduled Date
              </th>
              <th scope="col" class="px-6 py-3">
                Start Time
              </th>

              <th scope="col" class="px-6 py-3">
                End Time
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activeClassData && activeClassData.length > 0 ? (
              activeClassData.map((data, index) => (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={data._id}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.subject}
                  </th>
                  <td class="px-6 py-4">
                    {data?.classType.charAt(0).toUpperCase() +
                      data?.classType.slice(1)}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(data?.scheduledDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(data?.scheduledStartTime).toLocaleTimeString(
                      "en-IN",
                      { hour: "numeric", minute: "numeric", hour12: true }
                    )}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(data?.scheduledEndTime).toLocaleTimeString(
                      "en-IN",
                      { hour: "numeric", minute: "numeric", hour12: true }
                    )}
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      {data?.classStatus.charAt(0).toUpperCase() +
                        data?.classStatus.slice(1)}
                    </span>
                  </td>
                  {/* <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="6" class="text-center p-4">
                  No Active Classes
                </td>

                {/* <div className="block text-center p-4">Nothing to show</div> */}
              </tr>
            )}

            {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">White</td>
              <td class="px-6 py-4">Laptop PC</td>
              <td class="px-6 py-4">$1999</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">Black</td>
              <td class="px-6 py-4">Accessories</td>
              <td class="px-6 py-4">$99</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <hr class="w-48 h-[0.12rem] mx-auto border solid my-4 bg-gray-500 border-0 rounded-sm md:my-8" />
      {/* old classes */}

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 class=" mt-2 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">
          Previous Classes
        </h1>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Subject
              </th>
              <th scope="col" class="px-6 py-3">
                Type
              </th>
              <th scope="col" class="px-6 py-3">
                Scheduled Date
              </th>
              <th scope="col" class="px-6 py-3">
                Start Time
              </th>

              <th scope="col" class="px-6 py-3">
                End Time
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Review
              </th>
            </tr>
          </thead>
          <tbody>
            {completedClassData === null ? (
              <tr>
                <span className="text-center px-4">Loading...</span>
              </tr>
            ) : completedClassData.length === 0 ? (
              <tr>
                <td colspan="6" class="text-center p-4">
                  Nothing to show
                </td>
              </tr>
            ) : (
              completedClassData &&
              completedClassData.length > 0 &&
              completedClassData.map((data, index) => (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={data._id}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.subject}
                  </th>
                  <td class="px-6 py-4">
                    {data?.classType.charAt(0).toUpperCase() +
                      data?.classType.slice(1)}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(data?.scheduledDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(data?.scheduledStartTime).toLocaleTimeString(
                      "en-IN",
                      { hour: "numeric", minute: "numeric", hour12: true }
                    )}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(data?.scheduledEndTime).toLocaleTimeString(
                      "en-IN",
                      { hour: "numeric", minute: "numeric", hour12: true }
                    )}
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      Done
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                      Given
                    </span>

                    <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Write
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
