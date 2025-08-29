"use client";
import { FirstPageIcon, LeftArrow } from "@/assets/icons";
import { useFilterContext } from "@/context/FilterContext";
import useFilter from "@/hooks/useFilter";
import Link from "next/link";

export default function ChangePage() {
  const { page, setPage } = useFilterContext();

  const { handleFilter, constructLink } = useFilter();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetPage: number
  ) => {
    setPage(targetPage);
    e.preventDefault();
    handleFilter(e.currentTarget.href);
  };
  const prevPage = page - 1 < 1 ? 1 : page - 1;
  const nextPage = page + 1;

  return (
    <div className='next-page-container'>
      <div className='flex items-center gap-1'>
        <Link
          className='first-page page-btn'
          href={constructLink(`page=1`, true)}
          onClick={(e) => handleClick(e, 1)}
        >
          <FirstPageIcon />
        </Link>
        {page > 1 && (
          <Link
            className='prev-page page-btn'
            href={constructLink(`page=${prevPage}`, true)}
            onClick={(e) => handleClick(e, prevPage)}
          >
            <LeftArrow />
            <span>Prev</span>
          </Link>
        )}
      </div>
      <Link
        className='next-page  ml-auto page-btn'
        href={constructLink(`page=${nextPage}`, true)}
        onClick={(e) => handleClick(e, nextPage)}
      >
        <span>Next</span>
        <LeftArrow />
      </Link>
    </div>
  );
}
