import axios from "axios";
export const handleMentorMessage = async (mentorId, message) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/mentor/connection/send-message`,
      {
        mentorId,
        message,
      },
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    console.log("res", res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default handleMentorMessage;
