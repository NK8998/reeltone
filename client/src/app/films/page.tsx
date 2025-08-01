"use client";
import FilmsPage from "@/components/films/FilmPage";
import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { useEffect, useState } from "react";

export default function Films() {
  const [data, setData] = useState({} as any);

  useEffect(() => {
    backendService
      .filmsData()
      .then((data) => {
        console.log("Films data:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching films data:", error);
      });
  }, []);
  return (
    <div className='films-page'>
      <Navbar />
      <div className='main-content'>
        <FilmsPage
          popularFilms={data.popular_films}
          recentFilms={data.recent_films}
        />
      </div>
      <Footer />
    </div>
  );
}
