import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Mentor from "./components/Mentor/Mentor.jsx";
import PaymentStatus from "./components/Payment/PaymentStatus/PaymentStatus.jsx";
import Payment from "./components/Payment/Payment.jsx";
import SearchPage from "./components/SearchPage/SearchPage.jsx";
import MentorSignup from "./components/Join/Mentor/Signup/MentorSignup.jsx";
import MentorSignin from "./components/Join/Mentor/Signin/MentorSignin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="auth/mentor/registration" element={<MentorSignup />} />
      <Route path="auth/mentor/login" element={<MentorSignin />} />
      <Route path="mentor" element={<Mentor />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="payment" element={<Payment />} />
      <Route path="payment-status" element={<PaymentStatus />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
