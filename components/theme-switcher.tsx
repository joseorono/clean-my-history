import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useEffect, useState } from "react";

/**
 * ThemeSwitcher component that toggles between light and dark modes
 * Styled as a pill-shaped toggle with sliding circle
 * Manages both MUI and Tailwind CSS themes
 */
export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(initialDark);
    applyTheme(initialDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    const htmlElement = document.documentElement;
    if (dark) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
    window.dispatchEvent(new Event("storage"));
  };

  const handleToggle = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    applyTheme(newDarkMode);
  };

  if (!mounted) {
    return null;
  }

  const pillColor = isDark ? "#0f172a" : "#1f2937";
  const iconSx = (active: boolean) => ({
    fontSize: "0.875rem",
    color: pillColor,
    opacity: active ? 1 : 0.6,
    transform: active ? "scale(1)" : "scale(0.92)",
    transition: "opacity 0.35s ease, transform 0.35s ease, color 0.35s ease"
  });
  const knobOffset = isDark ? "0.25rem" : "calc(100% - 1.75rem)";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative flex h-8 w-16 cursor-pointer items-center justify-between rounded-full px-1 transition-transform duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
      style={{
        backgroundColor: pillColor,
        transition: "background-color 0.35s ease, box-shadow 0.35s ease"
      }}
      aria-label={isDark ? "Activate light theme" : "Activate dark theme"}>
      <div
        className="absolute h-6 w-6 rounded-full bg-white shadow-sm"
        style={{
          left: knobOffset,
          top: "50%",
          transform: "translateY(-50%)",
          transition: "left 0.35s ease, transform 0.35s ease"
        }}
      />
      <div className="relative z-0 flex h-6 w-6 items-center justify-center">
        <DarkModeIcon sx={iconSx(isDark)} />
      </div>
      <div className="relative z-0 flex h-6 w-6 items-center justify-center">
        <LightModeIcon sx={iconSx(!isDark)} />
      </div>
    </button>
  );
}