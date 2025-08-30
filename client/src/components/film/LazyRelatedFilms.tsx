"use client";

import { backendService } from "@/services/backendService";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import FilmCard from "../reusables/FilmCard";
import Link from "next/link";

export const RelatedFilmsSkeleton = () => {
  const array = new Array(20).fill(0);
  return (
    <>
      {array.map((_, index) => (
        <div key={index} className='skeleton-card'></div>
      ))}
    </>
  );
};

export default function LazyRelatedFilms({
  filmId,
  genre,
}: {
  filmId: number;
  genre: string;
}) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["relatedFilms", filmId],
    queryFn: () => backendService.getRelatedFilms(filmId),
    enabled: inView,
  });

  const renderContent = () => {
    if (isLoading) return <RelatedFilmsSkeleton />;
    if (isError)
      return (
        <p className='text-[12px] text-gray-600 col-span-full text-center'>
          Error: {error.message}
        </p>
      );
    if (data) {
      if (data.related_films.length === 0) {
        return (
          <p className='text-[12px] text-gray-600 col-span-full text-center'>
            Couldn't find other related films
          </p>
        );
      } else {
        return data.related_films.map((film, index) => (
          <FilmCard key={`${index}-${film.id}`} film={film} />
        ));
      }
    }
    return null;
  };

  return (
    <section
      className='related-films-section webkit-scrollbar-hide translate-y-[-40px]'
      ref={ref}
    >
      <div className='left-side'></div>
      <div className='content-side'>
        <div className='section-top-bar flex items-center justify-between border-b border-gray-700 pb-1 mb-2 translate-y-8'>
          <h2 className='text-1xl font-bold'>You might like</h2>
          <Link
            href={`/films/filter?genre=${genre}`}
            className='text-center py-0.5 px-2 cursor-pointer text-gray-400 text-[12px] hover:underline'
          >
            See all
          </Link>
        </div>
        <div className='film-grid styled-scroll-bar'>{renderContent()}</div>
      </div>
    </section>
  );
}
