"use client";
import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({}) {
  const { query } = useParams<{ query: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      router.push("/");
      return;
    }

    backendService
      .filmData(query)
      .then((data) => {
        console.log("Film data fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching film data:", error);
      });
  }, [query]);
  return (
    <div className='film-page'>
      <Navbar />
      <div className='main-content'></div>
      <Footer />
    </div>
  );
}
