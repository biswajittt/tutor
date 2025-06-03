import React, { useState } from "react";

const Availability = ({ onChange }) => {
  const [showAddTimeSlotsCard, setShowAddTimeSlotsCard] = useState({
    day: "",
    show: false,
  });
  const [selectedValues, setSelectedValues] = useState([]);
  const [dayTimeSlots, setDayTimeSlots] = useState({}); // Store time slots per day
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const MAX_TIME_SLOTS = 4;
  const [timeSlots, setTimeSlots] = useState({
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  });

  const handleDocumentTypeChange = (value) => {
    setSelectedDay(value);
    console.log("Selected Document Type:", value);
    // Perform other actions with the selected value
  };
  const [days, setDays] = useState([
    { name: "Sun", timeslotAdded: false },
    { name: "Mon", timeslotAdded: false },
    { name: "Tue", timeslotAdded: false },
    { name: "Wed", timeslotAdded: false },
    { name: "Thu", timeslotAdded: false },
    { name: "Fri", timeslotAdded: false },
    { name: "Sat", timeslotAdded: false },
  ]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    let newSelectedValues;

    if (isChecked) {
      newSelectedValues = [...selectedValues, value];
    } else {
      newSelectedValues = selectedValues.filter((item) => item !== value);
    }

    setSelectedValues(newSelectedValues);
    handleDocumentTypeChange(newSelectedValues); // Pass the updated array to the parent
  };
  const isChecked = (value) => selectedValues.includes(value);
  //save time frame

  const [errors, setErrors] = useState([]);
  const handleAddTimeSlot = (day) => {
    if (timeSlots[day] && timeSlots[day].length < MAX_TIME_SLOTS) {
      setTimeSlots((prevTimeSlots) => ({
        ...prevTimeSlots,
        [day]: [...prevTimeSlots[day], { startTime: "", endTime: "" }],
      }));
      //pass the availability to parent component
      onChange(timeSlots);
      // console.log("hi");
      // console.log(timeSlots);
      // console.log(timeSlots[day]);
    } else {
      console.log(
        `handleAddTimeSlot: Invalid day: ${day} or max time slots reached.`
      );
    }
  };
  const validateTimeSlot = (day, index) => {
    const startTime = timeSlots[day][index].startTime;
    const endTime = timeSlots[day][index].endTime;
    const updatedErrors = { ...errors }; // Create a copy of errors

    if (!updatedErrors[day]) {
      updatedErrors[day] = [];
    }

    if (startTime && endTime && startTime >= endTime) {
      if (!updatedErrors[day][index]) {
        updatedErrors[day][index] = {};
      }
      updatedErrors[day][index].endTime = true;
    } else {
      if (!updatedErrors[day][index]) {
        updatedErrors[day][index] = {};
      }
      updatedErrors[day][index].endTime = false;
    }
    setErrors(updatedErrors);
  };

  const handleTimeChange = (day, index, field, value) => {
    setTimeSlots((prevTimeSlots) => {
      if (Array.isArray(prevTimeSlots[day])) {
        const updatedDaySlots = [...prevTimeSlots[day]];
        updatedDaySlots[index][field] = value;
        return {
          ...prevTimeSlots,
          [day]: updatedDaySlots,
        };
      } else {
        console.error(
          `handleTimeChange: prevTimeSlots[${day}] is not an array.`
        );
        return prevTimeSlots; // Return the previous state to avoid breaking the app.
      }
    });
    validateTimeSlot(day, index);
    //add the time slots
    onChange(timeSlots);
  };
  // console.log(showAddTimeSlotsCard.day);
  // console.log(timeSlots[showAddTimeSlotsCard?.day?.name]);
  // console.log(errors);
  //check for which day the time slot is added
  const checkTimeSlotsAddedHandler = async (days, timeSlots) => {
    for (const day of days) {
      const dayName = day.name;
      if (
        timeSlots[dayName] &&
        Array.isArray(timeSlots[dayName]) &&
        timeSlots[dayName].length > 0
      ) {
        day.timeslotAdded = true;
      } else {
        day.timeslotAdded = false;
      }
    }
  };
  //edit - added time slots
  const editAddedTimeSlots = async (option) => {
    //show card
    setShowAddTimeSlotsCard({ day: option.name, show: true });
  };
  //delete - added time slots
  const deleteAddedTimeSlots = async (option) => {
    setTimeSlots((prevSlots) => {
      const updatedSlots = {
        ...prevSlots,
        [option.name]: [],
      };
      console.log(
        "TimeSlots after update (inside setTimeSlots):",
        updatedSlots
      ); // Log inside setTimeSlots
      return updatedSlots;
    });
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.name === option.name ? { ...day, timeslotAdded: false } : day
      )
    );
  };
  return (
    <>
      {showAddTimeSlotsCard.show ? (
        <div class=" p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-100">
          <div className="mb-2">
            <i
              className="fa-solid fa-arrow-left mr-4  cursor-pointer"
              onClick={() => {
                setShowAddTimeSlotsCard({
                  day: showAddTimeSlotsCard.day,
                  show: false,
                });
                checkTimeSlotsAddedHandler(days, timeSlots);
              }}
            ></i>
            <span className="text-center font-bold">
              Add Time Slots for
              <span class="ml-2 bg-blue-100 font-bold text-sm me-2 px-2.5 py-0.5 rounded-sm border border-blue-400">
                {showAddTimeSlotsCard.day}
              </span>
            </span>
          </div>
          <div>
            {timeSlots[showAddTimeSlotsCard?.day]?.map((slot, index) => (
              <div
                key={index}
                className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 my-2 w-fit"
              >
                <div>
                  <label
                    htmlFor={`start-time-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start time:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id={`start-time-${index}`}
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="09:00"
                      max="18:00"
                      value={slot.startTime}
                      onChange={(event) => {
                        handleTimeChange(
                          showAddTimeSlotsCard.day,
                          index,
                          "startTime",
                          event.target.value
                        );
                      }}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`end-time-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End time:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id={`end-time-${index}`}
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="09:00"
                      max="18:00"
                      value={slot.endTime}
                      onChange={(event) =>
                        handleTimeChange(
                          showAddTimeSlotsCard.day,
                          index,
                          "endTime",
                          event.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* {timeSlots.length < MAX_TIME_SLOTS && (
              <button
                id="saveTimeButton"
                type="button"
                className="text-gray-900 bg-white hover:bg-gray-100 border border-solid border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center me-2 mb-2"
                onClick={handleAddTimeSlot}
              >
                <i className="fa-solid fa-plus mr-2"></i>
                Add more slots
              </button>
            )} */}
            {timeSlots[showAddTimeSlotsCard.day] &&
            timeSlots[showAddTimeSlotsCard.day].length < MAX_TIME_SLOTS ? (
              <button
                id="saveTimeButton"
                type="button"
                className="text-gray-900 bg-white hover:bg-gray-100 border border-solid border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center me-2 mb-2"
                onClick={() => handleAddTimeSlot(showAddTimeSlotsCard?.day)}
              >
                <i className="fa-solid fa-plus mr-2"></i>
                Add Time slots
              </button>
            ) : (
              <button
                id="saveTimeButton"
                type="button"
                className="text-gray-900 font-bold hover:bg-gray-100 border border-solid border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center me-2 mb-2"
                disabled={true}
              >
                Upto 4 Slots Allowed
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
            Select Availability
          </h3>
          <ul className="items-center flex-col w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {days.map((option, index) => (
              <li
                key={index}
                className="w-full flex border-b border-gray-200 sm:border-b-0 sm:border-r justify-evenly mb-2"
              >
                <div className="">
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    value={option.name}
                    name="list-checkbox"
                    checked={
                      option.timeslotAdded === true || isChecked(option.name)
                    }
                    // checked={isChecked(option.name)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300"
                  >
                    {option.name}
                  </label>
                </div>
                {option.timeslotAdded === false ? (
                  <button
                    id={`add-button-${index}`}
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 border border-solid border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center me-2 mb-2"
                    onClick={() => {
                      setShowAddTimeSlotsCard({
                        day: option.name,
                        show: true,
                      });
                    }}
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add Time Slots
                  </button>
                ) : (
                  <div>
                    <button
                      type="button"
                      class="text-blue-700 border border-solid border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                      onClick={() => {
                        editAddedTimeSlots(option);
                      }}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                      <span class="sr-only">Edit</span>
                    </button>
                    <button
                      type="button"
                      class="text-blue-700 border border-solid border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                      onClick={() => {
                        deleteAddedTimeSlots(option);
                      }}
                    >
                      <i class="fa-solid fa-trash"></i>
                      <span class="sr-only">Delete</span>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Availability;
