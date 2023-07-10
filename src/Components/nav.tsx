import React, { useState } from "react";
import { NavLink } from "react-router-dom";
function Nav() {
  const [open, isOpen] = useState<boolean>(false);

  const opened = () => {
    isOpen(!open);
  };
  return (
    <div className="w-full">
      <div className=" ">
        <section className=" font-sans  sticky">
          <nav className="flex justify-between bg-white font-sans text-black shadow-lg ">
            <div className="px-5 xl:px-12 py-3 lg:flex  block w-full items-center ">
              <div className="flex justify-between ">
                <NavLink className="text-3xl font-bold font-heading" to="/">
                  <h1 className="text-indigo-600 font-bold">CHATTER</h1>
                </NavLink>
                <NavLink
                  className="navbar-burger  lg:hidden"
                  to="#"
                  onClick={opened}
                >
                  <svg
                    className={`fill-current h-6 w-6 ${
                      open ? "hidden" : "block"
                    }`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                  <svg
                    className={`fill-current h-6 w-6 ${
                      open ? "block" : "hidden"
                    }`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  </svg>
                </NavLink>
              </div>
              <ul
                className={`  mx-auto font-semibold font-heading lg:space-x-6 space-x-0  lg:mt-0 mt-5 w-full block lg:flex lg:items-center lg:w-auto  ${
                  open ? "block" : "hidden"
                }`}
              >
                <li className="lg:py-0 py-3">
                  <NavLink className=" lg:mt-0    hover:text-gray-700" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="lg:py-0 py-3">
                  <NavLink className="hover:text-gray-700" to="/about">
                    About us
                  </NavLink>
                </li>
                <li className="lg:py-0 py-3">
                  <NavLink className="hover:text-gray-700" to="/footer">
                    Contact
                  </NavLink>
                </li>
                <li className="lg:py-0 py-3">
                  <NavLink className="hover:text-gray-700" to="/dash">
                    Blogs
                  </NavLink>
                </li>
              </ul>

              <div
                className={` lg:flex items-center  lg:space-x-5 space-x-0 items-center  ${
                  open ? "block" : "hidden"
                }`}
              >
                <NavLink className="hover:text-gray-200 " to="login">
                  <button className="bg-white w-full lg:w-28 lg:my-0 my-3 hover:border-indigo-900 text-black font-semibold py-2 px-4 border border-indigo-600 rounded-lg ">
                    Log in
                  </button>
                </NavLink>
                <NavLink
                  className="flex items-center hover:text-gray-200"
                  to="/sign"
                >
                  <button className="bg-indigo-600 w-full lg:w-28  hover:bg-indigo-700 text-white font-semibold py-2 px-4 border  rounded-lg shadow">
                    Sign up
                  </button>
                </NavLink>
              </div>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
}

export default Nav;
