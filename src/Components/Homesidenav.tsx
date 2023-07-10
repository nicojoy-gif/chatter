import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import n from "../styles/Vect.png";
import n1 from "../styles/Vec.png";
import n3 from "../styles/Vector (1).png";
import n4 from "../styles/Vector (2).png";
import n5 from "../styles/Vector (3).png";
import n6 from "../styles/Vector (4).png";
import n8 from "../styles/Vector (5).png";
import n7 from "../styles/evaTrendingUpOutline2.png";
import axios from "axios";
import MatchedPosts from "./Matched";

type SidebarProps = {
  isOpen: boolean;
  onToggleSidebar: () => void;
};

type Post = {
  tags: string[];
};

function Homesidenav({ isOpen }: SidebarProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [matchingPosts, setMatchingPosts] = useState<Post[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleNav = () => {
    setShowSidebar(!showSidebar);
  };
  const handleTagClick = async (tag: string) => {
    setSelectedTag(tag);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/search?tag=${tag}`
      );
      setMatchingPosts(response.data);
    } catch (error) {
      console.log(error);
    }
    navigate(`/matched-posts/${tag}`);
  };

  useEffect(() => {
    if (selectedTag) {
      console.log(selectedTag);
    }
  }, [selectedTag]);

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav
          id="sidenav-1"
          className={`fixed left-0 border-r border-gray-300 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white lg:data-[te-sidenav-hidden='false']:translate-x-0 ${
            isOpen ? "" : "translate-x-0"
          }`}
          data-te-sidenav-init
          data-te-sidenav-hidden="false"
          data-te-sidenav-position="absolute"
        >
          {/* Overview */}
          <section>
            <NavLink
              className="text-2xl font-semibold font-heading py-2"
              to="/"
            >
              <h1 className="text-indigo-600 font-bold pt-2 mx-12">CHATTER</h1>
            </NavLink>
            <h3 className="relative mx-12 text-md font-medium py-1">
              Overview
            </h3>
            <ul className="relative mx-10 list-none" data-te-sidenav-menu-ref>
              <li className="relative text-center">
                <NavLink
                  to="/dash"
                  className={`flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none`}
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400">
                    <img
                      src={n}
                      alt="vector"
                      className="brightness-0 h-4 w-4"
                    />
                  </span>
                  <span className="">Feed</span>
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to="/bookmark"
                  className="flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    <img src={n1} alt="vector" className="h-4 w-4" />
                  </span>
                  <span className="">Bookmarks</span>
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to=""
                  className="flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    <img src={n3} alt="vector" className="h-4 w-4" />
                  </span>
                  <span className="">Team blogs</span>
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to=""
                  className="flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    <img src={n4} alt="vector" className="h-4 w-4" />
                  </span>
                  <span className="">Drafts</span>
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to=""
                  className="flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    <div className="border-2 border-gray-500 h-4 w-4">
                      <img src={n5} alt="vector" className="p-1 " />
                    </div>
                  </span>
                  <span className="">Analytics</span>
                </NavLink>
              </li>
              {/* Add other menu items here */}
            </ul>
            <div className=" flex  mx-10 content-center text-center justify-center">
              <h3 className="relative  text-md font-medium py-2 ">
                Trending Tags{" "}
              </h3>
              <div className="flex-initial  my-auto">
                <img src={n7} alt="vector" className="mx-3" />
              </div>
            </div>
            <ul className="relative mx-10  list-none " data-te-sidenav-menu-ref>
              <li className="relative text-center">
                <NavLink
                  to=""
                  className={`flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none ${
                    selectedTag === "Programming" ? "active" : ""
                  }`}
                  data-te-sidenav-link-ref
                  onClick={() => handleTagClick("Programming")}
                >
                  <span>Programming</span>
                  {selectedTag === "Programming" &&
                    matchingPosts.length > 0 && (
                      <span className="ml-1 text-xs text-gray-500">
                        ({matchingPosts.length})
                      </span>
                    )}
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to=""
                  className={`flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none ${
                    selectedTag === "Datascience" ? "active" : ""
                  }`}
                  data-te-sidenav-link-ref
                  onClick={() => handleTagClick("Datascience")}
                >
                  <span>Datascience</span>
                  {selectedTag === "Datascience" &&
                    matchingPosts.length > 0 && (
                      <span className="ml-1 text-xs text-gray-500">
                        ({matchingPosts.length})
                      </span>
                    )}
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to=""
                  className={`flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none ${
                    selectedTag === "Technology" ? "active" : ""
                  }`}
                  data-te-sidenav-link-ref
                  onClick={() => handleTagClick("Technology")}
                >
                  <span>Technology</span>
                  {selectedTag === "Technology" && matchingPosts.length > 0 && (
                    <span className="ml-1 text-xs text-gray-500">
                      ({matchingPosts.length})
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to=""
                  className={`flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none ${
                    selectedTag === "Machine Learning" ? "active" : ""
                  }`}
                  data-te-sidenav-link-ref
                  onClick={() => handleTagClick("Machine Learning")}
                >
                  <span>Machine Learning</span>
                  {selectedTag === "Machine Learning" &&
                    matchingPosts.length > 0 && (
                      <span className="ml-1 text-xs text-gray-500">
                        ({matchingPosts.length})
                      </span>
                    )}
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to=""
                  className={`flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none ${
                    selectedTag === "Politics" ? "active" : ""
                  }`}
                  data-te-sidenav-link-ref
                  onClick={() => handleTagClick("Politics")}
                >
                  <span>Politics</span>
                  {selectedTag === "Politics" && matchingPosts.length > 0 && (
                    <span className="ml-1 text-xs text-gray-500">
                      ({matchingPosts.length})
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="relative text-center">
                <NavLink
                  to="/dash"
                  className="flex h-7 cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
                  data-te-sidenav-link-ref
                >
                  See all
                </NavLink>
              </li>
            </ul>
            <h3 className="relative mx-12 px-1 text-md font-medium py-1">
              Personal
            </h3>
            <ul className="relative mx-10  list-none " data-te-sidenav-menu-ref>
              <li className="relative text-center">
                <NavLink
                  to="/setting"
                  className="flex h-9  cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-500 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-blue-500 active:outline-none  data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none  "
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 ">
                    <img src={n6} alt="vector" className="h-4 w-4" />
                  </span>
                  <span className="">Account</span>
                </NavLink>
              </li>
            </ul>

            <div className="text-center">
              <NavLink to="/logout">
                <button
                  className=" text-red-500 font-medium    "
                  data-te-sidenav-toggle-ref
                  data-te-target="#sidenav-1"
                  aria-controls="#sidenav-1"
                >
                  Log out
                </button>
              </NavLink>
            </div>
            {/* Add other sections and menu items here */}
          </section>
        </nav>
      </div>
      {/* Matched Posts */}
      {selectedTag && (
        <MatchedPosts tag={selectedTag} matchingPosts={matchingPosts} />
      )}
    </div>
  );
}

export default Homesidenav;
