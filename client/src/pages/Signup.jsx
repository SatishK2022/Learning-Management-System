import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container } from "../components";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { isEmail, isPassword } from "../utils/regxMatcher.js";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/authSlice.js";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !signupDetails.email ||
      !signupDetails.fullName ||
      !signupDetails.password ||
      !signupDetails.avatar
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupDetails.fullName);
    formData.append("email", signupDetails.email);
    formData.append("password", signupDetails.password);
    formData.append("avatar", signupDetails.avatar);

    const response = await dispatch(createAccount(formData));
    // console.log(response);

    if (response?.payload?.data?.success) {
      navigate("/login");
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;

    setSignupDetails({
      ...signupDetails,
      [name]: value,
    });
  }

  function handleImage(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];

    if (!uploadedImage) return;

    setSignupDetails({
      ...signupDetails,
      avatar: uploadedImage,
    });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);

    console.log(fileReader);

    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
    });
  }

  return (
    <Container className="h-screen w-full flex items-center justify-center">
      <form
        noValidate
        onSubmit={(e) => onFormSubmit(e)}
        className=" bg-slate-900/20 p-5 rounded-lg flex flex-col w-full md:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]"
      >
        <h1 className="text-xl lg:text-2xl font-bold text-center uppercase pb-5">
          Create an Account
        </h1>
        <label htmlFor="imageUploads" className="cursor-pointer">
          {previewImage ? (
            <img src={previewImage} className="w-20 h-20 rounded-full m-auto" />
          ) : (
            <BsPersonCircle className="w-20 h-20 rounded-full m-auto" />
          )}
        </label>
        <input
          type="file"
          onChange={handleImage}
          className="hidden"
          name="imageUploads"
          id="imageUploads"
          accept=".png, .svg, .jpg, .jpeg"
        />
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="fullName" className="font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={signupDetails.fullName}
            onChange={handleUserInput}
            placeholder="Enter your full name"
            className="bg-transparent border px-2 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={signupDetails.email}
            onChange={handleUserInput}
            placeholder="Enter your email"
            className="bg-transparent border px-2 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={signupDetails.password}
            onChange={handleUserInput}
            placeholder="Enter your password"
            className="bg-transparent border px-2 py-2 rounded-md"
          />
        </div>
        <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 rounded-md px-5 py-2 text-white font-bold transition-all duration-200 ease-in">
          Create Account
        </button>
        <p className="text-center pt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default Signup;