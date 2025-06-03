import axios from "axios";

export const fetchingBookingDataByMentorAndStudent = async (mentorId) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/student/booking-data-by-student-mentor`,
      { mentorId },
      { withCredentials: true }
    );
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default fetchingBookingDataByMentorAndStudent;
