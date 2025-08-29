import { ArrowDownSvg } from "@/assets/icons";
import useFilter from "@/hooks/useFilter";
import Link from "next/link";

export const YearlyButton = ({
  start,
  end,
  onClick,
}: {
  start: number;
  end: number;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const { constructLink } = useFilter();
  return (
    <Link
      href={constructLink(`start_year=${start}&end_year=${end}`)}
      className='yearly-group-btn filter-btn transition-all'
      onClick={onClick}
    >
      {start}s
    </Link>
  );
};

export default function YearlyFilter() {
  const { handleFilter, constructLink } = useFilter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleFilter(e.currentTarget.href);
  };

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
        href={constructLink("")}
        onClick={handleClick}
      >
        All
      </Link>
      {decades.map(({ start, end }) => (
        <YearlyButton
          key={start}
          start={start}
          end={end}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}
