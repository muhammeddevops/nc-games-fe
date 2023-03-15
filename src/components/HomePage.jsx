import { ReviewsList } from "./ReviewsList.jsx";
import { Profile } from "./Profile.jsx";

export const HomePage = ({ reviews, setReviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      <Profile />
      {/* add sort-by drop down */}
      <ReviewsList reviews={reviews} setReviews={setReviews} />
    </div>
  );
};
