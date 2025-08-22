"use client";
import { FilmData } from "@/types/types";
import Hero from "./Hero";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import MiddleContent from "./MiddleContent";
import ReviewsSection from "./ReviewsSection";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { backendService } from "@/services/backendService";
import MainSectionLoader from "../reusables/MainSectionLoader";
import MainSectionError from "../reusables/MainSectionError";

export default function MainContent({
  query,
  userId,
}: {
  query: string;
  userId: string;
}) {
  const { data, isLoading, isError, error } = useQuery<FilmData>({
    queryKey: ["filmData", query, userId],
    queryFn: () => backendService.filmData(query, userId),
  });

  if (isLoading) return <MainSectionLoader />;
  if (isError) return <MainSectionError errorMessage={error.message} />;

  return data ? (
    <div className='film-main-content'>
      <Hero backgroundImage={data?.essential_data.backdrop_path} />
      <div className='film-flex-content'>
        <LeftContent
          essentialData={data?.essential_data ?? []}
          userFlags={data?.user_flags ?? []}
          posterPath={data?.essential_data.poster_path}
          trailer={data?.essential_data.trailer}
        />
        <MiddleContent essentialData={data.essential_data ?? []} />
        <RightContent
          essentialData={data.essential_data ?? []}
          userFlags={data.user_flags ?? []}
        />
      </div>
      <ReviewsSection
        reviews={data.reviews ?? []}
        essentialData={data.essential_data ?? []}
      />
    </div>
  ) : null;
}
