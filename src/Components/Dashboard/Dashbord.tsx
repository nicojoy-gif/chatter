import { useContext, useEffect, useState } from "react";
import n9 from "../../styles/v1.png";
import Homesidenav from "../Nav/Homesidenav";
import { Link, Outlet } from "react-router-dom";
import Feed from "./Feed";
import Topbar from "../Nav/Topbar";
import { AuthContext } from "../../context/AuthContext";
import Recent from "../linkedin/Recent";
import AllFeed from "./Allfeed";
import axios from "axios";
import { logPageView, logEvent } from '../ga';
import {Helmet} from 'react-helmet'



function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const { user: contextUser } = useContext(AuthContext);
  const [user, setUser] = useState(initialUser || contextUser);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
 
  
// Call logPageView to track a page view
useEffect(() => {
  logPageView();
}, []);
  useEffect(() => {
    if (contextUser) {
     
      setUser(contextUser);
      localStorage.setItem("user", JSON.stringify(contextUser));
    }
  
  }, [contextUser]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex === activeTab ? -1 : tabIndex);
  };

  

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Account Dashboard </title>
        <meta name="description" content='Welcome to my Account Dashboard ' />
      </Helmet>
      <Topbar onToggleSidebar={toggleSidebar} />
      <Homesidenav isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

      <div className="pt-3" id="content"></div>
      <section className="text-black p-5 lg:!pl-[240px] m-5">
        <div className="border border-gray-300 h-full m-auto py-5">
          <div className="w-5/6 m-auto">
            <div className="flex justify-between h-28 content-center place-items-center">
              <div className="">
                <h3 className="font-semibold text-2xl p-2">FEED</h3>
                <p className="text-gray-500 px-2">
                  Explore different content you'd love
                </p>
              </div>
              <Link to="/post">
                <button className="bg-indigo-700 w-54 h-10 text-sm flex-initial place-items-center content-center justify-center flex rounded-lg p-2 text-white">
                  <div className="grid place-items-center mx-1">
                    <img src={n9} alt="vector" className="h-4 w-4" />
                  </div>
                  Post a content
                </button>
              </Link>
            </div>
            <div className="border border-gray-300 cursor-pointer place-items-center rounded-lg h-12 grid grid-cols-3">
              <div>
                <h3
                  className={`font-semibold text-xl ${
                    activeTab === 0 ? "text-indigo-700" : ""
                  }`}
                  onClick={() => handleTabClick(0)}
                >
                  For you
                </h3>
              </div>
              <div>
                <h3
                  className={`font-semibold text-xl ${
                    activeTab === 1 ? "text-indigo-700" : ""
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  Featured
                </h3>
              </div>
              <div>
                <h3
                  className={`font-semibold text-xl ${
                    activeTab === 2 ? "text-indigo-700" : ""
                  }`}
                  onClick={() => handleTabClick(2)}
                >
                  Recent
                </h3>
              </div>
            </div>
            {activeTab === 0 && user && <AllFeed username={user.username} />}
            {activeTab === 1 && user && <Feed username={user.username} />}
            {activeTab === 2 && user && <Recent username={user?.username} />}
          </div>
        </div>
      </section>
      <Outlet />
    </div>
  );
}

export default Dashboard;
