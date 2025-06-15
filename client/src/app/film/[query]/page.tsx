"use client";
import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({}) {
  const { query } = useParams<{ query: string }>();
  const router = useRouter();

  const { user, isLoaded } = useUser();
  console.log("User:", user);

  useEffect(() => {
    if (!isLoaded) return;

    if (!query) {
      router.push("/");
      return;
    }

    backendService
      .filmData(query, user ? user.id : "")
      .then((data) => {
        console.log("Film data fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching film data:", error);
      });
  }, [query, user, isLoaded]);
  return (
    <div className='film-page'>
      <Navbar />
      <div className='main-content'></div>
      <Footer />
    </div>
  );
}
