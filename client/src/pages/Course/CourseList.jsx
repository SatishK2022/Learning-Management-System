import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Container, CourseCard } from "../../components";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice.js";

const CourseList = () => {
  const dispatch = useDispatch();

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  const { courseList } = useSelector((state) => state.course);

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <Container className="min-h-[90vh]">
      <h1 className="font-semibold text-3xl lg:text-4xl text-center">
        Explore courses made by{" "}
        <span className="text-orange-500 font-bold">Industry Experts</span>
      </h1>
      <div className="flex items-center justify-evenly flex-wrap gap-5 py-10">
        {courseList ? (
          courseList.map((course) => (
            <CourseCard data={course} key={course._id} />
          ))
        ) : (
          <div>
            <h1>No courses found</h1>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CourseList;
