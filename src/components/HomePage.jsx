import { ReviewsList } from "./ReviewsList.jsx";
import { Link } from "react-router-dom";
import { Profile } from "./Profile.jsx";

export const HomePage = () => {
  return (
    <div>
      <h2>Reviews</h2>
      <Link to="/categories">
        <h3>Categories</h3>
      </Link>
      <Profile />
      {/* add sort-by drop down */}
      <ReviewsList />
    </div>
  );
};
