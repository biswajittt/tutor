import axios from "axios";

export const fetchingMentorsDataHandler = async () => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/mentor/all-mentors-data`
    );
    // console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default fetchingMentorsDataHandler;
