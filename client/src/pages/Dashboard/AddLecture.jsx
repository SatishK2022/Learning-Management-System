import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../redux/slices/lectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddLecture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [userInput, setUserInput] = useState({
    id: state?._id,
    title: "",
    description: "",
    lecture: "",
  });
  const [previewFile, setPreviewFile] = useState("");

  function handleFile(e) {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) return;

    setUserInput({
      ...userInput,
      lecture: file,
    });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.addEventListener("load", () => {
      setPreviewFile(fileReader.result);
    });
  }

  async function handleAddLecture(e) {
    e.preventDefault();

    if (!userInput.title || !userInput.description || !userInput.lecture) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await dispatch(addCourseLectures(userInput));
   
    console.log("Response: ", response);

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        lecture: "",
      });

      setPreviewFile("");
      navigate(-1);
    }
  }

  function handleUserInput(e) {
    e.preventDefault();

    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  return (
    <Container className="min-h-[90vh] flex items-center justify-center">
      <form
        noValidate
        onSubmit={(e) => handleAddLecture(e)}
        className=" bg-slate-900/20 p-5 rounded-lg flex flex-col relative w-full md:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]"
      >
        <Link
          onClick={() => navigate(-1)}
          className="absolute top-5 text-2xl h-10 w-10 p-1 shadow-[0_0_10px_black] text-orange-500 rounded-full flex items-center justify-center"
        >
          <AiOutlineArrowLeft />
        </Link>
        <h1 className="text-xl lg:text-2xl font-bold text-center uppercase pb-5">
          Add Lecture
        </h1>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={userInput.title}
            onChange={handleUserInput}
            placeholder="Enter your Title"
            className="bg-transparent border px-2 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={userInput.description}
            onChange={handleUserInput}
            placeholder="Enter your description"
            className="bg-transparent border px-2 py-2 rounded-md resize-none h-20"
          />
        </div>
        <label htmlFor="lecture" className="font-semibold cursor-pointer">
          Lecture
          {previewFile ? (
            <video
              src={previewFile}
              controls
              className="w-full h-32 rounded-md mt-2"
            />
          ) : (
            <div className="w-full mt-2 h-32 rounded-md border flex items-center justify-center">
              Upload Your Video
            </div>
          )}
        </label>
        <input
          type="file"
          name="lecture"
          id="lecture"
          onChange={handleFile}
          className="hidden"
          accept=".mp4"
        />

        <button
          type="submit"
          className="w-full uppercase mt-4 bg-orange-500 hover:bg-orange-600 rounded-md px-5 py-2 text-white font-bold transition-all duration-200 ease-in"
        >
          Submit
        </button>
      </form>
    </Container>
  );
};

export default AddLecture;
