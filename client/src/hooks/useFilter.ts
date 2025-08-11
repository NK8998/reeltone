"use client";

import { useFilterContext } from "@/context/FilterContext";
import { useRouter } from "next/navigation";

export default function useFilter() {
  const { chainFilters } = useFilterContext();
  const router = useRouter();

  const handleFilter = (queryString: string) => {
    const isFilterPage = window.location.pathname.includes("/films/filter");

    const urlParams = chainFilters
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

    queryString
      .split("&")
      .filter(Boolean)
      .forEach((param) => {
        const [key, value] = param.split("=");
        if (key) urlParams.set(key, value ?? "");
      });

    const newQuery = urlParams.toString();

    if (!isFilterPage) {
      router.push(`/films/filter?${newQuery}`);
    } else {
      window.history.pushState(null, "", `/films/filter?${newQuery}`);
    }
  };

  return handleFilter;
}
