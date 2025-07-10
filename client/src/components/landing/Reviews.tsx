import { Review } from "@/types/types";
import Comment from "../reusables/Comment/Comment";
import Link from "next/link";

interface ReviewsProps {
  reviews: Review[];
  filmId?: number;
  filmTitle?: string;
}

export default function Reviews({ reviews, filmId, filmTitle }: ReviewsProps) {
  if (!reviews || !filmTitle) return <></>;

  const elements = reviews.map((review, index) => (
    <Comment review={review} filmId={filmId} key={index} />
  ));

  return (
    <section className='limited-width'>
      <div
        className='section-top-row with-border'
        style={{ "--section-translate-y": "0px" } as React.CSSProperties}
      >
        <h4>Popular Reviews for {filmTitle}</h4>
        <Link href={`/film/${filmId}`}>
          <p>More</p>
        </Link>
      </div>
      <div className='reviews-block'>{elements}</div>
    </section>
  );
}
