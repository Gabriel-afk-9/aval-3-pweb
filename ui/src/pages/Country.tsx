import { useState, useEffect } from "react";
import HeaderCountry from "../components/HeaderCountry";
import Footer from "../components/Footer";
import CountryDetailsCard from "../components/CountryDeatailsCard";
import styles from "../styles/CountryPage.module.css";
import { favoritesStorage } from "../utils/favoritesStorage";
import { useLocation } from "react-router-dom";

export default function CountryPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { state } = useLocation();

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  const toggleFavorite = (countryCode: string) => {
    const newFavorites = favoritesStorage.toggleFavorite(countryCode);
    setFavorites(newFavorites);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}
    >
      <HeaderCountry theme={theme} toggleTheme={toggleTheme} />
      <div>
        <div className={styles.countriesGrid}>
          <CountryDetailsCard
            key={state.cca3}
            country={state}
            isFavorite={favoritesStorage.isFavorite(state.cca3)}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </div>
      <Footer theme={theme} />
    </div>
  );
}
