import "./App.css";
import { Header } from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { IndvReview } from "./components/IndvReview.jsx";
import { Categories } from "./components/Categories.jsx";
import { UserContext } from "./contexts/UserContext.js";
import { useEffect, useState, useContext } from "react";
import { getReviews, getUsers } from "./api/api";

function App() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userValueFromContext = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviews) => {
      setReviews(reviews.results);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/categories" element={<Categories reviews={reviews} />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route
          path="/reviews/:review_id"
          element={<IndvReview reviews={reviews} />}
        />
        <Route path="/" element={<LoginPage users={users} />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/reviews/:review_id" element={<IndvReview />} />
      </Routes>
    </div>
  );
}

export default App;
