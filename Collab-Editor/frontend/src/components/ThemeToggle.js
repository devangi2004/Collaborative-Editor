import React from "react";
import "../styles.css"; // make sure path is correct

const ThemeToggle = ({ toggleTheme, isDark }) => {
  return (
    <button className="toggle-button" onClick={toggleTheme}>
      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
