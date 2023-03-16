import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api/api";

export const ReviewsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviews) => {
      setReviews(reviews.results);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h3>Loading content...</h3>;
  } else {
    return (
      <div id="reviews-container">
        {reviews.map((review) => {
          const formattedDate = new Date(review.created_at).toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          );
          return (
            <Link to={`/reviews/${review.review_id}`} key={review.review_id}>
              <div className="review-square">
                <img src={review.review_img_url} alt={review.review_id} />
                <h4>{review.title}</h4>
                <div className="author-date">
                  <p>By {review.owner}</p>
                  <p>{formattedDate}</p>
                  <p>Votes: {review.votes}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
};
