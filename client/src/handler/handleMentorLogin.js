import axios from "axios";

export const handleMentorLogin = async (email, password) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/mentor/login`,
      {
        email,
        password,
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
export default handleMentorLogin;
