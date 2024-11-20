import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";
import "./app.css";
const stripePromise = loadStripe(
  "pk_test_51PpZQIJ9EqyxKUNxQe7d809tx3rqQ1F33aPSFIg6WcWeWVb77pHiHgE2Op5DowrfEqUbdA6HjpiZuymkgSctw6Ae00obC2WSZY"
);
export default function Pay() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8000/api/v1/bookclass/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#000000",
    },
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div className="App">
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
          {/* <Routes>
              <Route
                path="/checkout"
                element={<CheckoutForm dpmCheckerLink={dpmCheckerLink} />}
              />
              <Route path="/complete" element={<CompletePage />} />
            </Routes> */}
        </Elements>
      )}
    </div>
  );
}
