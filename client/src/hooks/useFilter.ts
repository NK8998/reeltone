"use client";

import { useFilterContext } from "@/context/FilterContext";

export default function useFilter() {
  const { chainFilters } = useFilterContext();

  const handleFilter = (queryString: string) => {
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

    const newRelativePathQuery =
      window.location.pathname + "?" + urlParams.toString();

    window.history.pushState(null, "", newRelativePathQuery);
  };

  return handleFilter;
}
