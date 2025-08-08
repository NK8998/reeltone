import { FilmData } from "@/types/types";
import Hero from "./Hero";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import MiddleContent from "./MiddleContent";
import ReviewsSection from "./ReviewsSection";

interface MainContentProps {
  data: FilmData;
}
export default function MainContent({ data }: MainContentProps) {
  return (
    <div className='film-main-content'>
      <Hero backgroundImage={data.essential_data.backdrop_path} />
      <div className='film-flex-content'>
        <LeftContent
          posterPath={data.essential_data.poster_path}
          trailer={data.essential_data.trailer}
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
  );
}
