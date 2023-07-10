import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MatchedPosts from "./Matched";
import Homesidenav from "./Homesidenav";
import Topbar from "./Topbar";
type SidebarProps = {
  isOpen: boolean;
  onToggleSidebar: () => void;
};

const MatchedPostsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [matchingPosts, setMatchingPosts] = useState<any[]>([]);

  const toggleSidebar = () => {
    console.log("open");
    setSidebarOpen(!sidebarOpen);
  };
  const { tag } = useParams();

  return (
    <div className="lg:!pl-[240px]">
      <Topbar onToggleSidebar={toggleSidebar} />
      <Homesidenav isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
      <MatchedPosts tag={tag} matchingPosts={[]} />
    </div>
  );
};

export default MatchedPostsPage;
