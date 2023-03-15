import "./App.css";
import { Header } from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { IndvReview } from "./components/IndvReview.jsx";
import { Categories } from "./components/Categories.jsx";
import { getReviews } from "./api/api";
import { useEffect, useState } from "react";

function App() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviews) => {
      setReviews(reviews.results);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/categories" element={<Categories reviews={reviews} />} />
        <Route
          path="/homepage"
          element={<HomePage reviews={reviews} isLoading={isLoading} />}
        />
        <Route
          path="/reviews/:review_id"
          element={<IndvReview reviews={reviews} />}
        />
      </Routes>
    </div>
  );
}

export default App;
