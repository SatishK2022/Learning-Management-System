import React from "react";
import { Link } from "react-router-dom";
import homePageMainImage from "../assets/Images/homePageMainImage.png";
import Container from "./Container";

const Hero = () => {
  return (
    <Container className="flex flex-col lg:flex-row items-center justify-center text-white gap-10 h-auto lg:h-[90vh] ">
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl lg:text-5xl font-semibold py-5">
          Find out best{" "}
          <span className="font-bold text-orange-500">Online Courses</span>
        </h1>
        <p className="text-lg lg:text-xl text-slate-400">
          We have a large library of courses taught by highly skilled and
          qualified faculties at a very affrodable price.
        </p>
        <div className="py-5 flex flex-wrap gap-5">
          <Link to="/courses">
            <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-8 py-3 text-base lg:text-lg rounded-full text-white font-semibold">
              Explore Courses
            </button>
          </Link>
          <Link to="/contact">
            <button className="border border-orange-500 hover:bg-orange-500 transition-all duration-200 px-8 py-3 text-base lg:text-lg rounded-full text-white font-semibold">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          className="w-full lg:w-[80%]"
          src={homePageMainImage}
          alt="Home Page"
        />
      </div>
    </Container>
  );
};

export default Hero;
