"use client";
import { LeftArrow } from "@/assets/icons";
import { useFilterContext } from "@/context/FilterContext";
import useFilter from "@/hooks/useFilter";
import Link from "next/link";

export default function ChangePage() {
  const { page, setPage } = useFilterContext();

  const handleFilter = useFilter();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetPage: number
  ) => {
    setPage(targetPage);
    e.preventDefault();
    handleFilter(e.currentTarget.href.split("?")[1] ?? "");
  };
  const prevPage = page - 1 < 1 ? 1 : page - 1;
  const nextPage = page + 1;

  return (
    <div className='next-page-container'>
      {page > 1 && (
        <Link
          className='prev-page page-btn'
          href={`?page=${prevPage}`}
          onClick={(e) => handleClick(e, prevPage)}
        >
          Previous
        </Link>
      )}
      <Link
        className='next-page  ml-auto page-btn'
        href={`?page=${nextPage}`}
        onClick={(e) => handleClick(e, nextPage)}
      >
        Next
      </Link>
    </div>
  );
}
