"use client";
import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Me() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (isLoaded && !user) router.push("/auth/sign-in");

    backendService
      .meData(user.id)
      .then((data) => {
        console.log("Me data:", data);
      })
      .catch((error) => {
        console.error("Error fetching me data:", error);
      });
  }, [user, isLoaded, router]);

  return (
    <div className='me-page'>
      <Navbar />
      <div className='main-content'></div>
      <Footer />
    </div>
  );
}
