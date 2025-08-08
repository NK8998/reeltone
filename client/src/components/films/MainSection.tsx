import { FilmsPageData } from "@/types/types";
import React from "react";
import PopularFilms from "./PopularFilms";
import JustReviewed from "./JustReviewed";
import FilmReviewGrid from "../me/RecentReviews";
import FilterBar from "./FilterBar";

const FilmsMainSection = ({ data }: { data: FilmsPageData }) => {
  return (
    <div>
      <FilterBar />
      <PopularFilms popularFilms={data.popular_films ?? []} />
      <JustReviewed Reviewed={data.reviewed_films ?? []} />
      <FilmReviewGrid reviews={data.reviewed_films ?? []} />
      {/* Add more sections as needed */}
    </div>
  );
};

export default FilmsMainSection;
