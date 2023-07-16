import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import avatarImage from "../../styles/avatar.png";
import vectorImage from "../../styles/Vector (5).png";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

type TopbarProps = {
  onToggleSidebar: () => void;
};

function Topbar({ onToggleSidebar }: TopbarProps) {
  const [searchTag, setSearchTag] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { user } = useContext(AuthContext);

  const handleSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tag = e.target.value;
    setSearchTag(tag);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/search?tag=${tag}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    console.log("Search clicked");
  };

  return (
    <div>
      <nav className="border-b border-gray-300 h-14 fixed w-full bg-white z-50">
        <div className="">
          <div className="grid place-items-center content-center">
            <div className="relative mt-1">
              <input
                type="text"
                id="password"
                className="w-text-gray-700 px-12 py-2 border border-gray-300 rounded-lg hover:border-gray-300 focus:outline-none focus:border-gray-500 transition-colors h-8"
                placeholder="Search chatter"
                value={searchTag}
                onChange={handleSearchInputChange}
              />
              <button
                className="block w-7 h-7 text-center text-xl leading-0 absolute top-1 left-3 text-gray-700 focus:outline-none hover:text-gray-900 transition-colors"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              {searchResults.length > 0 && (
                <ul className="absolute left-0 right-0 top-10 bg-white border border-gray-300 rounded-lg shadow z-10">
                  {searchResults.map((post) => (
                    <li key={post._id} className="px-4 py-2 hover:bg-gray-200">
                      <Link to={`/dashs/${post._id}`} className="text-blue-500">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex absolute right-1 lg:right-10 p-0 justify-end content-center place-items-center">
              <img src={vectorImage} className="px-2" alt="chatterVector" />
              <div className="grid content-center">
                {user && user.username && (
                  <Link to={`/profile/${user.username}`}>
                    <img
                      className="h-6 w-s6 rounded-full"
                      src={avatarImage}
                      alt="chatter-dp"
                    />
                  </Link>
                )}
              </div>
              <div className="sm:block  mx-2">
                <svg
                  onClick={onToggleSidebar}
                  className="z-30 flex items-center cursor-pointer right-10 top-6"
                  fill="black"
                  viewBox="0 0 100 80"
                  width="20"
                  height="20"
                >
                  <rect width="100" height="10"></rect>
                  <rect y="30" width="100" height="10"></rect>
                  <rect y="60" width="100" height="10"></rect>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Topbar;
