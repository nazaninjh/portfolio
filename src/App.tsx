import HeaderComponent from "./components/header/header.component";
import ThemeTogglerComponent from "./components/theme-toggler/themeToggler.component";
import styles from "./App.module.scss";
import ShowOffComponent from "./components/show-off/showOff.component";
export default function App() {
  return (
    <div className={styles.app}>
      <ThemeTogglerComponent />
      <HeaderComponent />
      <ShowOffComponent />
    </div>
  );
}
