import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsOfReview, getSingleReview } from "../api/api";

export const IndvReview = ({ reviews, setReviews }) => {
  const { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);

  console.log(review_id);
  useEffect(() => {
    setIsLoading(true);
    getSingleReview(review_id).then((review) => {
      setReview(review);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCommentsOfReview(review_id).then((comments) => {
      setComments(comments.results);
    });
  }, []);

  console.log(comments);

  const formattedDate = new Date(review.created_at).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <div id="review-pg-container">
      <div id="review-container">
        <h1>{review.title}</h1>;
        <img src={review.review_img_url} alt={review.title} />
        <p>{review.review_body}</p>
        <p>By {review.owner}</p>
        <p>Votes: {review.votes}</p>
        <p>{formattedDate}</p>
      </div>
      <div id="comments-container">
        <h3>Comments</h3>
        {comments.map((comment) => {
          const formattedCommentDate = new Date(
            comment.created_at
          ).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          return (
            <div className="comment-box">
              <p>{comment.body}</p>
              <p>{formattedCommentDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
