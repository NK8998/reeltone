import { LeftArrow } from "@/assets/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SingleYear() {
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();

  const selectedYear = Number(
    searchParams.get("year") || searchParams.get("start_year")
  );

  const isDecade =
    searchParams.has("start_year") && searchParams.has("end_year");

  const baseYear =
    isNaN(selectedYear) || !selectedYear ? currentYear : selectedYear;
  const decadeStart = Math.floor(baseYear / 10) * 10;

  return (
    <div className='individual-years'>
      {/* Previous decade */}
      <Link
        className='prev-decade decade-link'
        href={`/films/filter?start_year=${decadeStart - 10}&end_year=${
          decadeStart - 1
        }`}
      >
        <LeftArrow />
      </Link>

      <div className='single-year-group webkit-scrollbar-hide'>
        {/* Decade link */}
        <Link
          className={`year-link ${isDecade ? "active" : ""}`}
          href={`/films/filter?start_year=${decadeStart}&end_year=${
            decadeStart + 9
          }`}
        >
          {decadeStart}s
        </Link>

        {/* Year links */}
        {Array.from({ length: 10 }, (_, i) => {
          const filmYear = decadeStart + i;
          return (
            <Link
              key={filmYear}
              className={`year-link ${
                !isDecade && filmYear === selectedYear ? "active" : ""
              } ${i === 9 ? "last" : ""}`}
              href={`/films/filter?year=${filmYear}`}
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
        >
          <LeftArrow />
        </Link>
      )}
    </div>
  );
}
