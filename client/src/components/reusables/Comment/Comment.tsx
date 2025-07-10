import "./style.css";
import { Review } from "@/types/types";
import Rating from "./Rating";

interface CommentProps {
  filmId?: number;
  review: Review;
}

export default function Comment({ filmId, review }: CommentProps) {
  const imgUrl =
    review.author_details.avatar_path ?? "/svgs/default-user-icon.svg";
  return (
    <div className='comment-container'>
      <div className='comment-upper comment-part'>
        <img src={imgUrl} className='review-pfp' />
        <div className='comment-content'>
          <div className='content-upper'>
            <h3>{review.author}</h3>
            <Rating rating={review.author_details.rating ?? 0} />
          </div>
          <div className='content-lower'>
            <p>{review.content}</p>
          </div>
        </div>
      </div>
      <div className='comment-lower comment-part'></div>
    </div>
  );
}
