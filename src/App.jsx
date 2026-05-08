import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyFooter from "./components/MyFooter";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/homepage/HOME";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Details from "./components/detailsPage/Details";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background:
          "linear-gradient(135deg, #fef9c3 0%, #fde68a 50%, #fbbf24 100%)",
        minHeight: "100vh",
      }}
    >
      <header>
        <MyNavbar query={query} setQuery={setQuery} />
      </header>
      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={<Home query={query} setQuery={setQuery} />}
          />
          <Route path="/Details/:name" element={<Details />} />
        </Routes>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
}

export default App;
