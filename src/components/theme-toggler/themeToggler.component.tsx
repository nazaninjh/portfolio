import { useEffect, useRef } from "react";
import ThemeSvgIcon from "./assets/icons/themeSvg.icon";
import styles from "./themeToggler.module.scss";
export default function ThemeTogglerComponent() {
  const togglerRef = useRef<null | HTMLButtonElement>(null);
  useEffect(() => {
    // check for preference when user first visits
    if (!localStorage.getItem("theme")) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (prefersDark) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    }
    // for when user refreshes or enters the page
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      ref={togglerRef}
      type="button"
      title="toggle theme"
      className={styles.toggler}
      onClick={toggleTheme}
      onMouseEnter={() => {
        if (!togglerRef.current) return;
        const isDark = document.body.classList.contains("dark");
        togglerRef.current.style.filter = isDark
          ? "drop-shadow(0px 2px 10px hsl(220, 12%, 30%))"
          : "drop-shadow(0px 2px 7px gray)";
      }}
      onMouseLeave={() => {
        if (!togglerRef.current) return;

        togglerRef.current.style.filter = "";
      }}
    >
      <ThemeSvgIcon />
    </button>
  );
}
