import { Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Profile } from "./Profile.jsx";
import { useContext, useEffect, useState } from "react";
import { getReviewsByCategory } from "../api/api";

export const SingleCategory = () => {
  const { category } = useParams();
  const [filteredReviews, setFilteredReviews] = useState([]);

  const userValueFromContext = useContext(UserContext);

  useEffect(() => {
    getReviewsByCategory(category).then((reviews) => {
      setFilteredReviews(reviews.results);
      //   setVotes(review.votes);
    });
  }, [category]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const upperCase = capitalizeFirstLetter(category);

  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button">Log in</button>
        </Link>
      ) : (
        <div>
          <Profile />
          <h2>{upperCase} games</h2>
          <div id="reviews-container">
            {filteredReviews.map((review) => {
              const formattedDate = new Date(review.created_at).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              );
              return (
                <Link
                  to={`/reviews/${review.review_id}`}
                  key={review.review_id}
                >
                  <div className="review-square">
                    <img src={review.review_img_url} alt={review.review_id} />
                    <h4>{review.title}</h4>
                    <div className="author-date">
                      <p>By {review.owner}</p>
                      <p>{formattedDate}</p>
                      <p>Votes: {review.votes}</p>
                    </div>
                    <p> {review.comment_count} comments </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
