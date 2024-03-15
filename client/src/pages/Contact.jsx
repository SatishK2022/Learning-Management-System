import React, { useState } from "react";
import { Container } from "../components";
import toast from "react-hot-toast";
import { isEmail } from "../utils/regxMatcher";
import axiosInstance from "../config/axiosInstance";

const Contact = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleUserInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All Fields are required");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);

      toast.promise(response, {
        loading: "Submitting your query",
        success: "Query submitted successfully",
        error: "Failed to submit the form",
      });

      const responseData = await response;

      if (responseData?.payload?.data) {
        setUserInput({
            name: "",
            email: "",
            message: "",
        })
      }
    } catch (error) {
      toast.error("Operation Failed! Please try again");
    }
  }

  return (
    <Container className="flex items-center justify-center w-full h-screen">
      <form
        noValidate
        onSubmit={(e) => onFormSubmit(e)}
        className=" bg-slate-900/20 p-5 rounded-lg flex flex-col w-full md:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]"
      >
        <h1 className="text-xl lg:text-2xl font-bold text-center uppercase pb-5">
          Contact Us
        </h1>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={userInput.name}
            onChange={handleUserInput}
            placeholder="Enter your name"
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
            value={userInput.email}
            onChange={handleUserInput}
            placeholder="Enter your email"
            className="bg-transparent border px-2 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="email" className="font-semibold">
            Message
          </label>
          <textarea
            type="text"
            name="message"
            id="message"
            value={userInput.message}
            onChange={handleUserInput}
            placeholder="Enter your message"
            className="bg-transparent border px-2 py-2 rounded-md resize-none h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full uppercase mt-4 bg-orange-500 hover:bg-orange-600 rounded-md px-5 py-2 text-white font-bold transition-all duration-200 ease-in"
        >
          Submit
        </button>
      </form>
    </Container>
  );
};

export default Contact;
