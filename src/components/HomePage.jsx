import { ReviewsList } from "./ReviewsList.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const HomePage = ({ checked, setChecked, categories }) => {
  const userValueFromContext = useContext(UserContext);

  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button">Log in</button>
        </Link>
      ) : (
        <div>
          <ReviewsList
            checked={checked}
            setChecked={setChecked}
            categories={categories}
          />
        </div>
      )}
    </div>
  );
};
