import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header.jsx";
import { Routes, Route, Link } from "react-router-dom";
import { LoginPage } from "./components/LoginPage.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { IndvReview } from "./components/IndvReview.jsx";
import { SingleCategory } from "./components/SingleCategory.jsx";
import { Categories } from "./components/Categories.jsx";
import { PostReview } from "./components/PostReview.jsx";
import { UserContext } from "./contexts/UserContext.js";
import { useEffect, useState, useContext } from "react";
import { getCategories, getReviews, getUsers } from "./api/api";
import { Navbar, Nav } from "react-bootstrap";
import { DarkModeContext } from "./contexts/DarkModeContext";

function App() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const userValueFromContext = useContext(UserContext);
  const darkModeValueFromContext = useContext(DarkModeContext);

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviews) => {
      setReviews(reviews.results);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((categories) => {
      setCategories(categories);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const darkModeVar = darkModeValueFromContext.darkMode === true;

  const lightModeVar = darkModeValueFromContext.darkMode === false;

  return (
    <div className={`App ${darkModeVar ? "dark-mode" : ""}`}>
      <Header />

      <Routes>
        <Route
          path="/categories"
          element={<Categories reviews={reviews} categories={categories} />}
        />
        <Route
          path="/categories/:category"
          element={<SingleCategory reviews={reviews} />}
        />
        <Route path="/homepage" element={<HomePage />} />
        <Route
          path="/reviews/:review_id"
          element={<IndvReview reviews={reviews} />}
        />
        <Route path="/" element={<LoginPage users={users} />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/reviews/:review_id" element={<IndvReview />} />
        <Route
          path="/post-review"
          element={
            <PostReview categories={categories} setReviews={setReviews} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
