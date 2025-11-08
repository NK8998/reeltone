import { MovieDetails } from "@/types/types";
import SearchCard from "./SearchCard";

export default function SearchResultsContainer({
  movieDetails,
  title,
}: {
  movieDetails: MovieDetails[];
  title: string;
}) {
  return (
    <div className='flex flex-col grow'>
      <h2 className=' w-[100%] mb-1 text-[14px]'>
        SHOWING MATCHES FOR "{title.toUpperCase()}"
      </h2>
      <div className='w-[100%] bg-[#f0f0f03a] h-[1px] mb-5'></div>
      <div className='flex flex-col gap-4'>
        {movieDetails.map((film, i) => (
          <SearchCard key={i} film={film} />
        ))}
      </div>
    </div>
  );
}
