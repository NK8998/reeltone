import { ArrowDownSvg } from "@/assets/icons";
import Link from "next/link";

const genres = [
  { name: "action", id: 28 },
  { name: "adventure", id: 12 },
  { name: "animation", id: 16 },
  { name: "comedy", id: 35 },
  { name: "crime", id: 80 },
  { name: "documentary", id: 99 },
  { name: "drama", id: 18 },
  { name: "family", id: 10751 },
  { name: "fantasy", id: 14 },
  { name: "history", id: 36 },
  { name: "horror", id: 27 },
  { name: "music", id: 10402 },
  { name: "mystery", id: 9648 },
  { name: "romance", id: 10749 },
  { name: "science fiction", id: 878 },
  { name: "tv movie", id: 10770 },
  { name: "thriller", id: 53 },
  { name: "war", id: 10752 },
  { name: "western", id: 37 },
];

export default function GenreFilter() {
  return (
    <div className='filter-group-container flex flex-col styled-scroll-bar  absolute'>
      <h3 className='text-md text-center font-semibold dropdown-title'>
        Genre
        <span>
          <ArrowDownSvg />
        </span>
      </h3>
      {genres.map((genre) => (
        <Link
          key={genre.id}
          className='filter-btn'
          href={`/films/filter?genre=${genre.name}`}
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
}
