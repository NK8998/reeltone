import { LandingDataType } from "@/types/types";
import CTAButtons from "./CTAButtons";
import EnticerBox from "./EnticerBox";
import Features from "./Features";
import Hero from "./Hero";
import LazyReviews from "./LazyReviews";
import { RecentFilms } from "./RecentFilms";
import Top6 from "./Top6";

export default function MainContent({
  landingData,
  loading,
}: {
  landingData: LandingDataType;
  loading: boolean;
}) {
  return (
    <>
      <Hero trending_film={landingData.trending_film} />
      <CTAButtons />
      <Top6 Top6={landingData.top_6_recent_films ?? []} loading={loading} />
      <Features />
      <RecentFilms
        recent_films={landingData.recent_films ?? []}
        loading={loading}
      />
      <EnticerBox
        filmId={landingData.trending_film?.id}
        filmTitle={landingData.trending_film?.title}
      />
      {landingData.trending_film && (
        <LazyReviews
          filmId={landingData.trending_film?.id}
          filmTitle={landingData.trending_film?.title}
        />
      )}
    </>
  );
}
