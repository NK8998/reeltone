"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type FilterContextType = {
  chainFilters: boolean;
  setChainFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [chainFilters, setChainFilters] = useState<boolean>(false);

  return (
    <FilterContext.Provider value={{ chainFilters, setChainFilters }}>
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
