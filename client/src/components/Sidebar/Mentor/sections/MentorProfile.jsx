import handleUpdateProfile from "@/handler/handleUpdateProfile";
import { FileInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
export default function MentorProfile() {
  const { isAuthenticated, user, userType } = useOutletContext(); // Access the props
  //state varibales
  const [mentorImage, setMentorImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("Mode of Teaching");
  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [shortClassPrice, setShortClassPrice] = useState("");
  const [shortClassDuration, setShortClassDuration] = useState("");
  const [monthlyClassPrice, setMonthlyClassPrice] = useState("");
  const [monthlyClassDuration, setMonthlyClassDuration] = useState("");
  const [monthlyClassFrequency, setMonthlyClassFrequency] = useState("");
  const [tagInputValue, setTagInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState([]);
  //set all the data
  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setLocation(user.location);
      setMode(user.mode);
      setSubjects(user.subjects);
      setTags(user.tags);
      setAboutYou(user.about);
      setShortClassPrice(user.shortClassPrice);
      setShortClassDuration(user.shortClassDuration);
      setMonthlyClassPrice(user.monthlyClassPrice);
      setMonthlyClassDuration(user.monthlyClassDuration);
      setMonthlyClassFrequency(user.monthlyClassFrequency);
      setMentorImage(user.mentorImage);
      setAvailability(user.availability);
    }
  }, []);

  const handleKeyDown = (event) => {
    if ((event.key === "Enter" || event.key === ",") && inputValue.trim()) {
      event.preventDefault(); // Prevent form submission

      if (subjects.length >= 5) {
        alert("You can only add up to 5 subjects.");
        return;
      }

      let newSubject = inputValue.trim();

      // Limit subject length (e.g., 12 characters)
      // const maxLength = 7;
      // if (newSubject.length > maxLength) {
      //   newSubject = newSubject.substring(0, maxLength) + "...";
      // }

      if (!subjects.includes(newSubject)) {
        setSubjects([...subjects, newSubject]);
      }

      setInputValue(""); // Clear input field
    }
  };

  const removeSubject = (subjectToRemove) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToRemove));
  };
  const handleAddTags = (event) => {
    if ((event.key === "Enter" || event.key === ",") && tagInputValue.trim()) {
      event.preventDefault(); // Prevent form submission

      if (tags.length >= 10) {
        alert("You can only add up to 10 tags");
        return;
      }

      let newTags = tagInputValue.trim();

      // Limit subject length (e.g., 12 characters)
      // const maxLength = 7;
      // if (newSubject.length > maxLength) {
      //   newSubject = newSubject.substring(0, maxLength) + "...";
      // }

      if (!tags.includes(newTags)) {
        setTags([...tags, newTags]);
      }

      setTagInputValue(""); // Clear input field
    }
  };
  const removeTags = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  //update profile data
  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    // formData.append("email", email);
    // formData.append("phoneNumber", phoneNumber);
    formData.append("location", location);
    formData.append("mode", mode);
    formData.append("subjects", JSON.stringify(subjects));
    formData.append("tags", JSON.stringify(tags));
    formData.append("about", aboutYou);
    formData.append("shortClassPrice", shortClassPrice);
    formData.append("shortClassDuration", shortClassDuration);
    formData.append("monthlyClassPrice", monthlyClassPrice);
    formData.append("monthlyClassDuration", monthlyClassDuration);
    formData.append("monthlyClassFrequency", monthlyClassFrequency);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const res = await handleUpdateProfile(formDataObject);
    console.log(res);
    // setLoading(false);
    // if (res.status === 200) {
    //   alert("Profile updated successfully");
    // } else {
    //   alert("Profile update failed");
    // }
  };
  return (
    // <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //    <div class="flex justify-end px-4 pt-4">
    //     <button
    //       id="dropdownButton"
    //       data-dropdown-toggle="dropdown"
    //       class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
    //       type="button"
    //     >
    //       <span class="sr-only">Open dropdown</span>
    //       <svg
    //         class="w-5 h-5"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="currentColor"
    //         viewBox="0 0 16 3"
    //       >
    //         <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    //       </svg>
    //     </button>
    //     <div
    //       id="dropdown"
    //       class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    //     >
    //       <ul class="py-2" aria-labelledby="dropdownButton">
    //         <li>
    //           <a
    //             href="#"
    //             class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //           >
    //             Edit
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //           >
    //             Export Data
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //           >
    //             Delete
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div class="flex flex-col items-center pb-10">
    //     <img
    //       class="w-24 h-24 mb-3 rounded-full shadow-lg"
    //       src="/docs/images/people/profile-picture-3.jpg"
    //       alt="Bonnie image"
    //     />
    //     <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
    //       {isAuthenticated && user ? user?.name : "Loading..."}
    //     </h5>
    //     <span class="text-sm text-gray-500 dark:text-gray-400">
    //       ID: <span>{isAuthenticated && user ? user?._id : "Loading..."}</span>
    //     </span>
    //     <div class="flex mt-4 md:mt-6">
    //       <a
    //         href="#"
    //         class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Add friend
    //       </a>
    //       <a
    //         href="#"
    //         class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    //       >
    //         Message
    //       </a>
    //     </div>
    //   </div>
    // </div>
    // <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <div class="mt-[15rem] relative p-4 w-full max-w-2xl h-full md:h-auto">
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Your Profile
          </h3>
        </div>

        <form onSubmit={updateProfile}>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                disabled
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                for="number"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number
              </label>
              <input
                type="number"
                value={phoneNumber}
                name="number"
                id="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your number"
                disabled
              />
            </div>
            <div>
              <label
                for="Expertise"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mode of Teaching
              </label>
              <select
                id="Expertise"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                defaultValue={mode}
                onChange={(e) => {
                  setMode(e.target.value);
                }}
              >
                <option value="Online">Online</option>
                <option value="Online">Offline</option>
                <option value="Online">Both</option>
              </select>
            </div>
            <div>
              <label
                for="location"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <input
                id="location"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                defaultValue={location}
                onChange={(e) => {
                  location(e.target.value);
                }}
                placeholder="Enter frequency in days"
              />
            </div>
            <div>
              <label
                for="about"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                About You
              </label>
              <input
                id="about"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                defaultValue={aboutYou}
                onChange={(e) => {
                  setAboutYou(e.target.value);
                }}
                placeholder="Enter frequency in days"
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="Expertise"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your expertise
              </label>
              <div className="mb-4 flex flex-wrap gap-2 border rounded-lg p-2 min-h-[40px] bg-gray-50">
                {subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {subject}
                    <button
                      onClick={() => removeSubject(subject)}
                      className="ml-2 text-white font-bold"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {subjects.length < 5 && (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-none bg-gray-50 outline-none flex-grow p-1"
                    placeholder="Type a subject and press Enter or Comma..."
                  />
                )}
              </div>
            </div>
            <div>
              <label
                for="shortclassduration"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Short Class Duration
              </label>
              <input
                id="shortclassduration"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                defaultValue={shortClassDuration}
                onChange={(e) => {
                  setShortClassDuration(e.target.value);
                }}
                placeholder="Enter duration in minutes"
              />
            </div>
            <div>
              <label
                for="shortclassprice"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Short Class Price
              </label>
              <input
                id="shortclassprice"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                defaultValue={shortClassPrice}
                onChange={(e) => {
                  setShortClassPrice(e.target.value);
                }}
                placeholder="Enter price in rupees"
              />
            </div>
            <div class="sm:col-span-2 flex gap-1">
              <div>
                <label
                  for="monthlyclassduration"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Monthy Class Duration
                </label>
                <input
                  id="monthlyclassduration"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={monthlyClassDuration}
                  onChange={(e) => {
                    setMonthlyClassDuration(e.target.value);
                  }}
                  placeholder="Enter duration in hours"
                />
              </div>
              <div>
                <label
                  for="monthlyclassduration"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Monthy Class Price
                </label>
                <input
                  id="monthlyclassduration"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={monthlyClassPrice}
                  onChange={(e) => {
                    setMonthlyClassPrice(e.target.value);
                  }}
                  placeholder="Enter price in rupees"
                />
              </div>
              <div>
                <label
                  for="monthlyclassfrequency"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Monthy Class Frequency
                </label>
                <input
                  id="monthlyclassfrequency"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={monthlyClassFrequency}
                  onChange={(e) => {
                    setMonthlyClassFrequency(e.target.value);
                  }}
                  placeholder="Enter frequency in days"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="tags"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Profile Tags
              </label>
              <div className="mb-4 flex flex-wrap gap-2 border rounded-lg p-2 min-h-[40px] bg-gray-50">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTags(tag)}
                      className="ml-2 text-white font-bold"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {tags.length < 10 && (
                  <input
                    type="text"
                    value={tagInputValue}
                    onChange={(e) => setTagInputValue(e.target.value)}
                    onKeyDown={handleAddTags}
                    className="border-none bg-gray-50 outline-none flex-grow p-1"
                    placeholder="Type a tag and press Enter or Comma..."
                  />
                )}
              </div>
            </div>
            {/* <div class="sm:col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="5"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write a description..."
              >
                Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7
                processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory,
                Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage,
                Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US
              </textarea>
            </div> */}
          </div>
          <div class="flex items-center space-x-4 ">
            <button class="m-auto relative flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Save
              </span>
            </button>
            {/* <button
              type="button"
              class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <svg
                class="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Delete
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
