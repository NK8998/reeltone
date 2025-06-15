"use client";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import "./page.css";
import { useEffect, useState } from "react";

export default function Landing() {
  const [films, setFilms] = useState<any[]>([]);

  useEffect(() => {
    backendService
      .landingData()
      .then((data) => {
        console.log("Landing data:", data);
        setFilms(data?.films || []);
      })
      .catch((error) => {
        console.error("Error fetching landing data:", error);
      });
  }, []);

  return (
    <div className='landing-page'>
      <Navbar />
      <main className='landing-main'>
        {/* Hero Section */}
        <section className='hero'>
          <h1>Discover. Review. Connect.</h1>
          <p>Join a global community of film lovers.</p>
          <div className="auth-buttons">
            <a href="/auth/sign-up" className="cta">Sign Up</a>
            <a href="/auth/sign-in" className="cta secondary">Sign In</a>
          </div>
        </section>

        {/* Recent Films Section */}
        <section className='recent-films'>
          <h2>Recent Films</h2>
          <div className='film-grid'>
            {films.map((film, idx) => (
              <div className='film-card' key={idx}>
                <img src={film.posterUrl} alt={film.title} />
                <span className='film-title'>{film.title}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

