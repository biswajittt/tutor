import axios from "axios";
export const handlePaymentIntent = async (mentorId) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/bookclass/book-short-class`,
      {
        mentorId,
      },
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    console.log(res?.data);
    if (res?.data?.success) {
      const { clientSecret, bookingId } = res.data;
      navigate(`/student/book-class/payment`, {
        state: { clientSecret, bookingId },
      });
    }
    return res;
  } catch (error) {
    console.log("error", error);
    return error?.response;
  }
};
export default handlePaymentIntent;
