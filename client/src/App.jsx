import { useEffect } from "react";
import toast from "react-hot-toast";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    toast.success("Hello");
    toast.error("Error");
  });

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
