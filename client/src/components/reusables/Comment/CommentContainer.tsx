import { useEffect, useRef } from "react";

interface CommentContainerProps {
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
}

export default function CommentContainer({
  commentText,
  setCommentText,
}: CommentContainerProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const justMounted = useRef(true);
  useEffect(() => {
    if (!inputRef.current || !placeholderRef.current) return;

    if (justMounted.current) {
      inputRef.current.innerHTML = commentText;
      justMounted.current = false;
    }

    placeholderRef.current.classList.toggle("hidden", commentText.length > 0);
  }, [commentText, inputRef, placeholderRef]);

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    if (!inputRef.current || !placeholderRef.current) return;

    let value = inputRef.current.textContent || "";

    // Trim whitespace and normalize empty state
    const htmlContent = inputRef.current.innerHTML.trim();
    const isEmpty = htmlContent === "<br>" || htmlContent === "";

    if (isEmpty) {
      value = "";
      inputRef.current.innerHTML = "";
    }

    setCommentText(value);

    if (value.length > 0) {
      placeholderRef.current.classList.add("hidden");
    } else {
      placeholderRef.current.classList.remove("hidden");
    }
  };

  return (
    <div className='comment-container'>
      <div
        contentEditable
        className='comment-input'
        onInput={handleChange}
        ref={inputRef}
      />
      <div className={`placeholder`} ref={placeholderRef}>
        Add a comment...
      </div>
    </div>
  );
}
