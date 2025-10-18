import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import { ScrollToTop } from "./components/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </StrictMode>
);
