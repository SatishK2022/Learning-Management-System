import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Courses",
    path: "/all-courses",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function handleLogOut(e) {
    e.preventDefault();

    // TODO: write the logic

    navigate("/");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const isActiveNavItem = (path) => {
    return location.pathname === path;
  };

  return (
    <Container className="bg-zinc-900">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <h2 className="text-lg font-bold uppercase">Logo</h2>
          </Link>
        </div>
        <ul className="hidden lg:flex items-center gap-8">
          {navItems && navItems.length > 0
            ? navItems.map((item) => (
                <>
                  <li
                    key={item.name}
                    className={`font-semibold transition-all duration-200 ease-in-out hover:text-orange-500 ${
                      isActiveNavItem(item.path) ? "text-orange-500" : ""
                    }`}
                  >
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                </>
              ))
            : null}
          {isLoggedIn && role === "ADMIN" && (
            <li className="font-semibold hover:text-orange-500 transition-all duration-200 ease-in-out">
              <Link to="/admin/dashboard">Admin</Link>
            </li>
          )}
        </ul>

        {isLoggedIn ? (
          <div className="hidden lg:flex gap-4">
            <Link to={"/user/profile"}>
              <button className="btn text-base text-white bg-orange-500 hover:bg-orange-600 font-semibold px-8 rounded-full">
                Profile
              </button>
            </Link>
            <Link onClick={handleLogOut}>
              <button className="btn btn-error text-base text-white rounded-full font-semibold px-8">
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex gap-4">
            <Link to={"/signup"}>
              <button className="btn text-base btn-outline font-semibold px-8 rounded-full">
                Sign Up
              </button>
            </Link>
            <Link to={"/login"}>
              <button className="btn text-base rounded-full text-white font-semibold px-8 bg-orange-500 hover:bg-orange-600">
                Login
              </button>
            </Link>
          </div>
        )}
        <div className="lg:hidden">
          <FiMenu
            onClick={toggleMenu}
            className="h-6 w-6 cursor-pointer"
            size={30}
          />
        </div>

        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition-all lg:hidden">
            <div className="divide-y-2 divide-black rounded-lg bg-zinc-900 shadow-lg ring-1 ring-white ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link to={"/"}>
                      {/* <img className="w-32 lg:w-40" src={logo} alt="Logo" /> */}
                      <h2 className="text-lg font-bold uppercase">Logo</h2>
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-400 transition-all duration-300 ease-in-out"
                    >
                      <AiOutlineClose size={30} className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="flex flex-col gap-5">
                    {isLoggedIn && role === "ADMIN" ? (
                      <Link
                        to="/admin/dashboard"
                        className="-m-3 flex items-center rounded-full p-3 text-sm font-semibold hover:bg-slate-600/20"
                      >
                        <span className="ml-3 text-base font-medium text-gray-300">
                          Admin
                        </span>
                      </Link>
                    ) : null}
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={handleMenuClose}
                        className="-m-3 flex items-center rounded-full p-3 text-sm font-semibold hover:bg-slate-600/20"
                      >
                        <span className="ml-3 text-base font-medium text-gray-300">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                    {isLoggedIn ? (
                      <div className="flex flex-wrap text-center lg:hidden w-full gap-4">
                        <Link to={"/user/profile"} onClick={handleMenuClose}>
                          <button className="btn text-base text-white bg-orange-500 hover:bg-orange-600 font-semibold px-8 rounded-full">
                            Profile
                          </button>
                        </Link>
                        <Link onClick={handleLogOut}>
                          <button className="btn btn-error text-base text-white rounded-full font-semibold px-8">
                            Logout
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-wrap text-center lg:hidden w-full gap-4">
                        <Link to={"/signup"} onClick={handleMenuClose}>
                          <button className="btn text-base btn-outline font-semibold px-8 rounded-full">
                            Sign Up
                          </button>
                        </Link>
                        <Link to={"/login"} onClick={handleMenuClose}>
                          <button className="btn text-base rounded-full text-white font-semibold px-8 bg-orange-500 hover:bg-orange-600">
                            Login
                          </button>
                        </Link>
                      </div>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Header;
