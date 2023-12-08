"use client";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const themes = {
  light: "light",
  dark: "dark",
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.dark);

  const toogleTheme = () => {
    const newTheme = theme === themes.dark ? themes.light : themes.dark;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <button
      onClick={toogleTheme}
      className="btn btn-primary btn-sm btn-outline"
    >
      {theme === "light" ? (
        <BsMoonFill className="h-4-w-4" />
      ) : (
        <BsSunFill className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
