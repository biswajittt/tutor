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
// import PaymentStatus from "./components/Payment/PaymentStatus/PaymentStatus.jsx";
// import Payment from "./components/Payment/Payment.jsx";
import SearchPage from "./components/SearchPage/SearchPage.jsx";
import MentorSignup from "./components/Join/Mentor/Signup/MentorSignup.jsx";
import MentorSignin from "./components/Join/Mentor/Signin/MentorSignin.jsx";
// import AuthWrapper from "./AuthWrapper.jsx";
import ProtectedRoute from "./MentorProtectedRoute.jsx";
import StudentSignup from "./components/Join/Student/Signup/StudentSignup.jsx";
import StudentSignin from "./components/Join/Student/Signin/StudentSignin.jsx";
// import StudentDashboard from "./components/Dashboard/Student/dashboard/StudentDashboard.jsx";
// import StudentProfile from "./components/Dashboard/Student/sections/StudentProfile.jsx";
// import MentorDashboard from "./components/Dashboard/Mentor/MentorDashboard.jsx";
// import Page from "./components/Dashboard/Mentor/app/dashboard/page.jsx";
// import MentorProfile from "./components/Dashboard/Mentor/Sections/MentorProfile.jsx";
import PaymentIntent from "./components/StripePayment/PaymentIntent.jsx";
import CheckoutForm from "./components/StripePayment/CheckoutForm.jsx";
import CompletePage from "./components/StripePayment/CompletePage.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
// import BookingandClasses from "./components/Dashboard/Student/sections/BookingandClasses.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
// import RatingandReviews from "./components/Dashboard/Student/sections/RatingandReviews.jsx";
import Dashboard from "./components/Sidebar/Student/Dashboard.jsx";
import StudentProfile from "./components/Sidebar/Student/sections/StudentProfile.jsx";
import BookingandClasses from "./components/Sidebar/Student/sections/BookingandClasses.jsx";
import RatingandReviews from "./components/Sidebar/Student/sections/RatingandReviews.jsx";
import Connections from "./components/Sidebar/Student/sections/Connections.jsx";
import MentorDashboard from "./components/Sidebar/Mentor/MentorDashboard.jsx";
import MentorProfile from "./components/Sidebar/Mentor/sections/MentorProfile.jsx";
import MentorProtectedRoute from "./MentorProtectedRoute.jsx";
import StudentProtectedRoute from "./StudentProtectedRoute.jsx";
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
      <Route element={<MentorProtectedRoute />}>
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

        {/* <Route path="student/dashboard" element={<StudentDashboard />}>
          <Route index element={<StudentProfile />} />
          <Route path="classes" element={<BookingandClasses />} />
          <Route path="reviews" element={<RatingandReviews />} />
        </Route> */}

        {/* mentor dashboard */}
        <Route path="mentor/dashboard" element={<MentorDashboard />}>
          <Route path="" element={<MentorProfile />} />
        </Route>

        {/* <Route
          path="student/book-class/payment/complete"
          element={<CompletePage />}
        /> */}
      </Route>
      {/* //only authenticate user -  student*/}
      <Route element={<StudentProtectedRoute />}>
        {/* Student Dashboard */}
        <Route path="student/dashboard" element={<Dashboard />}>
          <Route index element={<StudentProfile />} />
          <Route path="classes" element={<BookingandClasses />} />
          <Route path="rating-review" element={<RatingandReviews />} />
          <Route path="connections" element={<Connections />} />
        </Route>
        {/* payments */}
        <Route path="student/book-class/payment" element={<PaymentIntent />}>
          <Route path="" element={<CheckoutForm />} />
          <Route path="complete" element={<CompletePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
