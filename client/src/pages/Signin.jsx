import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container } from "../components";
import toast from "react-hot-toast";
import { isEmail } from "../utils/regxMatcher.js";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice.js";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!signinDetails.email || !signinDetails.password) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!isEmail(signinDetails.email)) {
      toast.error("Please enter a valid email");
    }

    const response = await dispatch(login(signinDetails));
    // console.log(response);

    if (response?.payload?.data?.success) {
      navigate("/");
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;

    setSigninDetails({
      ...signinDetails,
      [name]: value,
    });
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Container className="h-[90vh] w-full flex items-center justify-center">
      <form
        noValidate
        onSubmit={(e) => onFormSubmit(e)}
        className=" bg-slate-900/20 p-5 rounded-lg flex flex-col w-full md:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]"
      >
        <h1 className="text-xl lg:text-2xl font-bold text-center uppercase pb-5">
          Login to Your Account
        </h1>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={signinDetails.email}
            onChange={handleUserInput}
            placeholder="Enter your email"
            className="bg-transparent border px-2 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="border px-2 py-2 rounded-md flex items-center">
            <input
              type={showPassword ? "password" : "text"}
              name="password"
              id="password"
              value={signinDetails.password}
              onChange={handleUserInput}
              placeholder="Enter your password"
              className="bg-transparent w-full border-none outline-none relative"
            />
            {showPassword ? (
              <FiEye
                size={20}
                className="cursor-pointer"
                onClick={handleShowPassword}
              />
            ) : (
              <FiEyeOff
                size={20}
                className="cursor-pointer"
                onClick={handleShowPassword}
              />
            )}
          </div>
        </div>
        <button className="w-full mt-4 select-none bg-orange-500 hover:bg-orange-600 rounded-md px-5 py-2 text-white font-bold transition-all duration-200 ease-in">
          Sign In
        </button>
        <p className="text-center pt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            signup
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default Signin;
