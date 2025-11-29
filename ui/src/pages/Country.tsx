import { useState, useEffect } from "react";
import HeaderCountry from "../components/HeaderCountry";
import Footer from "../components/Footer";
import CountryDetailsCard from "../components/CountryDeatailsCard";
import type { Country } from "../services/countryService";
import { countryService } from "../services/countryService";
import styles from "../styles/CountryPage.module.css";
import { favoritesStorage } from "../utils/favoritesStorage";
import { useLocation } from 'react-router-dom';


export default function CountryPage() {
  const [countryTest, setCountryTest] = useState<Country | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { state } = useLocation();

  useEffect(() => {
    countryService.getCountryByCode("076").then((data) => {
      setCountryTest(data);
    });
  }, []);

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
          {countryTest && (
            <CountryDetailsCard
              key={state.cca3}
              country={state}
              isFavorite={favorites.includes(state.cca3)}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </div>
      <Footer theme={theme} />
    </div>
  );
}
