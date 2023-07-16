import React, { useEffect, useState } from "react";
import axios from "axios";
import Timeline from "../Dashboard/Timeline";

type MatchedPostsProps = {
  tag: string;
  matchingPosts: any;
};

type Post = {
  id: string;
  title: string;
  content: string;
};

const MatchedPosts: React.FC<MatchedPostsProps> = ({ tag }) => {
  const [matchedPosts, setMatchedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchMatchedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/search?tag=${tag}`
        );
        console.log(tag);
        console.log(response);
        const { data } = response;
        setMatchedPosts(data);
      } catch (error) {
        console.error("Error fetching matched posts:", error);
      }
    };

    fetchMatchedPosts();
  }, [tag]);

  return (
    <div>
      <h2>Matching Posts for Tag: {tag}</h2>
      {matchedPosts.map((p: any) => (
        <Timeline key={p} Post={p} />
      ))}
    </div>
  );
};

export default MatchedPosts;
