import React, { useContext, useEffect, useState } from "react";
import n2 from "../../styles/a2.png";
import n5 from "../../styles/Vector (3).png";
import axios from "axios";
import { format } from "timeago.js";
import avatar from "../../styles/avatar.png";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {Helmet} from 'react-helmet'
import { logEvent } from "../ga";
interface TimelineProps {
  Post: any;
}
interface Comment {
  id: number;
  text: string;
}
const Timeline: React.FunctionComponent<TimelineProps> = ({ Post }) => {
  const [user] = useState<any>({});
  const [like, setLike] = useState<number>(Post.likes ? Post.likes.length : 0); 
  const [isliked, setisLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<any>("");
  const [viewCount, setViewCount] = useState<number>(Post.likes ? Post.view.length : 0);
  const [view, setView] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState(0);
  const [isCommentBoxOpen, setCommentBoxOpen] = useState(false);

  const [bookmarks, setBookmarks] = useState<{ _id: string }[]>([]);
  const { user: currentUser } = useContext(AuthContext);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    Post.bookmarks?.includes(currentUser?._id) || false
  );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setisLiked(Post.likes.includes(currentUser?._id));
  }, [currentUser._id, Post.likes]);
  console.log(Post.tags);
  useEffect(() => {
    setView(Post.view.includes(currentUser?._id));
  }, [currentUser._id, Post.view]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${Post._id}/comments`
        );
        const fetchedComments = response.data;

        setComments(fetchedComments);
        setCommentCount(fetchedComments.length);
      } catch (err) {
        console.error("Error:", err);
        // Handle the error accordingly
      }
    };

    fetchComments();
  }, [Post._id]);

  const bookmarkHandler = async () => {
    setIsBookmarked(!isBookmarked);
    console.log(bookmarks)
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${Post._id}/bookmarks`,
        {
          userId: currentUser._id,
        }
      );
  
      const { message, bookmarks } = response.data;
  
      if (
        message === "Post added to bookmarks" ||
        message === "Post removed from bookmarks"
      ) {
        setBookmarks(bookmarks);
      
        console.log(bookmarks);
      }
    } catch (error) {
      console.error("Error adding/removing bookmark:", error);
    }
  
    // Track the bookmark event
    logEvent('Post Bookmarked', { postId: Post._id });
  };
  
  const toggleCommentBox = () => {
    setCommentBoxOpen(!isCommentBoxOpen);
  };

  const likeHandler = () => {
    try {
      axios.put("http://localhost:5000/api/posts/" + Post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
  
    // Track the like event
    logEvent('Post Liked', { postId: Post._id });
  
    setLike(isliked ? like - 1 : like + 1);
    setisLiked(!isliked);
  };
  

  const incrementViewCount = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/posts/" + Post._id + "/view",
        { userId: currentUser._id }
      );
      console.log(response);
  
      // Track the view event
      logEvent('Post Viewed', { postId: Post._id });
    } catch (error) {
      console.error("Error:", error);
      // Handle the error accordingly
    }
  
    setViewCount(viewCount);
    setView(!view);
  };
  
  // Function to handle opening and closing of the comment box
  const handlePostComment = () => {
    const newComment: Comment = {
      id: comments.length + 1,
      text: comment,
    };

    setComments([...comments, newComment]);
    setCommentCount(commentCount + 1);
    setComment("");
  };

  const commentHandler = async (userId: any, commentText: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/" + Post._id + "/comments",
        {
          text: commentText,
          userId: userId,
        }
      );
  
      const newComment = response.data.comment;
  
      console.log("New Comment:", newComment);
    } catch (err) {
      console.error("Error:", err);
    }
    handlePostComment();
  
    // Track the comment event
    logEvent('Post Commented', { postId: Post._id });
  };
  
  return (
    <div>
       <Helmet>
        <title>{Post.title}</title>
        <meta name="description" content={Post.subtitle} />
      </Helmet>
      <section className="border border-gray-200 rounded justify-center flex">
        <div className="m-5 lg:w-4/5 justify-center">
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
                {user.occupation} .{format(Post.createdAt)}
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold  text-2xl">{Post.title}</p>
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
            <p className="text-gray-500 pt-2 pb-2">{Post.subtitle} </p>
            <p className="text-blue-500 pt-2 pb-2">
              {Post.tags.map((tag: string, index: number) => (
                <span key={index} className="text-blue-500 font-bold">
                  #{tag}
                </span>
              ))}
            </p>
            <p className="text-blue-500 font-bold" onClick={incrementViewCount}>
              <Link to={`/dashs/${Post._id}`} onClick={incrementViewCount}>
                Read more...
              </Link>
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
                onClick={toggleCommentBox}
              >
                <path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
              </svg>
              <p className="text-gray-400 px-1">{commentCount}</p>
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
              <p className="text-gray-400">{viewCount} views</p>
            </div>
            <div className="flex cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isBookmarked ? "blue" : "gray"}
                onClick={bookmarkHandler}
                stroke={isBookmarked ? "blue" : "gray"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bookmark"
              >
                <path d="M4 2h16c1.1 0 2 .9 2 2v18l-8-4-8 4V4c0-1.1.9-2 2-2z" />
              </svg>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="cursor-pointer"
                onClick={bookmarkHandler}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
                />
              </svg>

              <p className="text-gray-400 px-1"></p>
            </div>
          </div>
          <div>
            {isCommentBoxOpen && (
              <div className="mt-4">
                {comments.map((comment) => (
                  <div key={comment.id}>{comment.text}</div>
                ))}
                <div className="relative">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none resize-none "
                  />
                  <button
                    onClick={() => commentHandler(currentUser._id, comment)}
                    className="absolute right-3 bottom-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <hr />
    </div>
  );
};

export default Timeline;
