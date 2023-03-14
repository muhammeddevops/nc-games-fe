import { ReviewsList } from "./ReviewsList.jsx";

export const HomePage = ({ reviews, setReviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      {/* add sort-by drop down */}
      <ReviewsList reviews={reviews} setReviews={setReviews} />
    </div>
  );
};
