import { useTheme } from "@/context/theme";
import { useEffect, useState } from "react";

// useEffect to avoid 'server text did not match client' warning in console
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  // state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <button className="nav-link" onClick={toggleTheme}>
          {/* crescent moon, sun with rays */}
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      )}
    </>
  );
}
