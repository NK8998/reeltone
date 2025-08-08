"use client";
import "./page.css";
import MainContent from "@/components/films/Filters/MainContent";
import Footer from "@/components/reusables/Footer/Footer";
import MainSectionError from "@/components/reusables/MainSectionError";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  // Convert to plain query string (without the '?')
  const queryString = searchParams.toString();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["filteredFilms", queryString],
    queryFn: () => backendService.getFilteredFilms(queryString),
  });

  console.log(data);

  return (
    <div className='filtered-page'>
      <Navbar />
      <main className='main-content'>
        {isError && <MainSectionError errorMessage={error.message} />}
        <MainContent films={data?.filtered_films ?? []} loading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}
