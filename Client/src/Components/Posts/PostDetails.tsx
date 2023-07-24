import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Topbar from "../Nav/Topbar";
import Homesidenav from "../Nav/Homesidenav";
import avatar from "../../styles/avatar.png";
import github from "../../styles/GitHub-Mark.png";
import linked from "../../styles/linkedin.png";
import { AuthContext } from "../../context/AuthContext";

interface Post {
  _id: string;
  title: string;
  desc: string;
  subtitle: string;
  img: string;
}

interface PostDetailsProps {
  Post: Post;
}

const PostDetails: React.FunctionComponent<PostDetailsProps> = ({ Post }) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState<Post | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const PF = "https://chattered.onrender.com/images/";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://chattered.onrender.com/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
        console.log(post?.img)
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Topbar onToggleSidebar={toggleSidebar} />
      <Homesidenav isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

      <div className="py-3  mb-5 " id="content">
        <section className="text-black p-5 lg:!pl-[240px] m-5">
          <div className="mb-4">
            <h2 className="font-semibold  text-2xl py-2">{post.title}</h2>
            <img
              src={post.img ? PF + post.img : ""}
              className="h-52 w-screen"
              alt="postphotos"
            />
            <p className="py-2 font-semibold">{post.subtitle}</p>
            <p>{post.desc}</p>
          </div>
          <div className="border border-gray-200 h-80 rounded-2xl my-5 shadow-2xl">
            <div className="w-full">
              <h2 className="text-3xl font-bold text-center py-2">Author</h2>
              <hr />
              <div className="grid content-center justify-center my-3">
                <div className="flex content-center place-items-center">
                  <img
                    className="h-20 w-20 rounded-full "
                    src={avatar || user.profilePicture}
                    alt="avatar"
                  />
                  <h3 className="text-xl font-semibold px-3">
                    {user.fullname}
                  </h3>
                </div>
                <div className="py-5">
                  <p className="text-center">I'm a {user.occupation}</p>
                </div>
                <div className="flex content-end justify-center">
                  <div className="w-10 h-10">
                    <Link to={user.github}>
                      <img src={github} className="" alt="githubIcon" />
                    </Link>
                  </div>
                  <div className="w-8 h-8 my-1 mx-2">
                    <Link to={user.LinkedIn}>
                      <img src={linked} className="" alt="githubIcon" />
                    </Link>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetails;
