"use client";
import LoadingPage from "@/components/Loading/LoadingPage";
import { backendService } from "@/services/backendService";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [addedMember, setAddedMember] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user || addedMember) return;
    backendService
      .addMember(
        user.id || "",
        user.username || "",
        user.emailAddresses[0]?.emailAddress || "",
        user.imageUrl || ""
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setAddedMember(true);
      });
  }, [user, isLoaded]);

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
