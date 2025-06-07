import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggleButton = ({ toggleTheme, isDark }) => {
  return (
    <button
      onClick={toggleTheme}
      className="absolute top-20 right-4 bg-orange-500 text-white px-3 py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
    >
      {isDark ? <FiMoon/> : <FiSun/>}
    </button>
  );
};

export default ThemeToggleButton;