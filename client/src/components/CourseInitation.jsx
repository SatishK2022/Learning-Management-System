import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserGraduate, FaLaptopCode, FaCartPlus } from "react-icons/fa";

const courseEnrollmentProcess = [
  {
    icon: <FaUserPlus size={30} />,
    title: "Create account",
    path: "/signup",
    description: "Take your carrer to unique heithts in this competative.",
  },
  {
    icon: <FaLaptopCode size={30} />,
    title: "Select the course",
    path: "/courses",
    description: "Take your carrer to unique heithts in this competative.",
  },
  {
    icon: <FaCartPlus size={30} />,
    title: "Buy the Course",
    path: "/courses",
    description: "Take your carrer to unique heithts in this competative.",
  },
  {
    icon: <FaUserGraduate size={30} />,
    title: "Start learning",
    path: "/courses",
    description: "Take your carrer to unique heithts in this competative.",
  },
];

const CourseInitation = () => {
  return (
    <Container className="flex flex-col lg:flex-row items-center py-20 justify-center bg-slate-900 text-white gap-10 h-auto">
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl lg:text-5xl font-semibold py-5">
          Course <span className="font-bold text-orange-500">Initiation</span>{" "}
          Process
        </h1>
        <p className="text-lg lg:text-xl text-slate-400">
          Design is very creative work. Creative work requires skill. And skill
          comes through regular practice and guidance from experts. At Coursify
          it is possible to get guidance from experts as well as ideas about
          projects to practice.
        </p>
        <div className="py-5 flex flex-wrap gap-5">
          <Link to="/courses">
            <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-8 py-3 text-base lg:text-lg rounded-full text-white font-semibold">
              Browse Course
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-5">
          {courseEnrollmentProcess &&
            courseEnrollmentProcess.map((card) => (
              <Link
                to={card.path}
                key={card.title}
                className="bg-slate-200/10 rounded-md px-5 py-5 flex flex-col text-orange-500 hover:ring-2 ring-orange-500 items-center gap-2 justify-center"
              >
                {card.icon}
                <h3 className="text-lg font-semibol text-white">
                  {card.title}
                </h3>
                <p className="text-center text-slate-300 text-sm">
                  {card.description}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default CourseInitation;
