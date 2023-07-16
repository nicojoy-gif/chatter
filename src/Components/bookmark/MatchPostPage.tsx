import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MatchedPosts from "./Matched";
import Homesidenav from "../Nav/Homesidenav";
import Topbar from "../Nav/Topbar";
import {Helmet} from 'react-helmet'


const MatchedPostsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    console.log("open");
    setSidebarOpen(!sidebarOpen);
  };
  const { tag } = useParams();

  return (
    <div className="lg:!pl-[240px]">
      <Helmet>
        <title>My Bookmarked Page </title>
        <meta name="description" content='Welcome to my Bookmarked Page ' />
      </Helmet>
      <Topbar onToggleSidebar={toggleSidebar} />
      <Homesidenav isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
      <MatchedPosts tag={tag} matchingPosts={[]} />
    </div>
  );
};

export default MatchedPostsPage;
