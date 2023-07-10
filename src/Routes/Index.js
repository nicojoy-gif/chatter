import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Components/About";
import Home from "../Components/Home";
import Sign from "../Components/Signup";
import Login from "../Components/Login";
import ErrorPage from "../Components/ErrorPage";
import Dashbord from "../Components/Dashbord";
import LogoutPage from "../Components/Logout";
import Post from "../Components/Post";
import Profile from "../Components/Profile";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import App from "../Components/linkedin/App";
import Account from "../Components/Account";
import AccountSetting from "../Components/AccountSetting";
import PostDetails from "../Components/PostDetails";

import BookmarkedPosts from "../Components/bookmark/BookmarkedPostsPage";
import MatchedPosts from "../Components/Matched";
import MatchedPostsPage from "../Components/MatchPostPage";

function Index() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dash" element={<Dashbord />} />
        <Route path="/dashs/:id" element={<PostDetails />} />
        <Route path="/post" element={<Post />} />
        <Route path="/link" element={<App />} />
        <Route path="/setting" element={<AccountSetting />} />
        <Route
          path="/sign"
          element={user ? <Navigate to="/dash" /> : <Sign />}
        />
        <Route path="/matched-posts/:tag" element={<MatchedPostsPage />} />
        <Route path="/match" element={<MatchedPosts />} /> {/* Updated route */}
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dash" /> : <Login />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/onboarding" element={<Account />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/bookmark" element={<BookmarkedPosts />} />
      </Routes>
    </div>
  );
}

export default Index;
