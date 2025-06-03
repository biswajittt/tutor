import axios from "axios";
const handleSignOut = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/signout",
      {},
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Sign out failed:", error);
    // Handle error (e.g., show a message to the user)
  }
};

export default handleSignOut;
