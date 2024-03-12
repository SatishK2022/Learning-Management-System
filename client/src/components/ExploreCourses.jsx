import React from "react";
import { Link } from "react-router-dom";
import exploreCourses from "../assets/Images/exploreCourses.png";
import Container from "./Container";

const ExploreCourses = () => {
  return (
    <Container className="flex flex-col lg:flex-row items-center justify-center bg-slate-900 text-white lg:gap-10 h-auto">
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl lg:text-5xl font-semibold py-5">
          Explore Industry Ready{" "}
          <span className="font-bold text-orange-500">Courses</span>
        </h1>
        <p className="text-lg lg:text-xl text-slate-400">
          Our course list is arranged with those skills which are currently in
          most demand in the country and outside the country.
        </p>
        <div className="py-5 flex flex-wrap gap-5">
          <Link to="/courses">
            <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-8 py-3 text-base lg:text-lg rounded-full text-white font-semibold">
              Courses
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img className="w-[80%]" src={exploreCourses} alt="Home Page" />
      </div>
    </Container>
  );
};

export default ExploreCourses;
