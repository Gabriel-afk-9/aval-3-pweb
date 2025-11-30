import { useState, useEffect } from "react";
import { useLocation, Navigate, useOutletContext } from "react-router-dom";
import CountryDetailsCard from "../components/CountryDetailsCard";
import { favoritesStorage } from "../utils/favoritesStorage";
import styles from "../styles/Country.module.css";

export default function CountryPage() {
  const { state } = useLocation();
  const { theme } = useOutletContext<{ theme: string }>();
  const [isFav, setIsFav] = useState(false);

  const isDarkMode = theme === "dark";

  if (!state) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    setIsFav(favoritesStorage.isFavorite(state.cca3));
  }, [state.cca3]);

  const toggleFavorite = (countryCode: string) => {
    favoritesStorage.toggleFavorite(countryCode);
    setIsFav(!isFav);
  };

  return (
    <div className={styles.detailsContainer} data-theme={theme}>
      <CountryDetailsCard
        country={state}
        isFavorite={isFav}
        onToggleFavorite={toggleFavorite}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}