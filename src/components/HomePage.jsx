import { ReviewsList } from "./ReviewsList.jsx";
import { Link } from "react-router-dom";

export const HomePage = ({ reviews, setReviews, isLoading }) => {
  return (
    <div>
      <h2>Reviews</h2>
      <Link to="/categories">
        <h3>Categories</h3>
      </Link>
      {/* add sort-by drop down */}
      <ReviewsList
        reviews={reviews}
        setReviews={setReviews}
        isLoading={isLoading}
      />
    </div>
  );
};
