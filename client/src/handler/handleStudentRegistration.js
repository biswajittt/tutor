import axios from "axios";

export const handleStudentRegistration = async (
  name,
  email,
  phonenumber,
  category,
  password
) => {
  // console.log("wdwdwdwdwdwd", name, email, password);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/auth/student/registration`,
      { name, email, category, password, phonenumber }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default handleStudentRegistration;
