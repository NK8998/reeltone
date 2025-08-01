"use client";
import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import MainSectionError from "@/components/reusables/MainSectionError";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { FilmData } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import MainContent from "@/components/film/MainContent";

export default function Page({}) {
  const { query } = useParams<{ query: string }>();
  const router = useRouter();
  if (!query) {
    router.push("/");
    return null;
  }
  const { user } = useUser();

  const { data, isLoading, isError, error } = useQuery<FilmData>({
    queryKey: ["filmData", query, user ? user.id : ""],
    queryFn: () => backendService.filmData(query, user ? user.id : ""),
  });

  return (
    <div className='film-page'>
      <Navbar />
      <main className='film-main'>
        {isLoading && <MainSectionLoader />}
        {isError && <MainSectionError errorMessage={error.message} />}
        {data && <MainContent data={data} />}
      </main>
      <Footer />
    </div>
  );
}
