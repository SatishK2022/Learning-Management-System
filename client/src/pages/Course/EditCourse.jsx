import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components";
import { getCourseDetails, updateCourse } from "../../redux/slices/courseSlice";

function EditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
  });

  function handleUserInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.createdBy
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await dispatch(updateCourse({ userInput, courseId }));

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
      });
      navigate("/courses");
      await dispatch(getCourseDetails(courseId));
    }
  }

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseData = await dispatch(getCourseDetails(courseId));

        setUserInput({
          title: courseData?.payload?.title,
          description: courseData?.payload?.description,
          category: courseData?.payload?.category,
          createdBy: courseData?.payload?.createdBy,
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId, dispatch]);

  return (
    <Container className="min-h-[90vh] flex items-center justify-center w-full lg:w-auto">
      <form
        onSubmit={onFormSubmit}
        className="bg-slate-900/20 w-full flex flex-col justify-center gap-5 rounded-lg p-5 lg:w-[800px] shadow-[0_0_10px_black] relative"
      >
        <Link
          onClick={() => navigate(-1)}
          className="absolute top-5 text-2xl h-10 w-10 p-1 shadow-[0_0_10px_black] text-orange-500 rounded-full flex items-center justify-center"
        >
          <AiOutlineArrowLeft />
        </Link>
        <h1 className="text-xl lg:text-2xl font-bold text-center uppercase pb-5">
          Edit Course
        </h1>
        <main className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-3">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="title">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={userInput.title}
                onChange={handleUserInput}
                placeholder="Enter course title"
                className="bg-transparent border px-2 py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="createdBy">
                Created By
              </label>
              <input
                type="text"
                name="createdBy"
                id="createdBy"
                required
                value={userInput.createdBy}
                onChange={handleUserInput}
                placeholder="Enter the Instructor of the course"
                className="bg-transparent border px-2 py-2 rounded-md"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                required
                value={userInput.category}
                onChange={handleUserInput}
                placeholder="Enter the category of the course"
                className="bg-transparent border px-2 py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="description">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                required
                value={userInput.description}
                onChange={handleUserInput}
                placeholder="Enter the description of the course"
                className="bg-transparent border px-2 py-2 rounded-md h-24 resize-none"
              />
            </div>
          </div>
        </main>
        <button
          type="submit"
          className="w-full uppercase mt-4 bg-orange-500 hover:bg-orange-600 rounded-md px-5 py-2 text-white font-bold transition-all duration-200 ease-in"
        >
          Update Course
        </button>
      </form>
    </Container>
  );
}

export default EditCourse;
