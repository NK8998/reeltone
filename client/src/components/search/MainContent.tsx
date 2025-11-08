"use client";
import "./style.css";
import { backendService } from "@/services/backendService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import SearchFilters from "./SearchFilters";
import { useFilterContext } from "@/context/FilterContext";
import SearchResultsContainer from "./SearchResultsContainer";

interface MainContentProps {
  title: string;
  page: number;
}

export default function MainContent({ title, page }: MainContentProps) {
  const { searchFilter, sortDirection } = useFilterContext();
  const { ref, inView } = useInView();

  const fetchPageData = ({ pageParam = 1 }: { pageParam?: number }) => {
    return backendService.searchByTitle(title, pageParam);
  };

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["searchData", title, searchFilter, sortDirection],
      queryFn: fetchPageData,
      initialPageParam: page,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  const pageData = data?.pages.flatMap((page) => page.results) || [];

  return (
    <section className='search-content max-w-[1100px] mx-auto my-4'>
      <div className='flex gap-1'>
        <SearchResultsContainer
          movieDetails={pageData}
          title={decodeURIComponent(title)}
        />
        <SearchFilters />
      </div>
      <div ref={ref} className='infinite-scroll-trigger' />
      {isFetchingNextPage && (
        <LoaderPinwheel className='mx-auto mt-1 mb-1 loading-spinner' />
      )}
      {status === "error" && (
        <div className='text-center'>Error: {error.message}</div>
      )}
    </section>
  );
}
