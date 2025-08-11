import { LeftArrow } from "@/assets/icons";
import useFilter from "@/hooks/useFilter";
import { sanitizeYear } from "@/utils/utilities";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SingleYear() {
  const handleFilter = useFilter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleFilter(e.currentTarget.href.split("?")[1] ?? "");
  };
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();

  const startYearRaw = searchParams.get("start_year");
  const endYearRaw = searchParams.get("end_year");

  const endYear = sanitizeYear(endYearRaw) ?? currentYear;
  const startYear = Math.min(
    sanitizeYear(startYearRaw) ?? currentYear,
    endYear
  );

  console.log({ startYear, endYear });

  const isDecade = startYear != endYear && endYear > 0;

  const baseYear = isNaN(startYear) || !startYear ? currentYear : startYear;
  const decadeStart = Math.floor(baseYear / 10) * 10;

  return (
    <div className='individual-years'>
      {/* Previous decade */}
      <Link
        className='prev-decade decade-link'
        prefetch={false}
        href={`/films/filter?start_year=${decadeStart - 10}&end_year=${
          decadeStart - 1
        }`}
        onClick={handleClick}
      >
        <LeftArrow />
      </Link>

      <div className='single-year-group webkit-scrollbar-hide'>
        {/* Decade link */}
        <Link
          prefetch={false}
          className={`year-link ${isDecade ? "active" : ""}`}
          href={`/films/filter?start_year=${decadeStart}&end_year=${
            decadeStart + 9
          }`}
          onClick={handleClick}
        >
          {decadeStart}s
        </Link>

        {/* Year links */}
        {Array.from({ length: 10 }, (_, i) => {
          const filmYear = decadeStart + i;
          return (
            <Link
              prefetch={false}
              key={filmYear}
              className={`year-link ${
                filmYear === startYear && !isDecade ? "active" : ""
              } ${i === 9 ? "last" : ""}`}
              href={`/films/filter?start_year=${filmYear}&end_year=${filmYear}`}
              onClick={handleClick}
            >
              {filmYear}
            </Link>
          );
        })}
      </div>

      {/* Next decade */}
      {decadeStart + 10 <= currentYear && (
        <Link
          className='next-decade decade-link'
          href={`/films/filter?start_year=${decadeStart + 10}&end_year=${
            decadeStart + 19
          }`}
          prefetch={false}
          onClick={handleClick}
        >
          <LeftArrow />
        </Link>
      )}
    </div>
  );
}
