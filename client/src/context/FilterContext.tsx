"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type FilterContextType = {
  chainFilters: boolean;
  setChainFilters: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [chainFilters, setChainFilters] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  return (
    <FilterContext.Provider
      value={{ chainFilters, setChainFilters, page, setPage }}
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
