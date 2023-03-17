import { ReviewsList } from "./ReviewsList.jsx";
import { Link } from "react-router-dom";
import { Profile } from "./Profile.jsx";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const HomePage = () => {
  const userValueFromContext = useContext(UserContext);

  const handleLogOut = () => {
    userValueFromContext.setUser(null);
  };

  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button">Log in</button>
        </Link>
      ) : (
        <div>
          <h2>Reviews</h2>
          <Link to="/">
            <button type="button" onClick={handleLogOut}>
              Log out
            </button>
          </Link>
          <Link to="/categories">
            <h3>Categories</h3>
          </Link>
          <Profile />
          {/* add sort-by drop down */}
          <ReviewsList />{" "}
        </div>
      )}
    </div>
  );
};
