import React, { useContext, useEffect, useState } from "react";
import n2 from "../styles/a2.png";
import n5 from "../styles/Vector (3).png";
import axios from "axios";
import { format } from "timeago.js";
import avatar from "../styles/avatar.png";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
interface TimelineProps {
  Post: any;
}

const Foryou: React.FunctionComponent<TimelineProps> = ({ Post }) => {
  const [user, setUser] = useState<any>({});
  const [like, setLike] = useState<number>(Post.likes.length);
  const [isliked, setisLiked] = useState<boolean>(false);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setisLiked(Post.likes.includes(currentUser._id));
  }, [currentUser._id, Post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://chattered.onrender.com/api/users?userId=${Post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [Post.userId]);

  const likeHandler = () => {
    try {
      axios.put(
        "https://chattered.onrender.com/api/posts/" + Post._id + "/like",
        {
          userId: currentUser._id,
        }
      );
    } catch (err) {}
    setLike(isliked ? like - 1 : like + 1);
    setisLiked(!isliked);
  };

  return (
    <div>
      <section className="border border-gray-200 rounded">
        <div className="m-5 lg:w-4/5">
          <div className="flex  content-center py-2">
            <div className="grid content-center">
              <img
                className="h-12 w-12 rounded-full "
                src={avatar || user.profilePicture}
                alt="avatar"
              />
            </div>
            <div>
              <Link to={`/profile/${user.username}`}>
                <h3 className="font-semibold text-xl p-2 pointer-cursor">
                  {user.username}
                </h3>
              </Link>
              <p className="px-2 text-gray-400">
                Product designer .{format(Post.createdAt)}
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold  text-2xl">
              Starting out as a Product designer
            </p>
            <div className="flex pb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="m-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.706c-2.938-1.83-7.416-2.566-12-2.706v17.714c3.937.12 7.795.681 10.667 1.995.846.388 1.817.388 2.667 0 2.872-1.314 6.729-1.875 10.666-1.995v-17.714c-4.584.14-9.062.876-12 2.706zm-10 13.104v-13.704c5.157.389 7.527 1.463 9 2.334v13.168c-1.525-.546-4.716-1.504-9-1.798zm20 0c-4.283.293-7.475 1.252-9 1.799v-13.171c1.453-.861 3.83-1.942 9-2.332v13.704zm-2-10.214c-2.086.312-4.451 1.023-6 1.672v-1.064c1.668-.622 3.881-1.315 6-1.626v1.018zm0 3.055c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0-2.031c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0 6.093c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0-2.031c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm-16-6.104c2.119.311 4.332 1.004 6 1.626v1.064c-1.549-.649-3.914-1.361-6-1.672v-1.018zm0 5.09c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017zm0-2.031c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.316-6-1.626v1.017zm0 6.093c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017zm0-2.031c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017z" />
              </svg>
              <p className="text-gray-400 py-2">10 mins read</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500 pt-2 pb-2">
              {Post.desc} A product designer makes a practical and functional
              product as artistic and attractive to a consumer as possible. It
              takes creativity, consumer-savvy, and the know-how to take a
              product from ideation all the way to production. To break things
              down further, the product development usually starts with that
              idea.
            </p>
            <img
              src={Post.img ? PF + Post.img : n2}
              className="h-52 w-screen"
              alt="postphotos"
            />
          </div>
          <div className="flex justify-between my-3">
            <div className="flex cursor-pointer">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
              </svg>
              <p className="text-gray-400 px-1">200</p>
            </div>
            <div className="flex cursor-pointer">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                onClick={likeHandler}
              >
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
              </svg>
              <p className="text-gray-400 px-1">{like}</p>
            </div>
            <div className="flex cursor-pointer">
              <div className="border-2 border-gray-500 h-4 w-4 content-center grid m-1 ">
                <img src={n5} alt="vector" className="p-1" />
              </div>
              <p className="text-gray-400">2450 views</p>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </div>
  );
};

export default Foryou;
