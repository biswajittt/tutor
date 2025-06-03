import axios from "axios";

export const handleUpdateProfile = async (data) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/mentor/update-profile`,
      data,
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
export default handleUpdateProfile;
