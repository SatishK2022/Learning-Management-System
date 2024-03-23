import React, { useEffect, useState } from "react";
import { Container } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteCourseLectures,
  getCourseLectures,
} from "../../redux/slices/lectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(cId, lId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lecture?"
    );

    if (confirmed) {
      await dispatch(deleteCourseLectures({ courseId: cId, lectureId: lId }));
      await dispatch(getCourseLectures(cId));
    }
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <Container className="min-h-[90vh] w-full flex flex-col gap-10 py-10">
      <div className="relative">
        <Link
          onClick={() => navigate(-1)}
          className="absolute text-xl top-0 lg:text-2xl h-10 w-10 p-1 shadow-[0_0_10px_black] text-orange-500 rounded-full flex items-center justify-center"
        >
          <AiOutlineArrowLeft />
        </Link>
        <h1 className="text-xl lg:text-2xl ml-12 mb-2 font-semibold text-orange-500">
          {state?.title}
        </h1>
        {lectures && lectures.length > 0 ? (
          <div className="flex justify-center flex-col lg:flex-row gap-2 lg:gap-10 w-full">
            <div className="bg-slate-800 w-full lg:w-3/5 h-full sticky z-10 top-0 shadow-[0_0_10px_black] rounded-lg mt-4">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                alt="Course Lecture"
                className="w-full h-[200px] lg:h-[400px] rounded-lg bg-zinc-900"
                controls
                muted
              />
              <div className="p-5">
                <h1>
                  <span className="text-orange-500 font-semibold">Title: </span>
                  {lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-orange-500 font-semibold">
                    Description:{" "}
                  </span>
                  {lectures[currentVideo]?.description}
                </p>
              </div>
            </div>
            <ul className="w-full lg:w-2/5 rounded-lg p-5 shadow-[0_0_10px_black] mt-4">
              <li className="font-bold text-orange-500 text-xl flex items-center justify-between">
                Lectures List
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/add-lecture", { state: { ...state } })
                    }
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-all ease-in-out duration-300 font-semibold"
                  >
                    Add Lecture
                  </button>
                )}
              </li>
              {lectures.map((lecture, index) => (
                <li className="space-y-1 py-2" key={lecture._id}>
                  <p
                    className="cursor-pointer text-lg font-semibold text-white"
                    onClick={() => setCurrentVideo(index)}
                  >
                    <span>Lecture {index + 1}</span> : {lecture?.title}
                  </p>
                  <p className="pb-1">{lecture?.description}</p>
                  {role === "ADMIN" && (
                    <button
                      onClick={() => onLectureDelete(state?._id, lecture._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-all ease-in-out duration-300 font-semibold"
                    >
                      Delete Lecture
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center min-h-[90vh]">
            <h1 className="text-3xl font-semibold mb-5">No Lectures Found</h1>
            {role === "ADMIN" && (
              <button
                onClick={() =>
                  navigate("/course/add-lecture", { state: { ...state } })
                }
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-all ease-in-out duration-300 font-semibold"
              >
                Add Lecture
              </button>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default DisplayLectures;
