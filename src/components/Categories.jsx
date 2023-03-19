import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/api.js";
import { UserContext } from "../contexts/UserContext";
import { FilteredList } from "./FilteredList.jsx";
import { PostReview } from "./PostReview.jsx";

export const Categories = ({ reviews, categories }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const userValueFromContext = useContext(UserContext);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleCategory = (category) => {
    const filterByCategory = reviews.filter((review) => {
      return review.category === category;
    });
    setFilteredList(filterByCategory);
  };

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
          <Link to="/">
            <button type="button" onClick={handleLogOut}>
              Log out
            </button>
          </Link>
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => {
              return (
                <Link to={`/categories/${category.slug}`} key={category.slug}>
                  <li key={category.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        handleCategory(category.slug);
                      }}
                    >
                      {category.slug}
                    </button>
                  </li>
                </Link>
              );
            })}
          </ul>
          <FilteredList filteredList={filteredList} />
        </div>
      )}
    </div>
  );
};
