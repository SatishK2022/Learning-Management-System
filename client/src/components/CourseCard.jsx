import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="bg-zinc-900/70 h-full w-full sm:w-[48%] lg:w-[32%] rounded-lg cursor-pointer"
    >
      <div className="overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt="Course Thumbnail"
          className="w-full h-40 rounded-t-md hover:scale-105 transition-all ease-in-out duration-300"
        />
        <div className="py-5 px-3 space-y-2">
          <h2 className="font-semibold text-orange-500 text-xl">
            {data?.title}
          </h2>
          <p className="text-sm">{data?.description}</p>
          <p className="font-semibold text-orange-500">
            Category:{" "}
            <span className="font-bold text-white">{data?.category}</span>
          </p>
          <p className="font-semibold text-orange-500">
            Instructor:{" "}
            <span className="font-bold text-white">{data?.createdBy}</span>
          </p>
          <p className="font-semibold text-orange-500">
            Total Lecture:{" "}
            <span className="font-bold text-white">
              {data?.numberOfLectures}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
