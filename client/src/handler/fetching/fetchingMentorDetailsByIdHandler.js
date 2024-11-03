import axios from "axios";

export const fetchingMentorDetailsByIdHandler = async (mentorId) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/mentor/${mentorId}`
    );
    // console.log(res);
    return res;
  } catch (error) {
    // console.log("error", error);
    return error?.response;
  }
};
export default fetchingMentorDetailsByIdHandler;
