import React from "react";
import { AboutInfo, Container, Faq } from "../components";
import ourMission from "../assets/Images/ourMission.png";

const About = () => {
  return (
    <section>
      <AboutInfo />
      {/* Our Mission */}
      <Container className="flex flex-col lg:flex-row items-center justify-center py-10 bg-slate-900 text-white lg:gap-10 h-auto">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-semibold py-5">
            Our <span className="font-bold text-orange-500">Mission</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400">
            Coursify is the result of a continual effort to exponentially
            increase the employability of every Indian, irrespective of their
            socioeconomic status. With accessibility and affordability being the
            support structure of high-quality, industry-relevant courses,
            Coursify aims to empower professionals and students alike to either
            jumpstart their careers or leverage existing skills with new,
            future-driven upgrades that will help them realise their full
            potential.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img className="w-[80%]" src={ourMission} alt="Home Page" />
        </div>
      </Container>
      <Faq />
    </section>
  );
};

export default About;
