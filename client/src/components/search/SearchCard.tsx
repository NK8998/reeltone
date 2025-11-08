import { MovieDetails } from "@/types/types";
import FilmCard from "../reusables/FilmCard";
import { FavouriteSvg, ThumbsUpDownSvg } from "@/assets/icons";

export default function SearchCard({ film }: { film: MovieDetails }) {
  const year = new Date(film.release_date).getFullYear();
  return (
    <div key={`${film.id}`} className='flex gap-4 w-[100%]'>
      <FilmCard film={film} hasHoverTitle={false} />
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-baseline'>
          <h2 className='text-[25px] font-bold'>{film.title}</h2>
          <p className='text-gray-700 dark:text-gray-300'>{year || "N/A"}</p>
        </div>
        <p className='text-[13.5px] line-clamp-3 text-gray-700 dark:text-gray-300 max-w-[600px]'>
          {film.overview || "No overview available."}
        </p>
        <div className='flex gap-2 interactions-container'>
          <span className='text-[13px] flex items-center gap-1'>
            <FavouriteSvg /> {film.vote_average || "N/A"}
          </span>
          <span className='text-[13px]'>|</span>
          <span className='text-[13px] flex items-center gap-1'>
            <ThumbsUpDownSvg />
            {film.vote_count || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
