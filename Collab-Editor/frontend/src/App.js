import React, { useState } from "react";
import Editor from "./components/Editor";
import ThemeToggle from "./components/ThemeToggle";
import "./styles.css";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      !isDark ? "dark" : "light"
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        {/* User Info */}
        <div className="user-info">
          <span className="avatar">D</span>
          <span className="username">Hello, Devangi</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
      </header>

      <Editor />
    </div>
  );
}

export default App;
