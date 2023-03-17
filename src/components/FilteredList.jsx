import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const FilteredList = ({ filteredList }) => {
  const userValueFromContext = useContext(UserContext);

  return (
    <div>
      <ul>
        {filteredList.map((review) => {
          return (
            <Link to={`/reviews/${review.review_id}`} key={review.review_id}>
              <li>
                <p>{review.title}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
