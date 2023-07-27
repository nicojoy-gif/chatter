import React from 'react'
import { useAnalytics } from './useAnalytics'
import { Highlights } from './Highlights';
function AnalyticsPage() {
    const { highestViewedLikedAndCommentedPost, loading } = useAnalytics();
console.log(highestViewedLikedAndCommentedPost)
console.log(loading)

    return (
    <div>
        <section>
            <div>
                <div>
                {!loading && highestViewedLikedAndCommentedPost === null ? (
                    <div className='flex justify-center items-center h-[75vh]'>
                    <div
                       className='rounded-md w-[500px] tabletS:w-[300px] mobileL:[280px] h-[200px] transition duration-500 ease-in-out
                            flex justify-center items-center  shadow-md'>
                       <h1 className='text-2xl font-bold'>
                          No Posts Yet
                       </h1>
                    </div>
                 </div>
              ) : (
                 <Highlights />
              )}
                </div>
            </div>
        </section>
    </div>
  )
}

export default AnalyticsPage