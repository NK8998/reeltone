"use client";
import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { useEffect } from "react";

export default function Films() {
  useEffect(() => {
    backendService
      .filmsData()
      .then((data) => {
        console.log("Films data:", data);
      })
      .catch((error) => {
        console.error("Error fetching films data:", error);
      });
  }, []);
  return (
    <div className='films-page'>
      <Navbar />
      <div className='main-content'></div>
      <Footer />
    </div>
  );
}
