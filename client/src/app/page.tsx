"use client";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import "./page.css";
import { useEffect, useState } from "react";
import Hero from "@/components/landing/Hero";
import { RecentFilms } from "@/components/landing/RecentFilms";
import { LandingDataType } from "@/types/types";

export default function Landing() {
  const [landingData, setLandingData] = useState<LandingDataType>({
    recent_films: [],
    trending_film: null,
    recent_reviews: [],
  });

  useEffect(() => {
    backendService
      .landingData()
      .then((data) => {
        console.log("Landing data:", data);
        setLandingData(
          data || { recent_films: [], trending_film: null, recent_reviews: [] }
        );
      })
      .catch((error) => {
        console.error("Error fetching landing data:", error);
      });
  }, []);

  return (
    <div className='landing-page'>
      <Navbar />
      <main className='landing-main'>
        <Hero />
        <RecentFilms recent_films={landingData.recent_films} />
      </main>
      <Footer />
    </div>
  );
}
