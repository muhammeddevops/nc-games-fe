import "./App.css";
import { Header } from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { IndvReview } from "./components/IndvReview.jsx";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/reviews/:review_id" element={<IndvReview />} />
      </Routes>
    </div>
  );
}

export default App;
