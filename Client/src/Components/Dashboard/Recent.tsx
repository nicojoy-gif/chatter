import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Timeline from "./Timeline";
import { AuthContext } from "../../context/AuthContext";
import { AxiosResponse } from "axios";
interface FeedProps {
  username?: string;
}

type Post = {
  createdAt: string;
};
const Recent: React.FunctionComponent<FeedProps> = ({ username }) => {
  const [posts, setPost] = useState<any>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response: AxiosResponse<Post[]>;
        if (username) {
          response = await axios.get<Post[]>(
            "https://chattered.onrender.com/api/posts/profile/" + username
          );
        } else {
          response = await axios.get<Post[]>(
            "https://chattered.onrender.com/api/posts/recent/" + user?._id
          );
        }

        const sortedPosts = response.data
          .sort((p1: Post, p2: Post) => {
            const date1 = new Date(p1.createdAt);
            const date2 = new Date(p2.createdAt);
            return date2.getTime() - date1.getTime();
          })
          .slice(0, 4);

        setPost(sortedPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [username, user?._id]);

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

export default Recent;
