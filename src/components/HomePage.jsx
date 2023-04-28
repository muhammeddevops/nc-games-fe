import { ReviewsList } from "./ReviewsList.jsx";
import { Link } from "react-router-dom";
import { Profile } from "./Profile.jsx";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { PostReview } from "./PostReview.jsx";

export const HomePage = () => {
  const userValueFromContext = useContext(UserContext);

  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button">Log in</button>
        </Link>
      ) : (
        <div>
          <ReviewsList />
        </div>
      )}
    </div>
  );
};
