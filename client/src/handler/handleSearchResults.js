import axios from "axios";

export const handleSearchResult = async (searchTerm) => {
  // console.log("searchTerm", searchTerm);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/user/search-mentor`,
      { searchTerm }
    );
    // console.log(res);
    if (res?.data?.statusCode === 200) {
      return res.data;
    }
    return false;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default handleSearchResult;
