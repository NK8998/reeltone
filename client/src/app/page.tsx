"use client";
import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { useQuery } from "@tanstack/react-query";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import MainSectionError from "@/components/reusables/MainSectionError";
import MainContent from "@/components/landing/MainContent";

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
        {isError && <MainSectionError errorMessage={error.message} />}
        {loading && <MainSectionLoader />}
        {landingData && (
          <MainContent landingData={landingData} loading={loading} />
        )}
      </main>
      <Footer />
    </div>
  );
}
