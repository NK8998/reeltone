"use client";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import "./page.css";
import { useEffect, useState } from "react";
import Hero from "@/components/landing/Hero";
import { RecentFilms } from "@/components/landing/RecentFilms";
import { LandingDataType, RecentReviews } from "@/types/types";
import Top6 from "@/components/landing/Top6";
import Features from "@/components/landing/Features";
import CTAButtons from "@/components/landing/CTAButtons";
import Reviews from "@/components/landing/Reviews";
import EnticerBox from "@/components/landing/EnticerBox";
import { useQuery } from "@tanstack/react-query";

export default function Landing() {
  const {
    data: landingData,
    isError,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["landingData"],
    queryFn: () => backendService.landingData(),
  });

  return (
    <div className='landing-page'>
      <Navbar />
      <main className='landing-main'>
        {landingData && (
          <>
            <Hero trending_film={landingData.trending_film} />
            <CTAButtons />
            <Top6 Top6={landingData.top_6_recent_films} loading={loading} />
            <Features />
            <RecentFilms
              recent_films={landingData.recent_films}
              loading={loading}
            />
            <EnticerBox
              filmId={landingData.trending_film?.id}
              filmTitle={landingData.trending_film?.title}
            />
            <Reviews
              reviews={landingData.recent_reviews.results}
              filmId={landingData.trending_film?.id}
              filmTitle={landingData.trending_film?.title}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
