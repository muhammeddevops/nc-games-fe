import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </UserProvider>
  </BrowserRouter>
);
