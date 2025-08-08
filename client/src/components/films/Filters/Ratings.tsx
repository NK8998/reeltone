import { ArrowDownSvg } from "@/assets/icons";
import Link from "next/link";

export default function RatingsFilter() {
  return (
    <div className='filter-group-container flex flex-col styled-scroll-bar absolute'>
      <h3 className='text-md text-center font-semibold dropdown-title'>
        Rating
        <span>
          <ArrowDownSvg />
        </span>
      </h3>
      <Link
        className='filter-btn transition-all'
        href='/films/filter?sort_by=popularity.desc'
      >
        Highest Rating
      </Link>
      <Link
        className='filter-btn transition-all'
        href='/films/filter?sort_by=popularity.asc'
      >
        Lowest Rating
      </Link>
    </div>
  );
}
