import axios from "axios";

export const handleSearchResult = async (searchTerm) => {
  // console.log("wdwdwdwdwdwd", name, email, password);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/auth/registration`,
      searchTerm
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default handleSearchResult;
