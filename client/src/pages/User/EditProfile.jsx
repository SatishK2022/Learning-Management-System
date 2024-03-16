import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../redux/slices/authSlice";
import { BsPersonCircle } from "react-icons/bs";
import { Container } from "../../components";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    previewImage: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleImageUpload(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!data.fullName || !data.avatar) {
      toast.error("All fields are required");
      return;
    }

    if (data.fullName.length < 5) {
      toast.error("Full name must be at least 5 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile(formData));
    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
    <Container className="h-screen w-full flex items-center justify-center">
      <form
        noValidate
        onSubmit={(e) => handleFormSubmit(e)}
        className=" bg-slate-900/20 p-5 rounded-lg flex flex-col w-full md:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]"
      >
        <h1 className="text-xl lg:text-2xl font-bold text-center uppercase pb-5">
          Edit Profile
        </h1>
        <label htmlFor="imageUploads" className="cursor-pointer">
          {data.previewImage ? (
            <img
              src={data.previewImage}
              className="w-20 h-20 rounded-full m-auto"
            />
          ) : (
            <BsPersonCircle className="w-20 h-20 rounded-full m-auto" />
          )}
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="hidden"
          name="imageUploads"
          id="imageUploads"
          accept=".png, .svg, .jpg, .jpeg"
        />
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="fullName" className="font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={data.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="bg-transparent border px-2 py-2 rounded-md"
          />
        </div>
        <button className="w-full mt-4 select-none bg-orange-500 hover:bg-orange-600 rounded-md px-5 py-2 text-white font-bold transition-all duration-200 ease-in">
          Update Profile
        </button>
        <Link
          to="/user/profile"
          className="text-blue-500 mt-5 text-center hover:underline"
        >
          Go back to profile
        </Link>
      </form>
    </Container>
  );
};

export default EditProfile;
