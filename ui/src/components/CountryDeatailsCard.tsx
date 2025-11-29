import {
  MapPin,
  Users,
  Globe2,
  Coins,
  AreaChart,
  Languages,
  Map,
  Landmark,
  Clock,
  Heart,
} from "lucide-react";
import type { Country } from "../services/countryService";
import { formatters } from "../utils/formatters";
import styles from "../styles/Country/CountryDetailsCard.module.css";

interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (code: string) => void;
}

export default function CountryDetailsCard({
  country,
  isFavorite,
  onToggleFavorite,
}: CountryCardProps) {
  const languages = country.languages ? Object.values(country.languages) : [];

  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol})`)
    : [];
    
  console.log(isFavorite);
  return (
    <div className={styles.card}>

      <button
        className={`${styles.favoriteBt} ${isFavorite ? styles.active : ""}`}
        onClick={() => onToggleFavorite(country.cca3)}
        aria-label={
          isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
      >
        <Heart size={20} color="currentColor" fill={isFavorite ? "currentColor" : "none"} />
      </button>
      <div className={styles.cardHeader}>
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Bandeira de ${country.name.common}`}
          loading="lazy"
        />
      </div>

      <div className={styles.cardBody}>
        <h3>{country.name.common}</h3>

        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <MapPin size={16} />
            <span>
              <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <Globe2 size={16} />
            <span>
              <strong>Região:</strong> {country.region}
            </span>
          </div>

          <div className={styles.infoItem}>
            <Users size={16} />
            <span>
              <strong>População:</strong>{" "}
              {formatters.population(country.population)}
            </span>
          </div>

          <div className={styles.infoItem}>
            <Landmark size={16} />
            <span>
              <strong>Nome oficial:</strong> {country.name.official}
            </span>
          </div>

          <div className={styles.infoItem}>
            <Map size={16} />
            <span>
              <strong>Sub-Região:</strong> {country.subregion}
            </span>
          </div>

          <div className={styles.infoItem}>
            <AreaChart size={16} />
            <span>
              <strong>Área:</strong> {formatters.area(country.area)}
            </span>
          </div>

          <div className={styles.infoItem}>
            <Languages size={16} />
            <strong>Idiomas:</strong>
            <span>{formatters.list(languages)}</span>
          </div>

          {currencies.length > 0 && (
            <div className={styles.infoItem}>
              <Coins size={16} />
              <strong>Moedas:</strong>
              <span>{formatters.list(currencies)}</span>
            </div>
          )}

          {country.timezones && country.timezones.length > 0 && (
            <div className={styles.infoItem}>
              <Clock size={16} />
              <strong>Fusos horários:</strong>
              <span>
                {country.timezones.length === 1
                  ? country.timezones[0]
                  : `${country.timezones.length} fusos`}
              </span>
            </div>
          )}

          {country.maps?.googleMaps && (
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Ver no Google Maps →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
