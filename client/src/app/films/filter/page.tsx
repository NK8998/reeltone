import "./page.css";
import MainContent from "@/components/films/Filters/MainContent";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { getQueryClient } from "@/services/getQueryClient";
import { parseURLParams } from "@/utils/serverUtil";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = getQueryClient();
  const params = await searchParams;
  const queryString = parseURLParams(params);

  await queryClient.prefetchQuery({
    queryKey: ["filteredFilms", queryString],
    queryFn: () => backendService.getFilteredFilms(queryString),
  });

  return (
    <div className='filtered-page'>
      <Navbar />
      <main className='main-content'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MainContent />
        </HydrationBoundary>
      </main>
      <Footer />
    </div>
  );
}
