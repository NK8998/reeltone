import { ArrowDownSvg } from "@/assets/icons";
import useFilter from "@/hooks/useFilter";
import Link from "next/link";

export default function RatingsFilter() {
  const { handleFilter, constructLink } = useFilter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleFilter(e.currentTarget.href);
  };

  return (
    <div className='filter-group-container flex flex-col styled-scroll-bar absolute'>
      <h3 className='text-md text-center font-semibold dropdown-title'>
        Rating
        <span>
          <ArrowDownSvg />
        </span>
      </h3>
      <Link
        prefetch={false}
        onClick={handleClick}
        className='filter-btn transition-all'
        href={constructLink("sort_by=popularity.desc")}
      >
        Highest Rating
      </Link>
      <Link
        onClick={handleClick}
        prefetch={false}
        className='filter-btn transition-all'
        href={constructLink("sort_by=popularity.asc")}
      >
        Lowest Rating
      </Link>
    </div>
  );
}
