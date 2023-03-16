import { Link } from "react-router-dom";

export const FilteredList = ({ filteredList }) => {
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
