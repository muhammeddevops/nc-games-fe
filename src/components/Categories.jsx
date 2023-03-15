import { useEffect, useState } from "react";
import { getCategories } from "../api/api.js";
import { FilteredList } from "./FilteredList.jsx";

export const Categories = ({ reviews }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);

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

  console.log(reviews, "IN CATEGORIESSS");
  const handleCategory = (category) => {
    console.log(category);
    const filterByCategory = reviews.filter((review) => {
      return review.category === category;
    });
    setFilteredList(filterByCategory);
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => {
          return (
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
          );
        })}
      </ul>
      <FilteredList filteredList={filteredList} />
    </div>
  );
};
