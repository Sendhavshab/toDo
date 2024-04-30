import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Save preference to localStorage
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  // Function to load dark mode preference from localStorage on component mount
  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) {
      setDarkMode(storedMode === "true");
    } else {
      // Detect user's default mode
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);

  // Add dark class to html element based on dark mode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="relative inline-block">
      <button className="focus:outline-none" onClick={toggleDarkMode}>
        <div className=" hover:bg-orange-400 dark:hover:bg-yellow-400 hover:bg-opacity-30 p-1 rounded-full">
          {darkMode ? (
            <MdDarkMode size={24} color="#3182CE" />
          ) : (
            <TiWeatherSunny size={24} className="text-blue-600" />
          )}
        </div>
      </button>
    </div>
  );
};

export default DarkModeToggle;
