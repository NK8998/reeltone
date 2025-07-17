"use client";
import { backendService } from "@/services/backendService";
import { useUser } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";

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
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider value={undefined}>{children}</AppContext.Provider>
  );
};
export { AppContext, AppProvider };
