import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../Nav/Topbar";
import Homesidenav from "../Nav/Homesidenav";
import Timeline from "../Dashboard/Timeline";

const BookmarkedPosts = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<
    { _id: string; title: string; desc: string; content: string }[]
  >(() => {
    // Retrieve bookmarked posts from localStorage when the component mounts
    const savedBookmarkedPosts = localStorage.getItem("bookmarkedPosts");
    return savedBookmarkedPosts ? JSON.parse(savedBookmarkedPosts) : [];
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
console.log(user)
  useEffect(() => {
    console.log(user)
    const fetchBookmarkedPosts = async () => {
      try {
        const response = await axios.get(
          `https://chattered.onrender.com/api/posts/${user._id}/bookmarks`
        );
        const { data } = response;
        setBookmarkedPosts(data.bookmarks);
        // Save the bookmarked posts to localStorage
        localStorage.setItem("bookmarkedPosts", JSON.stringify(data.bookmarks));
      } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
      }
    };

    fetchBookmarkedPosts();
  }, [user._id]);

  return (
    <div className="lg:!pl-[240px] ">
      <Topbar onToggleSidebar={toggleSidebar} />
      <Homesidenav isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

      {bookmarkedPosts.map((post) => (
        <div key={post._id}>
          <Timeline key={post._id} Post={post} />
        </div>
      ))}
    </div>
  );
};

export default BookmarkedPosts;
