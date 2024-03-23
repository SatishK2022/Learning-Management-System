import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App.jsx";
import {
  About,
  AddLecture,
  ChangePassword,
  Checkout,
  CheckoutFailure,
  CheckoutSuccess,
  Contact,
  CourseDescription,
  CourseList,
  CreateCourse,
  Denied,
  DisplayLectures,
  EditCourse,
  EditProfile,
  Home,
  NotFound,
  Profile,
  Signin,
  Signup,
} from "./pages";
import { RequireAuth } from "./components/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFailure />} />

          <Route path="/course/display-lectures" element={<DisplayLectures />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/edit/:courseId" element={<EditCourse />} />
          <Route path="/course/add-lecture" element={<AddLecture />}/>
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/denied" element={<Denied />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
