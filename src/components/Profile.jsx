import { UserContext } from "../contexts/UserContext.js";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const Profile = () => {
  const userValueFromContext = useContext(UserContext);

  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button">Log in</button>
        </Link>
      ) : (
        <p className="logged-in-as">
          Logged in as: {userValueFromContext.user.username}
        </p>
      )}
    </div>
  );
};
