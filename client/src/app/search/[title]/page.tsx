import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import MainContent from "@/components/search/MainContent";
import { backendService } from "@/services/backendService";
import { getQueryClient } from "@/services/getQueryClient";
import { MovieDetails, SearchResults } from "@/types/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

type paramType = {
  title: string;
};

export default async function SearchTitlePage({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { title } = (await params) as paramType;

  if (!title) redirect("/");

  const page = 1;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery<SearchResults>({
    queryKey: ["searchData", title],
    queryFn: () => backendService.searchByTitle(title, page),
    initialPageParam: page,
  });

  return (
    <div className='search-page'>
      <Navbar />
      <main className='search-main'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MainContent title={title} page={1} />
        </HydrationBoundary>
      </main>
      <Footer />
    </div>
  );
}
