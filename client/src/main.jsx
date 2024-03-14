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
  Contact,
  CourseDescription,
  CourseList,
  Denied,
  Home,
  NotFound,
  Signin,
  Signup,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />
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
