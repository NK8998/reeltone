"use client";
import Footer from "@/components/reusables/Footer/Footer";
import MainSectionError from "@/components/reusables/MainSectionError";
import Navbar from "@/components/reusables/Navbar/Navbar";

export default function Error() {
  return (
    <div className='error-fallback'>
      <Navbar />
      <MainSectionError errorMessage='An error occurred while fetching data.' />
      <Footer />
    </div>
  );
}
