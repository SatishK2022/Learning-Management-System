import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../../components";

const CourseDescription = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state.auth);

  return (
    <Container className="min-h-[90vh] flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 relative">
        {/* Left of the grid */}
        <div>
          <img
            src={state?.thumbnail?.secure_url}
            alt="Course Thumbnail"
            className="w-full h-64 rounded-lg"
          />
          <div className="py-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-orange-500 ">
                Instructor:{" "}
                <span className="font-bold text-white">{state?.createdBy}</span>
              </p>
              <p className="font-semibold text-orange-500 ">
                Total Lecture:{" "}
                <span className="font-bold text-white">
                  {state?.numberOfLectures}
                </span>
              </p>
            </div>
            {role === "ADMIN" || data?.subscription?.status === "active" ? (
              <button
                onClick={() =>
                  navigate("/course/display-lectures", { state: { ...state } })
                }
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md mt-4 hover:bg-green-600 transition-all duration-200 ease-in-out"
              >
                Start Course
              </button>
            ) : (
              <button
                onClick={() => navigate("/checkout")}
                className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-md mt-4 hover:bg-orange-600 transition-all duration-200 ease-in-out"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>

        {/* Right of the grid */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-orange-500 mb-5">
            {state?.title}
          </h1>
          <p>{state?.description}</p>
        </div>
      </div>
    </Container>
  );
};

export default CourseDescription;
