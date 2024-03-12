import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { About, Home, NotFound } from "./pages";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
      <Toaster />
    </RouterProvider>
  </Provider>
);
