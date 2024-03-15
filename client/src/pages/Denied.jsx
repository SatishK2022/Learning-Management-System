import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Denied = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-900 items-center px-5 justify-center">
      <h1 className="text-5xl lg:text-9xl font-bold">OOPS!</h1>
      <p className="uppercase font-semibold text-lg py-5 text-orange-500">
        403 - Access Denied
      </p>
      <p className="w-full lg:w-1/3 text-center">
        You do not have permission to access this page. <br />
        Please contact your site administrator to request access.
      </p>
      <Link to={navigate("/")} className="py-5">
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-5 py-3 text-sm lg:text-base uppercase rounded-full text-white font-semibold">
          <FaArrowLeft /> go to homepage
        </button>
      </Link>
    </div>
  );
};

export default Denied;
