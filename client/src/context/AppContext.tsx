"use client";
import useAddUser from "@/hooks/useAddUser";
import { ClerkProvider } from "@clerk/nextjs";
import { createContext, useContext } from "react";

const AppContext = createContext(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  //useAddUser();
  return (
    <AppContext.Provider value={undefined}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
export { AppContext, AppProvider, useAppContext };
