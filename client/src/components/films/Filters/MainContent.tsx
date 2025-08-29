"use client";
import "../style.css";
import "./style.css";
import FilmsContainer from "./FilmsContainer";
import { Film } from "@/types/types";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import { useEffect, useState } from "react";
import FilterBar, { ChangeView } from "./FilterBar";
import SingleYear from "./SingleYear";
import ChainFilters from "./ChainFilters";
import { useQuery } from "@tanstack/react-query";
import { backendService } from "@/services/backendService";
import { useSearchParams } from "next/navigation";
import MainSectionError from "@/components/reusables/MainSectionError";
import ChangePage from "./ChangePage";
import { useFilterContext } from "@/context/FilterContext";

export default function MainContent({ page }: { page: number }) {
  const { setPage } = useFilterContext();
  const [compactView, setCompactView] = useState(true);
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["filteredFilms", queryString],
    queryFn: () => backendService.getFilteredFilms(queryString),
  });

  useEffect(() => {
    setPage(page);
  }, [page]);

  return (
    <>
      <section className={`filter-section ${loading ? "loading" : ""}`}>
        <FilterBar compactView={compactView} setCompactView={setCompactView} />
        <div className='mini-change-view'>
          <ChainFilters />
          <ChangeView
            compactView={compactView}
            setCompactView={setCompactView}
          />
        </div>
        <SingleYear />
      </section>
      <section className='films-section'>
        {loading && <MainSectionLoader />}
        {isError && <MainSectionError errorMessage={error.message} />}
        {!loading && (
          <FilmsContainer
            films={data?.filtered_films ?? []}
            compactView={compactView}
          />
        )}
      </section>
      <section
        className={`filter-section change-page-section ${
          loading ? "loading" : ""
        }`}
      >
        <ChangePage />
      </section>
    </>
  );
}
