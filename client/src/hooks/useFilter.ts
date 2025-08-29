"use client";

import { useFilterContext } from "@/context/FilterContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useFilter() {
  const { chainFilters } = useFilterContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const constructLink = (queryString: string, combine = false) => {
    const urlParams = new URLSearchParams(
      chainFilters || combine ? searchParams.toString() : ""
    );

    queryString
      .split("&")
      .filter(Boolean)
      .forEach((param) => {
        const [key, value] = param.split("=");
        if (key) urlParams.set(key, value ?? "");
      });

    const page = urlParams.get("page");
    if (page !== null) {
      urlParams.delete("page");
      urlParams.append("page", page);
    }

    return `/films/filter?${urlParams.toString()}`;
  };

  const handleFilter = (path: string) => {
    const isFilterPage = pathname.includes("/films/filter");
    if (!isFilterPage) {
      router.push(path);
    } else {
      window.history.pushState(null, "", path);
    }
  };

  return { handleFilter, constructLink };
}
