import axios from "axios";

export const fetchingBookingsByStudentId = async () => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/student/booking-data-by-student-id`,
      {},
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    // console.log(res);
    return res;
  } catch (error) {
    // console.log("error", error);
    return error?.response;
  }
};
export default fetchingBookingsByStudentId;
