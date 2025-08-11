import { ArrowDownSvg, CompactViewSvg, DefaultView } from "@/assets/icons";
import YearlyFilter from "./Yearly";
import RatingsFilter from "./Ratings";
import GenreFilter from "./Genre";
import LanguageFilter from "./Language";

export const FilterOptions = () => {
  return (
    <div className='filter-options flex align-center filter-view'>
      <div className='filter-wrapper filter-view relative'>
        <button className='primary-filter-button filter-view'>
          Year
          <span>
            <ArrowDownSvg />
          </span>
        </button>
        <YearlyFilter />
      </div>
      <div className='filter-wrapper filter-view relative'>
        <button className='primary-filter-button filter-view'>
          Rating
          <span>
            <ArrowDownSvg />
          </span>
        </button>
        <RatingsFilter />
      </div>
      <div className='filter-wrapper filter-view relative'>
        <button className='primary-filter-button filter-view'>
          Genre
          <span>
            <ArrowDownSvg />
          </span>
        </button>
        <GenreFilter />
      </div>
      <div className='filter-wrapper filter-view relative'>
        <button className='primary-filter-button filter-view last-primary-button'>
          Language
          <span>
            <ArrowDownSvg />
          </span>
        </button>
        <LanguageFilter />
      </div>
    </div>
  );
};

export const ChangeView = ({
  compactView,
  setCompactView,
}: {
  compactView: boolean;
  setCompactView: (view: boolean) => void;
}) => {
  return (
    <div className='default-view-selector flex gap-1'>
      <span className='text:sm view-selector-text'>View</span>
      <div className='flex gap-1'>
        <span
          className={compactView ? "" : "active"}
          onClick={() => setCompactView(false)}
        >
          <DefaultView />
        </span>
        <span
          className={compactView ? "active" : ""}
          onClick={() => setCompactView(true)}
        >
          <CompactViewSvg />
        </span>
      </div>
    </div>
  );
};

export default function FilterBar({
  compactView,
  setCompactView,
}: {
  compactView: boolean;
  setCompactView: (view: boolean) => void;
}) {
  return (
    <section className='flex justify-between filtered-view-filter-bar'>
      <h3>FILMS</h3>
      <div className='filter-bar-right flex gap-4'>
        <FilterOptions />
        <ChangeView compactView={compactView} setCompactView={setCompactView} />
      </div>
    </section>
  );
}
