import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Timeline from "./Timeline";
import { AuthContext } from "../../context/AuthContext";

interface FeedProps {
  username?: string;
}
type Post = {
  createdAt: string;
  _id: string;
};
const AllFeed: React.FunctionComponent<FeedProps> = ({ username }) => {
  const [posts, setPost] = useState<any>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response: any;
        if (username) {
          response = await axios.get("https://chattered.onrender.com/api/posts");
        } else {
          response = await axios.get(
            "https://chattered.onrender.com/api/posts/timeline/" + user._id
          );
        }

        const sortedPosts = response.data.data.posts.sort(
          (p1: Post, p2: Post) => {
            const date1 = new Date(p1.createdAt);
            const date2 = new Date(p2.createdAt);
            return date2.getTime() - date1.getTime();
          }
        );

        console.log(sortedPosts);
        setPost(sortedPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [username, user._id]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div>
      {!username || username === user.username}
      {posts.map((p: any) => (
        <Timeline key={p._id} Post={p} />
        
      ))}
    </div>
  );
};

export default AllFeed;
