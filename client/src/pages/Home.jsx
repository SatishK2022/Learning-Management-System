import React from "react";
import { AboutInfo, CourseInitation, ExploreCourses, Faq, Hero } from "../components";

const Home = () => {
  return (
    <>
      <Hero />
      <ExploreCourses />
      <AboutInfo />
      <CourseInitation />
      <Faq />
    </>
  );
};

export default Home;
