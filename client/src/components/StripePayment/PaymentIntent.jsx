import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./payment.css";
import { Outlet, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
const stripePromise = loadStripe(
  "pk_test_51PpZQIJ9EqyxKUNxQe7d809tx3rqQ1F33aPSFIg6WcWeWVb77pHiHgE2Op5DowrfEqUbdA6HjpiZuymkgSctw6Ae00obC2WSZY"
);
import { useDispatch, useSelector } from "react-redux";
import {
  setClassData,
  classDataSlice,
} from "../../features/classData/classDataSlice";
export default function PaymentIntent() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const {
    mentorId,
    classType,
    teachingMode,
    selectedSubject,
    classDate,
    selectedClassTime,
  } = location.state || {}; // Default to empty object in case state is undefined
  // console.log(
  //   "data: ",
  //   mentorId,
  //   classType,
  //   teachingMode,
  //   selectedSubject,
  //   classDate,
  //   selectedClassTime
  // );
  const [clientSecret, setClientSecret] = useState("");
  // const [classData, setClassData] = useState(null);
  //   const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const handleShortClassPaymentIntent = async () => {
    console.log("pro");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/bookclass/create-payment-intent",
        {
          mentorId,
          classType,
          teachingMode,
          selectedSubject,
          classDate,
          selectedClassTime,
        }, // Send the required data in the body
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      // Access the response data
      console.log("token ", res);
      if (res?.status === 200) {
        // console.log("hi");
        const receivedData = res?.data?.data;
        // console.log("hi2");
        setClientSecret(receivedData?.clientSecret);
        console.log("hi3");
        //store class data in redux
        // console.log(
        //   "from redux: ",
        //   useSelector((state) => state.classData.classData)
        // );
        console.log("classData: ", receivedData?.classData);
        dispatch(setClassData(receivedData?.classData));
      } else {
        alert("Something went wrong");
      }
      // setClassData(data?.encryptedClassData);
      // console.log("secret: ", clientSecret);
      // [DEV] For demo purposes only
      // setDpmCheckerLink(data.dpmCheckerLink);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentIntentClientSecret = queryParams.get(
      "payment_intent_client_secret"
    );
    if (paymentIntentClientSecret) {
      setClientSecret(paymentIntentClientSecret); // If the user is redirected back from Stripe, use the client secret
    } else {
      // If not, proceed with creating the payment intent
      handleShortClassPaymentIntent();
    }
    // console.log(location.pathname);
    // handleShortClassPaymentIntent();
    // Create PaymentIntent as soon as the page loads
    // if (location.pathname === "/student/book-class/payment") {
    //   handleShortClassPaymentIntent();
    // }
    // } else if (location.pathname === "/student/book-class/payment/complete") {
    //   const clientSecret = new URLSearchParams(window.location.search).get(
    //     "payment_intent_client_secret"
    //   );
    //   setClientSecret(clientSecret);
    // }
    // fetch("http://localhost:8000/api/v1/bookclass/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setClientSecret(data.clientSecret);
    //     // [DEV] For demo purposes only
    //     // setDpmCheckerLink(data.dpmCheckerLink);
    //   });
  }, [location]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#000000",
    },
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
  // console.log(clientSecret);

  return (
    <div className="stripe-app">
      {clientSecret ? (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          {/* <Outlet context={{ classData }} /> */}
          <Outlet />
          {/* <Routes>
            <Route path="" element={<CheckoutForm />} />
            <Route path="/complete" element={<CompletePage />} />
          </Routes> */}
        </Elements>
      ) : (
        <div>Loading payment...</div>
      )}
    </div>
  );
}
