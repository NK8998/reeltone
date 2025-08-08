"use client";
import LoadingPage from "@/components/Loading/LoadingPage";
import useAddUser from "@/hooks/useAddUser";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react";

const AppContext = createContext(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useUser();
  useAddUser();

  if (!isLoaded) {
    return <LoadingPage />;
  }

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
