import React from 'react';

import { useAnalytics } from './useAnalytics';
import { useUserContext } from '../../context/UserContext';

export const Highlights = (): React.JSX.Element => {
   const { loading, highestViewedLikedAndCommentedPost, postSummary } = useAnalytics();
   const { userUID } = useUserContext();
   console.log(userUID)
   console.log(postSummary)
   const { filteredPosts } = postSummary;
   if (
      (!filteredPosts && !loading) ||
      (!filteredPosts && loading) ||
      (loading && highestViewedLikedAndCommentedPost === null)
   )
      return <div></div>;

   console.log(filteredPosts);
   console.log(highestViewedLikedAndCommentedPost);
   const createdDate = new Date(filteredPosts[0]?.data?.createdAt);

   const currentDate = new Date();
   const timeDifference = currentDate.getTime() - createdDate.getTime();
   return (
      <div
         className='rounded-md m-8 p-8 tabletXS:m-3  mobileXL:px-2 h-full transition duration-500 ease-in-out'>
         {filteredPosts.length > 0 && (
            <div>
               <div className=" border-b-2 pb-3 border-pink-600">
                  <h2  className={`text-2xl font-bold mb-3`}>
                     Post Analytics
                  </h2>

                  <h2  className={`text-base font-normal`}>
                     <span> (filteredPosts[0]?.data?.createdAt), </span>
                    
                  </h2>
               </div>

               <div className=" flex items-center">
                  <h2  className={`text-xl font-bold mb-6 mt-6`}>
                     Top Post
                  </h2>

                  <h2  className={`ms-12 text-lg font-normal`}>
                     earned {filteredPosts[0]?.data?.views} views
                  </h2>
               </div>

               <div>
                  <article className="tabletXS:my-3 mobileXL:px-2 cursor-pointer">
                     <div>
                        <h2
                           
                           className=" text-3xl mobileXL:text-xl font-bold mb-2"
                        >
                           {filteredPosts[0]?.data?.title}
                        </h2>

                        <h2
                           
                           className=" text-2xl mobileXL:text-lg font-normal mb-2"
                        >
                           {filteredPosts[0]?.data?.subtitle.substring(0, 75) + ' ... '}
                        </h2>

                        <h2  className="font-semibold mb-1">
                           (filteredPosts[0]?.data?.body) mins read
                        </h2>

                        <div className="flex flex-wrap items-center my-3">
                           {filteredPosts[0]?.data?.tagList.map((tag: string, index: number) => (
                              <div key={index} className="me-2">
                                 <span>#</span>
                                 <span className=" text-sm font-semibold text-pink-600">{tag}</span>
                              </div>
                           ))}
                        </div>
                        {filteredPosts[0]?.data?.coverImage && (
                           <div className=" relative object-cover max-w-[600px] h-[300px] my-3">
                              <img
                                 src={filteredPosts[0]?.data?.coverImage}
                                 alt={filteredPosts[0]?.data?.title}
                                 className=" object-cover h-full w-full"
                              />
                           </div>
                        )}
                     </div>
                  </article>
               </div>
            </div>
         )}
         <div>
            <div className=" border-b-2 pb-3 border-pink-600">
               <h2  className={`text-2xl mobileXL:text-xl font-bold  mt-6`}>
                  Posts Summary
               </h2>
            </div>

            <div>
               <div className="mt-4">
                  <h2  className={`font-normal mb-3`}>
                     <span> {postSummary?.month} </span>
                     <span> {postSummary?.year} </span>
                     <span> Summary </span>
                  </h2>
               </div>

               <div className=" flex items-center justify-between  flex-wrap max-w-[400px]">
                  <h2  className={`text-base  font-semibold mb-3`}>
                     <span> {postSummary?.totalPosts} </span>
                     <span>{postSummary?.totalPosts > 1 ? 'Total Posts' : 'Total Post'}</span>
                  </h2>

                  <h2  className={`text-base  font-semibold  mb-3`}>
                     <span> {postSummary?.totalViews} </span>
                     <span>{postSummary?.totalViews > 1 ? 'Impressions' : 'Impression'} </span>
                  </h2>
               </div>
               <div className=" flex items-center justify-between flex-wrap max-w-[400px]">
                  <h2  className={`text-base  font-semibold mb-3`}>
                     <span> {postSummary?.totalLikes} </span>
                     <span> {postSummary?.totalLikes > 1 ? 'Total Likes' : 'Total Like'} </span>
                  </h2>

                  <h2  className={`text-base  font-semibold  mb-3`}>
                     <span> {postSummary?.totalComments} </span>
                     <span>
                        {postSummary?.totalComments > 1 ? 'Total Comments' : 'Total Comment'}
                     </span>
                  </h2>
               </div>
            </div>
         </div>
         <div>
            {filteredPosts.length === 0 && (
               <div className="mt-4">
                  <h2  className={`font-normal mb-3`}>
                     <span> No post yet this month</span>
                  </h2>
               </div>
            )}
         </div>
      </div>
   );
};