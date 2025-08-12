import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css/sea-green";
import "./style.css";
import { Film } from "@/types/types";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import FilmCard from "../reusables/FilmCard";
import { FavouriteSvg, ThumbsUpDownSvg } from "@/assets/icons";

export default function PopularFilms({
  popularFilms,
}: {
  popularFilms: Film[];
}) {
  return (
    <section className='py-6 px-2 sm:px-6 lg:px-8 rounded-md popular-films-container'>
      <div className='section-top-bar flex items-center justify-between border-b border-gray-700 pb-1 mb-2'>
        <h2 className='font-semibold text-gray-300 text-base'>
          Popular films this month
        </h2>
        <Link
          href='/films/filter'
          className='text-sm text-gray-500 hover:underline'
        >
          More
        </Link>
      </div>

      <div className='space-y-4'>
        <Splide
          aria-label='Popular Films'
          options={{
            perPage: 4,
            gap: "5px",
            pagination: false,
            arrows: true,
            breakpoints: {
              1024: { perPage: 3 },
              640: { perPage: 2 },
              400: { perPage: 1 },
            },
          }}
          className='mb-6'
        >
          {popularFilms?.map((film) => (
            <SplideSlide
              key={film.id}
              className='relative block overflow-hidden'
            >
              <FilmCard key={film.id} film={film} />
              <div className='film-votes flex gap-2 film-votes-container'>
                <span className='flex items-center gap-2'>
                  <ThumbsUpDownSvg /> {film.vote_count}
                </span>
                <span className='flex items-center gap-2'>
                  <FavouriteSvg /> {film.vote_average}
                </span>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
