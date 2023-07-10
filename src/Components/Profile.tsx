import React, { useEffect, useState } from "react";
import Homesidenav from "./Homesidenav";
import avatar from "../styles/avatar.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import Feed from "./Feed";
import background from "../styles/background.jpg";
import Topbar from "./Topbar";

function Profile() {
  const [user, setUser] = useState<any>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    user.profilePicture || avatar
  );

  const username = useParams().username;
  const params = useParams();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfilePictureChange = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);

      const formData = new FormData();
      formData.append("profilePicture", file);
      axios
        .put(`http://localhost:5000/api/users/${user.id}`, formData)
        .then((res) => {
          console.log("Profile picture updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update profile picture", error);
        });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users?username=${username}`
        );
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      <Topbar onToggleSidebar={toggleSidebar} />
      <Homesidenav isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

      <div className="lg:!pl-[240px]">
        <div className="grid">
          <div className="h-96 relative w-full">
            <img
              src={user.coverPicture || background}
              className="w-full h-80"
              alt="coverpicture"
            />

            <label htmlFor="profilePictureInput">
              <img
                className="h-36 w-36 rounded-full absolute right-1/2 mx-auto top-56 border-white border-2"
                src={profilePicture}
                alt="avatar"
              />
            </label>
            <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
            />
          </div>

          <div className="profileInfo text-center">
            <h4 className="profileInfoName uppercase my-0 py-0 text-xl font-semibold">
              {user.username}
            </h4>
            <span className="profileInfoDesc font-medium">{user.desc}</span>
          </div>
        </div>
        <div className="profileRightBottom">
          <Feed username={username} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
