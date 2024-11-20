import React, { useState, useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51PpZQIJ9EqyxKUNxQe7d809tx3rqQ1F33aPSFIg6WcWeWVb77pHiHgE2Op5DowrfEqUbdA6HjpiZuymkgSctw6Ae00obC2WSZY"
);

function Payment() {
  // store client secret
  const [clientSecret, setClientSecret] = useState("");
  // call for client secret when the page load
  useEffect(() => {
    async function gett() {
      const res = await axios.post(
        `http://localhost:8000/api/v1/bookclass/client-secret`
      );
      console.log("res", res);
      if (res && res?.data && res.data?.client_secret)
        setClientSecret(res.data.client_secret);
      // const { client_secret: clientSecret } = await res.json();
      // console.log("frontend: ", res.data.client_secret);
    }
    gett();
  }, []);
  const appearance = {
    theme: "stripe",
    variables: { colorPrimaryText: "#262626" },
    rules: {
      ".Tab": {
        border: "1px solid #E0E6EB",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
      },

      ".Tab:hover": {
        color: "var(--colorText)",
      },

      ".Tab--selected": {
        borderColor: "#E0E6EB",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
      },

      ".Input--invalid": {
        boxShadow:
          "0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)",
      },

      // See all supported class names and selector syntax below
    },
  };
  const options = {
    business: "Bookmark",
    layout: {
      type: "tabs",
      defaultCollapsed: false,
    },
    // passing the client secret obtained in step 3
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance,
  };
  console.log(clientSecret);
  return (
    <>
      {clientSecret != "" ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
export default Payment;
