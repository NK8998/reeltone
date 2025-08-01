import { FilmPageReview } from "@/types/types";
import Rating from "../reusables/Comment/Rating";
import Link from "next/link";

interface FilmReviewGridProps {
  reviews: FilmPageReview[];
}

export default function FilmReviewGrid({ reviews }: FilmReviewGridProps) {
  return (
    <section className='py-6 px-4 sm:px-6 lg:px-8 rounded-md'>
      <div className='section-top-bar flex items-center justify-between border-b border-gray-700 pb-1 mb-1'>
        <h2 className=' font-semibold mb-2 text-gray-300'>
          Some popular reviews from the community
        </h2>
        <Link href='#' className='text-sm text-gray-500 hover:underline'></Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 '>
        {reviews.map((review) => (
          <div
            key={review.id}
            className='flex shadow py-3 gap-4 border-b border-gray-600'
          >
            {/* Poster */}
            {review.film_poster ? (
              <img
                src={review.film_poster}
                alt={review.film_title}
                className='w-28 h-40 object-cover rounded-md'
              />
            ) : (
              <div className='w-28 h-40 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500'>
                No Image
              </div>
            )}

            {/* Review content */}
            <div className='flex-1 flex flex-col'>
              {/* Row 1: Profile + Rating */}
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  {review.pfp_url ? (
                    <img
                      src={review.pfp_url}
                      alt={review.username}
                      className='w-8 h-8 rounded-full object-cover'
                    />
                  ) : (
                    <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600'>
                      ?
                    </div>
                  )}
                  <span className='font-medium text-sm text-gray-500'>
                    {review.username}
                  </span>
                </div>

                {review.rating != null && <Rating rating={review.rating} />}
              </div>

              {/* Row 2: Review text */}
              <p className='text-white-100 text-sm'>
                {review.review_text || (
                  <i className='text-white-500'>No comment provided.</i>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
