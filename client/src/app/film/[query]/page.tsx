import "./page.css";
import Footer from "@/components/reusables/Footer/Footer";
import Navbar from "@/components/reusables/Navbar/Navbar";
import { backendService } from "@/services/backendService";
import { FilmData } from "@/types/types";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";
import MainContent from "@/components/film/MainContent";
import { currentUser } from "@clerk/nextjs/server";
import { getQueryClient } from "@/services/getQueryClient";
import { redirect } from "next/navigation";

type paramType = {
  query: string;
};
export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { query } = (await params) as paramType;

  if (!query) redirect("/");

  const user = await currentUser();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery<FilmData>({
    queryKey: ["filmData", query, user ? user.id : ""],
    queryFn: () => backendService.filmData(query, user ? user.id : ""),
  });

  return (
    <div className='film-page'>
      <Navbar />
      <main className='film-main'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MainContent query={query} userId={user ? user.id : ""} />
        </HydrationBoundary>
      </main>
      <Footer />
    </div>
  );
}
