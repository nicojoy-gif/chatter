import { useState, useEffect, useContext } from "react";
import { getUserArticles } from "../FirebaseAnalytics/Article";
import { AuthContext } from "../../context/AuthContext";

export const Ana = () => {
    const [posts, setPosts] = useState<any>([]);
   const [loading, setLoading] = useState(false);
   const [postSummary, setPostSummary] = useState<any>({});
   const {user} = useContext(AuthContext)

console.log(user)
console.log(user.uid)
   //calculate the total summaries for each month
   const calcualtePostSummaries = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    //filter posts by the current month
    const filteredPosts = posts.filter((post: any) => {
       const postDate = new Date(post.data.createdAt);
       const postMonth = postDate.getMonth() + 1;
       return postMonth === currentMonth;
    });

    const totalPosts = filteredPosts.length;
    const totalViews = filteredPosts.reduce((sum: number, post: any) => sum + post.data.views, 0);
    const totalLikes = filteredPosts.reduce(
       (sum: number, post: any) => sum + post.data.likeCount,
       0
    );
    const totalComments = filteredPosts.reduce(
       (sum: number, post: any) => sum + post.data.comments.length,
       0
    );
    const monthName = currentDate.toLocaleString('default', {
       month: 'long',
    });
    const currentYear = currentDate.getFullYear();

    const newUpdate = {
       month: monthName,
       year: currentYear,
       totalPosts,
       totalViews,
       totalLikes,
       totalComments,
       filteredPosts,
    };
    setPostSummary(newUpdate);
 };

 useEffect(() => {
    const fetchUserArticles = async () => {
       try {
          if (user.id) {
             setLoading(true);
             const userArticles = await getUserArticles(user.id);
             console.log(userArticles)
             console.log(posts)
             console.log(user)
             console.log(user.id)
             console.log(loading)
             setPosts(userArticles);
             setLoading(false);
          }
       } catch (e) {
          console.log(e);
       }
    };

    fetchUserArticles();
 }, [user]);

 useEffect(() => {
    calcualtePostSummaries();
 }, [posts]);

 let highestViewedLikedAndCommentedPost = null;

 if (posts.length > 0) {
    highestViewedLikedAndCommentedPost = posts.reduce((prevPost: any, currentPost: any) => {
       if (
          currentPost.data.views > prevPost.data.views ||
          (currentPost.data.views === prevPost.data.views &&
             currentPost.data.likeCount > prevPost.data.likeCount)
       ) {
          return currentPost;
       }
       return prevPost;
    });
 }

 return {
    loading,
    posts,
    postSummary,
    highestViewedLikedAndCommentedPost,
 };
};


   
