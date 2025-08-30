import { EssentialData, Film, FilmPageReview } from "@/types/types";
import Comment from "../reusables/Comment/Comment";
import { useState } from "react";
import CommentForm from "../reusables/Comment/CommentForm";

interface ReviewsSectionProps {
  reviews: FilmPageReview[];
  essentialData?: EssentialData; // Optional, if needed for context
}
export default function ReviewsSection({
  reviews,
  essentialData,
}: ReviewsSectionProps) {
  const [currentReviews, setCurrentReviews] =
    useState<FilmPageReview[]>(reviews);

  const {
    id: filmId,
    title: filmTitle,
    poster_path: filmPoster,
  } = essentialData || { id: 0 };

  return (
    <section className='reviews-section'>
      <div className='left-side' />
      <div className='comments-side'>
        <CommentForm
          filmId={filmId}
          filmTitle={filmTitle}
          filmPoster={filmPoster}
          setCurrentReviews={setCurrentReviews}
        />
        <div className='comments-list'>
          <h2 className='comments-title text-1xl font-bold mb-4 mt-4'>
            <u>Reviews</u>
          </h2>
          {currentReviews.map((review, index) => (
            <Comment
              key={index}
              review={review}
              setCurrentReviews={setCurrentReviews}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
