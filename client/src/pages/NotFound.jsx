import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-900 items-center px-5 justify-center">
      <h1 className="text-5xl lg:text-9xl font-bold">OOPS!</h1>
      <p className="uppercase font-semibold text-lg py-5 text-orange-500">
        404 - Page Not Found
      </p>
      <p className="w-full lg:w-1/3 text-center">
        The page you are lookig for might have been removed, it's name changed
        or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 my-4 bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-5 py-2 text-sm lg:text-base uppercase rounded-full text-white font-semibold"
      >
        <FaArrowLeft /> go back
      </button>
    </div>
  );
};

export default NotFound;
