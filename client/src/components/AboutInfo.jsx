import React from "react";
import { Link } from "react-router-dom";
import aboutInfo from "../assets/Images/aboutInfo.png";
import Container from "./Container";

const AboutInfo = () => {
  return (
    <Container className="flex flex-col lg:flex-row items-center justify-center py-10 lg:py-20 text-white lg:gap-10 h-auto">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img className="w-full" src={aboutInfo} alt="Home Page" />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl lg:text-5xl font-semibold py-5">
          Know All{" "}
          <span className="font-bold text-orange-500">Information</span> About
          Us
        </h1>
        <p className="text-lg lg:text-xl text-slate-400">
          Coursify is a trusted company dedicated to creating breakthroughs in
          IT. Contributing to building the digital world. One of the world`s
          leading IT companies has been playing an important role in eliminating
          the unemployment problem at a very affrodable cost.
        </p>
        <div className="py-5 flex flex-wrap gap-5">
          <Link to="/about">
            <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-8 py-3 text-base lg:text-lg rounded-full text-white font-semibold">
              About Us
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default AboutInfo;
