import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../Nav/Topbar";
import Homesidenav from "../Nav/Homesidenav";
import Timeline from "../Dashboard/Timeline";

const BookmarkedPosts = () => {
  // State to store the bookmarked posts
  const [bookmarkedPosts, setBookmarkedPosts] = useState<
    { _id: string; title: String; desc: string; content: string }[]
  >([]);
  const { user } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch bookmarked posts from the server
  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${user._id}/bookmarks`
        );
        const { data } = response;
        setBookmarkedPosts(data.bookmarks);
      } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
      }
    };

    fetchBookmarkedPosts();
  }, [user._id, bookmarkedPosts]);

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
