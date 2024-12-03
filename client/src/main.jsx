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
import StudentDashboard from "./components/Dashboard/Student/StudentDashboard.jsx";
import StudentProfile from "./components/Dashboard/Student/StudentProfile.jsx";
import StudentClasses from "./components/Dashboard/Student/StudentClasses.jsx";
// import MentorDashboard from "./components/Dashboard/Mentor/MentorDashboard.jsx";
import Page from "./components/Dashboard/Mentor/app/dashboard/page.jsx";
import MentorProfile from "./components/Dashboard/Mentor/Sections/MentorProfile.jsx";
import PaymentIntent from "./components/StripePayment/PaymentIntent.jsx";
import CheckoutForm from "./components/StripePayment/CheckoutForm.jsx";
import CompletePage from "./components/StripePayment/CompletePage.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
// import PP from "./components/Payment/pp.jsx";
// import Apps from "./components/Payment/temp/app.jsx";
// import Return from "./components/Payment/temp/Return.jsx";
// import Pay from "./components/Payment/temp2/main.jsx";
// import CompletePage from "./components/Payment/temp2/CompletePage.jsx";

// import MentorDashboard from "./components/Dashboard/Mentor/MentorDashboard.jsx";
// import MentorProfile from "./components/Dashboard/Mentor/MentorProfile.jsx";
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
        {/* <Route path="student/book-class/payment" element={<Payment />} /> */}
        {/* <Route path="student/book-class/payment" element={<Apps />} />
        <Route path="payment-status" element={<PaymentStatus />} />
        <Route
          path="student/book-class/payment/checkout/return"
          element={<Return />}
        /> */}
        {/* <Route path="student/book-class/payment" element={<Pay />} />
        <Route
          path="student/book-class/payment/complete"
          element={<CompletePage />}
        /> */}
        {/* Student Dashboard */}
        <Route path="student/dashboard" element={<StudentDashboard />}>
          {/* Default route for the dashboard */}
          <Route index element={<StudentProfile />} />
          <Route path="classes" element={<StudentClasses />} />
        </Route>

        {/* mentor dashboard */}
        <Route path="mentor/dashboard" element={<Page />}>
          <Route path="" element={<MentorProfile />} />
        </Route>

        {/* payments */}
        <Route path="student/book-class/payment" element={<PaymentIntent />}>
          <Route path="" element={<CheckoutForm />} />
          <Route path="complete" element={<CompletePage />} />
        </Route>
        {/* <Route
          path="student/book-class/payment/complete"
          element={<CompletePage />}
        /> */}
      </Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
