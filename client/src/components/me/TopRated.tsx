import { Film } from "@/types/types";
import FilmCard from "../reusables/FilmCard";
import Link from "next/link";

interface TopRatedProps {
  top_rated: Film[];
}

export default function TopRated({ top_rated }: TopRatedProps) {
  const topRatedElements = top_rated.map((film) => (
    <FilmCard key={film.id} film={film} hasOverlay />
  ));

  return (
    <section className='top-rated py-6 px-2 sm:px-6 lg:px-8 rounded-md'>
      <div className='section-top-bar flex items-center justify-between border-b border-gray-700 pb-1 mb-2'>
        <h2 className=' font-semibold mb-2 text-gray-300'>Top Rated</h2>
        <Link
          href='/films/filter?sort_by=popularity.desc'
          className='text-sm text-gray-500 hover:underline'
        >
          See All
        </Link>
      </div>
      <div className='flex gap-[10px] overflow-x-auto webkit-scrollbar-hide film-grid'>
        {topRatedElements}
      </div>
    </section>
  );
}
