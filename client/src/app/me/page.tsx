"use client";
import "./page.css";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { mePageTypes } from "@/types/types";
import MainContent from "@/components/me/MainContent";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import MainSectionError from "@/components/reusables/MainSectionError";

export default function Me() {
  const { user } = useUser();

  if (!user) {
    return null;
  }
  const { data, isLoading, error, isError } = useQuery<mePageTypes, Error>({
    queryKey: ["meData", user.id],
    queryFn: () => backendService.meData(user.id),
  });

  return (
    <div className='me-page'>
      <Navbar />
      <main className='main-content'>
        {isLoading && <MainSectionLoader />}
        {isError && <MainSectionError errorMessage={error.message} />}
        {data && <MainContent data={data} />}
      </main>
      <Footer />
    </div>
  );
}
