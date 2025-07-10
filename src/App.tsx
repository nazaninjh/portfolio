import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/header/header.component";
import ThemeTogglerComponent from "./components/theme-toggler/themeToggler.component";
import ShowOffComponent from "./components/show-off/showOff.component";

import styles from "./App.module.scss";
import Test from "./pages/test/Test";
import gsap from "gsap";
import { ScrollTrigger, SplitText, Draggable } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText, Draggable);
export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={styles.app}>
            <ThemeTogglerComponent />
            <HeaderComponent />
            <ShowOffComponent />
          </div>
        }
      />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}
