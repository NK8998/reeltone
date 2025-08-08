"use client";
import FilmsPage from "@/components/films/MainSection";
import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import MainSectionError from "@/components/reusables/MainSectionError";
import FilmsMainSection from "@/components/films/MainSection";

export default function Films() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["landingData"],
    queryFn: () => backendService.filmsData(),
  });

  return (
    <div className='films-page'>
      <Navbar />
      <div className='main-content'>
        <main className='films-main'>
          {isLoading && <MainSectionLoader />}
          {isError && <MainSectionError errorMessage={error.message} />}
          {data && <FilmsMainSection data={data} />}
        </main>
      </div>
      <Footer />
    </div>
  );
}
