"use client";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import "./page.css";
import { useEffect } from "react";

export default function Landing() {
  useEffect(() => {
    backendService
      .landingData()
      .then((data) => {
        console.log("Landing data:", data);
      })
      .catch((error) => {
        console.error("Error fetching landing data:", error);
      });
  }, []);
  return (
    <div className='landing-page'>
      <Navbar />
      <main className='landing-main'></main>
      <Footer />
    </div>
  );
}
