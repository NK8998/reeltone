"use client";
import "./page.css";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { mePageTypes } from "@/types/types";
import { use, useEffect } from "react";
import FriendsActivity from "@/components/me/FriendsActivity";
import MainContent from "@/components/me/MainContent";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import MainSectionError from "@/components/reusables/MainSectionError";


export default function Me() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/auth/sign-in");
    return null;
  }
  // Fetch user profile with useQuery only if user exists
  const {
    data,
    isLoading,
    error,
    isError
  } = useQuery<mePageTypes, Error>({
    queryKey: ["meData", user.id],
    queryFn: () => backendService.meData(user.id),
  });

  console.log("me data", data);

  return (
    <div className="me-page">
      <Navbar />
      <main className="main-content">
        {isLoading && <MainSectionLoader />}
        {isError && <MainSectionError errorMessage={error.message} />}
        {data && <MainContent data={data} />}
      </main>
      <Footer />
    </div>
  );
}
