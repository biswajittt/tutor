import axios from "axios";

export const handleStudentLogin = async (email, password) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/student/auth/login`,
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
export default handleStudentLogin;
