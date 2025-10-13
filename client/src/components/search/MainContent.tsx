"use client";
import { backendService } from "@/services/backendService";
import { MovieDetails, SearchResults } from "@/types/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface MainContentProps {
  title: string;
  page: number;
}

export default function MainContent({ title, page }: MainContentProps) {
  const { ref, inView } = useInView();

  const fetchPageData = ({ pageParam = 1 }: { pageParam?: number }) => {
    return backendService.searchByTitle(title, pageParam);
  };

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["searchData", title],
      queryFn: fetchPageData,
      initialPageParam: page,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (status === "pending") return <LoaderPinwheel />;
  if (status === "error") return <div>Error: {error.message}</div>;

  const pageData = data.pages.flatMap((page) => page.results);

  const pageElements = pageData.map((film, index) => {
    return (
      <div
        key={`${film.id}-${index}`}
        className='flex gap-1 h-[300px] w-[100%]'
      >
        <img
          src={film.poster_url || "/images/loading.jpg"}
          alt={film.title}
          className='w-[300px] h-[100%] object-cover'
        />
        <div className='flex flex-col gap-1'>
          <h2>{film.title}</h2>
          {/* <p>Release Date: {film.release_date || "N/A"}</p> */}
          <p>{film.overview || "No overview available."}</p>
        </div>
      </div>
    );
  });
  return (
    <section className='search-content'>
      <div className='search-results'>{pageElements}</div>
      <div ref={ref} className='infinite-scroll-trigger' />
      {isFetchingNextPage && <LoaderPinwheel />}
    </section>
  );
}
