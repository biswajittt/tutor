import axios from "axios";

export const handleSearchResult = async (searchquery) => {
  // console.log("searchTerm", searchTerm);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/user/search-mentor`,
      { searchquery }
    );
    // console.log(res);
    // if (res?.data?.statusCode === 200) {
    //   return res.data;
    // }
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default handleSearchResult;
