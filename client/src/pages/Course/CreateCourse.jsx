import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Container } from "../../components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { createCourse } from "../../redux/slices/courseSlice";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: "",
    previewImage: "",
  });

  function handleImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          thumbnail: uploadedImage,
          previewImage: this.result,
        });
      });
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

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.thumbnail
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await dispatch(createCourse(userInput));

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: "",
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <Container className="lg:h-screen flex items-center justify-center w-full lg:w-auto">
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
          Create Course
        </h1>
        <main className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-3">
          {/* Left */}
          <div className="gap-y-6">
            <div>
              <label htmlFor="image_uploads" className="cursor-pointer">
                {userInput.previewImage ? (
                  <img
                    src={userInput.previewImage}
                    alt="preview"
                    className="w-full h-40 object-cover border rounded"
                  />
                ) : (
                  <div className="w-full h-40 m-auto flex items-center justify-center border rounded">
                    <h1 className="font-bold text-lg uppercase">
                      Upload Course Thumbnail
                    </h1>
                  </div>
                )}
              </label>
              <input
                className="hidden"
                type="file"
                name="image_uploads"
                id="image_uploads"
                accept=".png, .jpg, .jpeg, .svg"
                onChange={handleImage}
              />
            </div>
            <div className="flex flex-col gap-1 mt-5">
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
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3">
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
                className="bg-transparent border px-2 py-2 rounded-md h-24 resize-none overflow-y-scroll"
              />
            </div>
          </div>
        </main>
        <button
          type="submit"
          className="w-full uppercase mt-4 bg-orange-500 hover:bg-orange-600 rounded-md px-5 py-2 text-white font-bold transition-all duration-200 ease-in"
        >
          Create Course
        </button>
      </form>
    </Container>
  );
};

export default CreateCourse;
