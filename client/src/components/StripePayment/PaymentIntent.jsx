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

export default function PaymentIntent() {
  const location = useLocation();
  const { mentorId, classType } = location.state || {}; // Default to empty object in case state is undefined
  // console.log(mentorId, classType);
  const [clientSecret, setClientSecret] = useState("");
  //   const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const handleShortClassPaymentIntent = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/bookclass/create-payment-intent",
        { mentorId, classType }, // Send the required data in the body
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      // Access the response data
      console.log(res);
      const data = res.data;
      setClientSecret(data.clientSecret);
      // console.log("secret: ", clientSecret);
      // [DEV] For demo purposes only
      // setDpmCheckerLink(data.dpmCheckerLink);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  useEffect(() => {
    // console.log(location.pathname);
    handleShortClassPaymentIntent();
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
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#000000",
    },
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
  console.log(clientSecret);

  return (
    <div className="stripe-app">
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <Outlet />
          {/* <Routes>
            <Route path="" element={<CheckoutForm />} />
            <Route path="/complete" element={<CompletePage />} />
          </Routes> */}
        </Elements>
      )}
    </div>
  );
}
