import React, { useEffect, useState } from "react";
// import { Datepicker } from "flowbite-react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

export default function MentorAvailability({
  onChangeShowCard,
  mentorId,
  mentorAvailability,
  classDetails,
  offeredSubjects,
}) {
  // console.log(mentorAvailability);
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClassTime, setSelectedClassTime] = useState("");

  function handleChangeClassTime(e) {
    setSelectedClassTime(e.target.value);
  }
  const handleSubjectChange = (event) => {
    console.log(event.target.value);
    setSelectedSubject(event.target.value);
  };
  const [teachingMode, setTeachingMode] = useState("online");
  // const [subject, setSubject] = useState("");
  const handleChange = (event) => {
    setTeachingMode(event.target.value);
  };
  const [value, setValue] = useState(new Date());
  const [classDate, setClassDate] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1);
  const onDateChange = (date) => {
    setValue(date);
    setClassDate(date);
    //get the day index
    const day = new Date(date).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    switch (day) {
      case 0:
        setSelectedDayIndex(0);
        break; // Sunday
      case 1:
        setSelectedDayIndex(1);
        break; // Monday
      case 2:
        setSelectedDayIndex(2);
        break; // Tuesday
      case 3:
        setSelectedDayIndex(3);
        break; // Wednesday
      case 4:
        setSelectedDayIndex(4);
        break; // Thursday
      case 5:
        setSelectedDayIndex(5);
        break; // Friday
      case 6:
        setSelectedDayIndex(6);
        break; // Saturday
    }
  };
  // console.log(mentorAvailability);
  const showMentorAvailabilityHandler = () => {
    onChangeShowCard(false);
  };

  const [dayAvailability, setDayAvailability] = useState({
    0: { day: "Sun", available: false, timeSlots: [] },
    1: { day: "Mon", available: false, timeSlots: [] },
    2: { day: "Tue", available: false, timeSlots: [] },
    3: { day: "Wed", available: false, timeSlots: [] },
    4: { day: "Thu", available: false, timeSlots: [] },
    5: { day: "Fri", available: false, timeSlots: [] },
    6: { day: "Sat", available: false, timeSlots: [] },
  });

  useEffect(() => {
    const updatedAvailability = { ...dayAvailability }; // Create a copy

    for (let dayObj of mentorAvailability) {
      let dayIndex;
      // console.log(dayObj);
      switch (dayObj.day) {
        case "Sun":
          dayIndex = 0;
          break;
        case "Mon":
          dayIndex = 1;
          break;
        case "Tue":
          dayIndex = 2;
          break;
        case "Wed":
          dayIndex = 3;
          break;
        case "Thu":
          dayIndex = 4;
          break;
        case "Fri":
          dayIndex = 5;
          break;
        case "Sat":
          dayIndex = 6;
          break;
        default:
          continue;
      }

      if (dayObj.timeSlots && dayObj.timeSlots.length > 0) {
        //array should be empty
        updatedAvailability[dayIndex].timeSlots = [];
        // console.log(dayObj.timeSlots);
        updatedAvailability[dayIndex].available = true;
        //add the time slots also
        updatedAvailability[dayIndex].timeSlots.push(dayObj.timeSlots[0]);
        // console.log(updatedAvailability[dayIndex].timeSlots);
      }
    }
    // console.log("updatedAvailability ", updatedAvailability);
    // console.log(updatedAvailability);
    setDayAvailability(updatedAvailability); // Update the state
  }, [mentorAvailability]); // Run effect when daysData changes

  //disabled days
  const [disabledDates, setDisabledDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const disabledDays = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 7; i++) {
      if (!dayAvailability[i].available) {
        for (let month = 0; month < 12; month++) {
          let day = 1;

          while (new Date(currentYear, month, day).getMonth() === month) {
            if (new Date(currentYear, month, day).getDay() === i) {
              disabledDays.push(new Date(currentYear, month, day));
            }
            day++;
          }
        }
      }
    }
    // console.log("disabledDates ", disabledDays);
    setDisabledDates(disabledDays);
  }, [dayAvailability]);
  // console.log(dayAvailability);
  // dayAvailability[selectedDayIndex].timeSlots.map((data) => console.log(data));

  // const selectedDayData = dayAvailability[selectedDayIndex];
  // console.log(selectedDayData);
  // if (selectedDayData?.available && selectedDayData?.timeSlots?.length > 0) {
  //   console.log(`Time slots for ${selectedDayData.day}:`);
  //   selectedDayData.timeSlots.forEach((nestedArray) => {
  //     console.log(nestedArray);
  //     // Iterate over the outer array
  //     if (nestedArray && nestedArray.length > 0) {
  //       const timeSlotObject = nestedArray; // Access the object inside the inner array
  //       console.log(
  //         `  Start Time: ${timeSlotObject.startTime}, End Time: ${timeSlotObject.endTime}, ID: ${timeSlotObject._id}`
  //       );
  //     }
  //   });
  // } else if (selectedDayData?.available) {
  //   console.log(`No time slots available for ${selectedDayData.day}.`);
  // } else if (selectedDayData) {
  //   console.log(`${selectedDayData.day} is not available.`);
  // } else {
  //   console.log(`Day with index ${selectedDayIndex} not found.`);
  // }
  //offered subjects
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };
  const capitalizedSubjects = offeredSubjects.map(capitalizeWords);
  //handle proceed to payment
  const handleProceedToPayment = (classType, teachingMode) => {
    navigate("/student/book-class/payment", {
      state: {
        mentorId,
        classType,
        teachingMode,
        selectedSubject,
        classDate,
        selectedClassTime,
      },
    });
    // console.log(
    //   "Data: ",
    //   selectedClassTime,
    //   selectedSubject,
    //   teachingMode,
    //   classDate
    // );
  };
  return (
    <div
      id="drawer-swipe"
      class="fixed z-40 w-full overflow-y-auto bg-white border-t border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-800 transition-transform bottom-0 left-0 right-0 translate-y-full h-[39rem] bottom-[39rem]"
      tabindex="-1"
      aria-labelledby="drawer-swipe-label"
    >
      <div
        class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
        data-drawer-toggle="drawer-swipe"
        onClick={showMentorAvailabilityHandler}
      >
        <span class="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600"></span>
        <h5
          id="drawer-swipe-label"
          class="inline-flex items-center text-base text-gray-500 dark:text-gray-400 font-medium"
        >
          <svg
            class="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
          </svg>
          Select Availability
        </h5>
      </div>
      <div class="p-6">
        <h2 class="text-xl text-gray-900 dark:text-white font-bold mb-2">
          Digital Transformation
        </h2>
        <div class="flex items-center space-x-4 rtl:space-x-reverse mb-3">
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-gray-400 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-900 dark:text-white text-base font-medium">
              30.06.2024
            </span>
          </div>
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-gray-400 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-900 dark:text-white text-base font-medium">
              California, USA
            </span>
          </div>
        </div>
        <div class="flext justify-center pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5">
          <div class="block max-w-sm p-6 bg-white border border-solid border-gray-200 rounded-lg shadow-sm">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Choose Your Availability
            </h5>
            <div className="border border-solid rounded-lg p-1 flex justify-center">
              <DatePicker onChange={onDateChange} value={value} />
            </div>
            <div class="mt-4 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5">
              <h3 class="text-gray-900 text-base font-medium  mb-3 text-center">
                {new Date(value).toDateString()}
              </h3>
              <button
                type="button"
                data-collapse-toggle="timetable"
                class="inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  class="w-4 h-4 text-gray-800 dark:text-white me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Pick a time
              </button>
              <label class="sr-only">Pick a time</label>
              <ul id="timetable" class="grid w-full grid-cols-2 gap-2 mt-5">
                {/* iterate all available days time slots */}
                {dayAvailability[selectedDayIndex]?.available ? (
                  dayAvailability[selectedDayIndex]?.timeSlots?.length > 0 ? (
                    <>
                      {dayAvailability[selectedDayIndex].timeSlots.map(
                        (nestedArray, index) =>
                          nestedArray ? (
                            <>
                              {/* <li>
                                <input
                                  type="checkbox"
                                  id={new Date(
                                    `2000-01-01T${nestedArray.startTime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                  value={new Date(
                                    `2000-01-01T${nestedArray.startTime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                  class="hidden peer"
                                  name="timetable"
                                />
                                <label
                                  for={new Date(
                                    `2000-01-01T${nestedArray.startTime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                  class="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white dark:peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                                >
                                  {new Date(
                                    `2000-01-01T${nestedArray.startTime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </label>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  id={new Date(
                                    `2000-01-01T${nestedArray.endTime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                  value={new Date(
                                    `2000-01-01T${nestedArray.endTime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                  class="hidden peer"
                                  name="timetable"
                                />
                                <label
                                  for={new Date(
                                    `2000-01-01T${nestedArray.endTime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                  class="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white dark:peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                                >
                                  {new Date(
                                    `2000-01-01T${nestedArray.endTime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </label>
                              </li> */}
                              <li>
                                <div className="flex gap-2 items-center">
                                  <input
                                    type="radio"
                                    name="timetableGroup"
                                    id={`group-${nestedArray.startTime}-${nestedArray.endTime}`}
                                    value={`${nestedArray.startTime}|${nestedArray.endTime}`}
                                    className="hidden peer"
                                    onChange={handleChangeClassTime}
                                  />
                                  <input
                                    type="checkbox"
                                    id={`group-${nestedArray.startTime}-${nestedArray.endTime}`}
                                    value={`${new Date(
                                      `2000-01-01T${nestedArray.startTime}`
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}|${new Date(
                                      `2000-01-01T${nestedArray.endTime}`
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}`}
                                    class="hidden peer"
                                  />
                                  <label
                                    for={`group-${nestedArray.startTime}-${nestedArray.endTime}`}
                                    class="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white dark:peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                                  >
                                    {new Date(
                                      `2000-01-01T${nestedArray.startTime}`
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </label>
                                  <label
                                    for={`group-${nestedArray.startTime}-${nestedArray.endTime}`}
                                    class="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white dark:peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                                  >
                                    {new Date(
                                      `2000-01-01T${nestedArray.endTime}`
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </label>
                                </div>
                              </li>
                            </>
                          ) : null
                      )}
                    </>
                  ) : (
                    <p>
                      No time slots available for{" "}
                      {dayAvailability[selectedDayIndex]?.day}.
                    </p>
                  )
                ) : (
                  <p>
                    {dayAvailability[selectedDayIndex]?.day} is not available.
                  </p>
                )}
              </ul>
            </div>
          </div>

          <div class="block max-w-sm p-6 bg-white border border-solid border-gray-200 rounded-lg shadow-sm">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Choose Your Availability
            </h5>
            <div>
              <h5 class="text-center mt-4 mb-2 text-md font-bold tracking-tight text-gray-900 ">
                Subjects
              </h5>
              <div className="flex flex-wrap justify-center gap-2">
                {offeredSubjects &&
                  capitalizedSubjects.map((subject, index) => (
                    <div key={index} className="flex items-center me-4">
                      <input
                        type="radio"
                        id={`subject-${index}`}
                        name="selected-subject" // Ensure all radio buttons have the same name for single selection
                        value={subject}
                        checked={selectedSubject === subject}
                        onChange={handleSubjectChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`subject-${index}`}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {subject}
                      </label>
                    </div>
                  ))}

                {selectedSubject && (
                  <p className="mt-4">Selected Subject: {selectedSubject}</p>
                )}
              </div>
            </div>
            <div>
              <h5 class="text-center mt-4 mb-2 text-md font-bold tracking-tight text-gray-900 ">
                Teaching Mode
              </h5>
              <div class="flex flex-wrap justify-center">
                <div class="flex items-center me-4">
                  <input
                    id="teal-radio"
                    type="radio"
                    value="online"
                    name="colored-radio"
                    class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={teachingMode === "online"} // Check if the current state is 'online'
                    onChange={handleChange} // Call handleChange when the radio button changes
                  />
                  <label
                    for="teal-radio"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Online
                  </label>
                </div>
                <div class="flex items-center me-4">
                  <input
                    id="orange-radio"
                    type="radio"
                    value="offline"
                    name="colored-radio"
                    class="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={teachingMode === "offline"} // Check if the current state is 'online'
                    onChange={handleChange} // Call handleChange when the radio button changes
                  />
                  <label
                    for="orange-radio"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Offline
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="block max-w-sm p-6 bg-white rounded-lg shadow-sm">
            <div class="space-y-4 rounded-lg border border-solid border-gray-400 p-4 shadow-sm  sm:p-6">
              <p class="text-xl font-semibold text-gray-900 dark:text-white">
                Booking summary
              </p>

              <div class="space-y-4">
                <div class="space-y-2">
                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                      Class Fee
                    </dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">
                      ₹{classDetails?.price}
                    </dd>
                  </dl>
                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                      Offline Charge
                    </dt>
                    <dd class="text-base font-medium text-green-600">
                      {teachingMode === "offline" ? "100" : "0"}
                    </dd>
                  </dl>
                </div>

                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt class="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd class="text-base font-bold text-gray-900 dark:text-white">
                    ₹
                    {classDetails?.price +
                      (teachingMode === "offline" ? 100 : 0)}
                  </dd>
                </dl>
              </div>

              <button
                type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={() => {
                  handleProceedToPayment("short", "offline");
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
