"use client";
import { SearchFilter } from "@/types/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

type FilterContextType = {
  chainFilters: boolean;
  setChainFilters: React.Dispatch<React.SetStateAction<boolean>>;
  searchFilter: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [chainFilters, setChainFilters] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  return (
    <FilterContext.Provider
      value={{
        chainFilters,
        setChainFilters,
        searchFilter,
        setSearchFilter,
        sortDirection,
        setSortDirection,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error("useFilterContext must be used within FilterProvider");
  return context;
};
