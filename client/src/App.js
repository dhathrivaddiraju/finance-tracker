import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") !== "light"
  );

  // Apply dark mode to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Router>
      <Routes>

        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App Pages inside Layout */}
        <Route
          path="/dashboard"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Overview />
            </Layout>
          }
        />

        <Route
          path="/analytics"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Analytics />
            </Layout>
          }
        />

        <Route
          path="/budget"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Budget />
            </Layout>
          }
        />

        <Route
          path="/transactions"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Transactions />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Settings />
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
