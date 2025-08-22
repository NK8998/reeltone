"use client";
import { ArrowDownSvg } from "@/assets/icons";
import GenreFilter from "./Filters/Genre";
import RatingsFilter from "./Filters/Ratings";
import YearlyFilter from "./Filters/Yearly";
import LanguageFilter from "./Filters/Language";

export default function FilterBar() {
  return (
    <section className='filter-bar flex py-6 px-2 sm:px-6 lg:px-8 rounded-md '>
      <h3 className='text-md font-semibold'>Browse by</h3>
      <div className='filter-options flex align-center '>
        <div className='filter-wrapper relative'>
          <button className='primary-filter-button'>
            Year
            <span>
              <ArrowDownSvg />
            </span>
          </button>
          <YearlyFilter />
        </div>
        <div className='filter-wrapper relative'>
          <button className='primary-filter-button'>
            Rating
            <span>
              <ArrowDownSvg />
            </span>
          </button>
          <RatingsFilter />
        </div>
        <div className='filter-wrapper relative'>
          <button className='primary-filter-button'>
            Genre
            <span>
              <ArrowDownSvg />
            </span>
          </button>
          <GenreFilter />
        </div>
        <div className='filter-wrapper relative'>
          <button className='primary-filter-button last-primary-button'>
            Language
            <span>
              <ArrowDownSvg />
            </span>
          </button>
          <LanguageFilter />
        </div>
      </div>
    </section>
  );
}
