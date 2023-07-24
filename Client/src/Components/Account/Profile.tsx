import React, { useContext, useEffect, useState } from 'react';
import Homesidenav from '../Nav/Homesidenav';
import avatar from '../../styles/avatar.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Feed from '../Dashboard/Feed';
import background from '../../styles/background.jpg';
import Topbar from '../Nav/Topbar';
import { Helmet } from 'react-helmet';
import ProfilePictureInput from './ProfilePictureInput';
import { AuthContext } from '../../context/AuthContext';

function Profile() { 
  const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const { user: contextUser, dispatch } = useContext(AuthContext);
const [user, setUser] = useState(initialUser || contextUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || avatar);

  const PF = "https://chattered.onrender.com/images/";
  const updateUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    dispatch({ type: "UPDATE_USER_FROM_STORAGE", payload: initialUser });
  };
  useEffect(() => {
    updateUserFromLocalStorage();
  }, []);
  const username = useParams().username;
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
console.log(contextUser)

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`https://chattered.onrender.com/api/users?username=${username}`);
      setUser(res.data);
      dispatch({ type: 'UPDATE_USER_FROM_STORAGE', payload: res.data });
      setProfilePicture(res.data.profilePicture || avatar);

      // Save the profile picture URL to localStorage
      localStorage.setItem('profilePicture', res.data.profilePicture || avatar);
    } catch (error) {
      console.error(error);
    }
  };
  fetchUser();
}, [username]);
const handleProfilePictureChange = async (file: File) => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  try {
    // Send the file to the backend API endpoint
    await updateUserProfilePicture(formData);

    // Update the profile picture in the UI
    setProfilePicture(URL.createObjectURL(file));

    // Save the new profile picture URL to localStorage
    localStorage.setItem('profilePicture', URL.createObjectURL(file));
  } catch (error) {
    console.error('Failed to update profile picture', error);
  }
};

const updateUserProfilePicture = async (formData: FormData) => {
  try {
    await axios.put(`https://chattered.onrender.com/api/users/${user._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw new Error('Failed to update profile picture');
  }
};


console.log(user)

console.log(contextUser)
  return (
    <div>
      <Helmet>
        <title>Account Profile</title>
        <meta name="description" content='Welcome to my Account Profile' />
      </Helmet>
      <Topbar onToggleSidebar={toggleSidebar} />
      <Homesidenav isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

      <div className='lg:!pl-[240px]'>
        <div className='grid'>
          <div className='h-96 relative w-full'>
            <img src={background} className='w-full h-80' alt='coverpicture' />

            <label htmlFor='profilePictureInput'>
              <img
                className='h-36 w-36 rounded-full absolute right-1/2 mx-auto top-56 border-white border-2'
                src={PF + profilePicture}
                alt='avatar'
              />
            </label>
            <ProfilePictureInput onChange={handleProfilePictureChange} />
          </div>

          <div className='profileInfo text-center'>
            <h4 className='profileInfoName uppercase my-0 py-0 text-xl font-semibold'>{user.username}</h4>
            <span className='profileInfoDesc font-medium'>{user.desc}</span>
          </div>
        </div>
        <div className='profileRightBottom'>
          <Feed username={username} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
