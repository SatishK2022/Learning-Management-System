import React, { useState } from "react";
import { Container } from "../../components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/slices/authSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
  });

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!userInput.oldPassword || !userInput.newPassword) {
      toast.error("All Fields are required");
      return;
    }

    const response = await dispatch(changePassword(userInput));

    if (response?.payload?.success) {
      setUserInput({
        oldPassword: "",
        newPassword: "",
      });

      navigate("/user/profile");
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;

    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function toggleShowOldPassword() {
    setShowOldPassword(!showOldPassword);
  }

  function toggleShowNewPassword() {
    setShowNewPassword(!showNewPassword);
  }

  return (
    <Container className="min-h-[90vh] w-full flex items-center justify-center">
      <form
        noValidate
        onSubmit={(e) => handleFormSubmit(e)}
        className=" bg-slate-900/20 p-5 rounded-lg flex flex-col w-full md:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]"
      >
        <h1 className="text-xl lg:text-2xl font-bold text-center uppercase pb-5">
          Change Password
        </h1>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="oldPassword" className="font-semibold">
            Old Password
          </label>
          <div className="border px-2 py-2 rounded-md flex items-center">
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              value={userInput.oldPassword}
              onChange={handleUserInput}
              placeholder="Enter your old password"
              className="bg-transparent w-full border-none outline-none relative"
            />
            <span className="cursor-pointer" onClick={toggleShowOldPassword}>
              {showOldPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="newPassword" className="font-semibold">
            New Password
          </label>
          <div className="border px-2 py-2 rounded-md flex items-center">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={userInput.newPassword}
              onChange={handleUserInput}
              placeholder="Enter your new password"
              className="bg-transparent w-full border-none outline-none relative"
            />
            <span className="cursor-pointer" onClick={toggleShowNewPassword}>
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>
        <button className="w-full mt-4 select-none bg-orange-500 hover:bg-orange-600 rounded-md px-5 py-2 text-white font-bold transition-all duration-200 ease-in">
          Change Password
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
}

export default ChangePassword;
