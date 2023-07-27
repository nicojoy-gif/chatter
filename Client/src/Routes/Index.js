import  { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Components/Home/About";
import Home from "../Components/Home/Home";
import Sign from "../Components/Home/Signup";
import Login from "../Components/Home/Login";
import ErrorPage from "../Components/ErrorPage";
import Dashbord from "../Components/Dashboard/Dashbord";
import LogoutPage from "../Components/Home/Logout";
import Post from "../Components/Posts/Post";
import Profile from "../Components/Account/Profile";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Account from "../Components/Account/Account";
import AccountSetting from "../Components/Account/AccountSetting";
import PostDetails from "../Components/Posts/PostDetails";

import BookmarkedPosts from "../Components/bookmark/BookmarkedPostsPage";
import MatchedPosts from "../Components/bookmark/Matched";
import MatchedPostsPage from "../Components/bookmark/MatchPostPage";
import AnalyticsView from "../Components/Analytics/AnaltyicView";

function Index() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dash" element={<Dashbord />} />
        <Route path="/dashs/:id" element={<PostDetails />} />
        <Route path="/post" element={<Post />} />
        <Route path="/setting" element={<AccountSetting />} />
        <Route
          path="/sign"
          element={ <Sign />}
        />
        <Route path="/matched-posts/:tag" element={<MatchedPostsPage />} />
        <Route path="/analytics" element={<AnalyticsView />}/>
        <Route path="/match" element={<MatchedPosts />} /> {/* Updated route */}
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/login"
          element={ <Login />}
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
