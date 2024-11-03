import axios from "axios";

export const handleClassPayment = async (mentorId, selectedClass) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/student/book-class`,
      {
        mentorId,
        selectedClass,
      },
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default handleClassPayment;
