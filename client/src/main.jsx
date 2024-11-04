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
import AuthWrapper from "./AuthWrapper.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import StudentSignup from "./components/Join/Student/Signup/StudentSignup.jsx";
import StudentSignin from "./components/Join/Student/Signin/StudentSignin.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="auth/student/registration" element={<StudentSignup />} />
      <Route path="auth/mentor/registration" element={<MentorSignup />} />
      <Route path="auth/mentor/login" element={<MentorSignin />} />
      <Route path="auth/student/login" element={<StudentSignin />} />
      <Route path="mentor/:mentorId" element={<Mentor />} />
      <Route path="search" element={<SearchPage />} />
      {/* //only authenticate user can accessToken */}
      <Route element={<ProtectedRoute />}>
        <Route path="payment" element={<Payment />} />
        <Route path="payment-status" element={<PaymentStatus />} />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
