import { FilmPageReview } from "@/types/types";
import { Film } from "lucide-react";
import Link from "next/link";
import FilmCard from "../reusables/FilmCard";

export default function JustReviewed({
  Reviewed,
}: {
  Reviewed: FilmPageReview[];
}) {
  return (
    <section className='py-6 lg:px-8 rounded-md popular-films-container'>
      <div className='section-top-bar flex items-center justify-between border-b border-gray-700 pb-1 mb-2'>
        <h2 className='font-semibold text-gray-300 text-base'>Just Reviewed</h2>
        <Link
          href='/films/filter'
          className='text-sm text-gray-500 hover:underline'
        >
          More
        </Link>
      </div>
      <div className='film-grid space-y-4 flex gap-1 webkit-scrollbar-hide'>
        {Reviewed?.map((review) => {
          return (
            <Link
              href={`/films/${review.film_id}`}
              key={review.id}
              className='flex flex-col items-center'
            >
              <img
                src={review.film_poster ?? "/images/loading.jpg"}
                alt={review.film_title}
                className='w-24 h-36 object-cover '
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
