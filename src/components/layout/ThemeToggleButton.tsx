"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  // Xử lý trường hợp theme có thể undefined khi đang loading
  const currentTheme = theme || "light";

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus-ring transition-all duration-200 group"      aria-label={
        currentTheme === "light" ? t.theme.toggleToDark : t.theme.toggleToLight
      }
      title={
        currentTheme === "light" ? t.theme.toggleToDark : t.theme.toggleToLight
      }
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <SunIcon
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 transform ${
            currentTheme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
        <MoonIcon
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 transform ${
            currentTheme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
      {/* Tooltip for desktop - positioned below button */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {currentTheme === "light" ? t.theme.dark : t.theme.light}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
      </div>
    </button>
  );
}
