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
        <h3>Logged in as: {userValueFromContext.user.username}</h3>
      )}
    </div>
  );
};
