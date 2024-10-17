import axios from "axios";

export const handleMentorRegistration = async (
  mentorImage,
  name,
  aboutYou,
  email,
  phonenumber,
  location,
  mode,
  expertise,
  shortClassPrice,
  monthlyClassPrice,
  password
) => {
  //convent the expertise into array
  expertise = expertise
    .split(",")
    .map((item) => item.trim())
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));

  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/mentor/registration`,
      {
        mentorImage,
        name,
        aboutYou,
        email,
        phonenumber,
        location,
        mode,
        expertise,
        shortClassPrice,
        monthlyClassPrice,
        password,
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default handleMentorRegistration;
