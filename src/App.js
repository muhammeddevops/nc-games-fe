import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { IndvReview } from "./components/IndvReview.jsx";
import { SingleCategory } from "./components/SingleCategory.jsx";
import { PostReview } from "./components/PostReview.jsx";
import { UserContext } from "./contexts/UserContext.js";
import { useEffect, useState, useContext } from "react";
import { getCategories, getReviews, getUsers } from "./api/api";
import { DarkModeContext } from "./contexts/DarkModeContext";

function App() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState(false);

  const userValueFromContext = useContext(UserContext);
  const darkModeValueFromContext = useContext(DarkModeContext);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews.results);
    });
  }, []);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

  return (
    <div className={`App ${darkModeVar ? "dark-mode" : ""}`}>
      <Routes>
        <Route
          path="/categories/:category"
          element={
            <SingleCategory
              reviews={reviews}
              checked={checked}
              setChecked={setChecked}
              categories={categories}
            />
          }
        />
        <Route
          path="/reviews/:review_id"
          element={
            <IndvReview
              reviews={reviews}
              checked={checked}
              setChecked={setChecked}
              users={users}
            />
          }
        />
        <Route path="/" element={<LoginPage users={users} />} />
        <Route
          path="/homepage"
          element={
            <HomePage
              checked={checked}
              setChecked={setChecked}
              categories={categories}
            />
          }
        />
        <Route
          path="/post-review"
          element={
            <PostReview
              categories={categories}
              setReviews={setReviews}
              checked={checked}
              setChecked={setChecked}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
