import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../redux/slices/courseSlice";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function handleEditClick(courseId, e) {
    e.stopPropagation();

    navigate(`/course/edit/${courseId}`);
  }

  async function handleDeleteCourse(courseId, e) {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (confirmed) {
      await dispatch(deleteCourse(courseId));
      await dispatch(getAllCourses());
    }
  }

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="bg-zinc-900/70 h-full w-full sm:w-[48%] lg:w-[32%] rounded-lg cursor-pointer relative"
    >
      <div className="overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt="Course Thumbnail"
          className="w-full h-40 object-cover overflow-hidden rounded-t-md hover:scale-105 transition-all ease-in-out duration-300"
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
      {isLoggedIn && role === "ADMIN" && (
        <div className="flex items-center gap-2 absolute top-4 right-2">
          <button onClick={(e) => handleEditClick(data._id, e)}>
            <span className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-all ease-in-out duration-300 font-semibold">
              Edit
            </span>
          </button>
          <button onClick={(e) => handleDeleteCourse(data._id, e)}>
            <span className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-all ease-in-out duration-300 font-semibold">
              Delete
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
