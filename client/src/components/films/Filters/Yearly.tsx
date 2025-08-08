import { ArrowDownSvg } from "@/assets/icons";
import Link from "next/link";

export const YearlyButton = ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  return (
    <Link
      href={`/films/filter?start_year=${start}&end_year=${end}`}
      className='yearly-group-btn filter-btn transition-all'
    >
      {start}s
    </Link>
  );
};

export default function YearlyFilter() {
  const currentYear = new Date().getFullYear();
  const startDecade = 1950;
  const decades = [];

  for (let year = startDecade; year <= currentYear; year += 10) {
    decades.push({ start: year, end: year + 9 });
  }

  return (
    <div className='filter-group-container flex flex-col styled-scroll-bar absolute'>
      <h3 className='text-md text-center font-semibold dropdown-title'>
        Year
        <span>
          <ArrowDownSvg />
        </span>
      </h3>
      <Link
        className='yearly-group-btn filter-btn transition-all'
        href={"/films/filter"}
      >
        All
      </Link>
      {decades.map(({ start, end }) => (
        <YearlyButton key={start} start={start} end={end} />
      ))}
    </div>
  );
}
