import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/api.js";
import { UserContext } from "../contexts/UserContext";
import { FilteredList } from "./FilteredList.jsx";

export const Categories = ({ reviews }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const userValueFromContext = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((categories) => {
      setCategories(categories);
      setIsLoading(false);
    });
  }, []);
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

  const handleLogIn = () => {
    userValueFromContext.setUser(null);
  };

  return (
    <div>
      {!userValueFromContext.user ? (
        <Link to="/">
          <button type="button" onClick={handleLogIn}>
            Log in
          </button>
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
