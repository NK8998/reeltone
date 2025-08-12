import { useQuery } from "@tanstack/react-query";
import Reviews from "./Reviews";
import { backendService } from "@/services/backendService";
import MainSectionLoader from "../reusables/MainSectionLoader";
import MainSectionError from "../reusables/MainSectionError";
import { useInView } from "react-intersection-observer";

type ReviewsProps = {
  filmId: number;
  filmTitle: string;
};

export default function LazyReviews({ filmId, filmTitle }: ReviewsProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const {
    data: reviews,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["filmReviews", filmId],
    queryFn: () => backendService.getMovieReviews(filmId),
    enabled: inView,
  });

  return (
    <div ref={ref}>
      {isError && <MainSectionError errorMessage={error.message} />}
      {isLoading && <MainSectionLoader />}
      {reviews && (
        <Reviews
          reviews={reviews?.results ?? []}
          filmId={filmId}
          filmTitle={filmTitle}
        />
      )}
    </div>
  );
}
