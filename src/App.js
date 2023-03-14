import "./App.css";
import { Header } from "./components/Header.jsx";
import { Routes, Route, RouterProvider } from "react-router-dom";
import { LoginPage } from "./components/LoginPage.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { IndvReview } from "./components/IndvReview.jsx";
import { useState, useEffect } from "react";
import { getReviews } from "./api/api.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviews) => {
      setReviews(reviews.results);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h3>Loading content...</h3>;
  } else {
    return (
      <div className="App">
        <Header />

        <Routes>
          <Route
            path="/homepage"
            element={<HomePage reviews={reviews} setReviews={setReviews} />}
          />
          <Route
            path="/reviews/:review_id"
            element={<IndvReview reviews={reviews} setReviews={setReviews} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
