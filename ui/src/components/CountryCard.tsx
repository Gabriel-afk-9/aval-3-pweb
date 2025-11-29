import { useState } from 'react';
import { Heart, ChevronDown, ChevronUp, MapPin, Users, Globe2, Coins } from 'lucide-react';
import type { Country } from '../services/countryService';
import { formatters } from '../utils/formatters';
import styles from '../styles/Home/CountryCard.module.css';

interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (code: string) => void;
}

export default function CountryCard({ country, isFavorite, onToggleFavorite }: CountryCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const languages = country.languages 
    ? Object.values(country.languages) 
    : [];
  
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`)
    : [];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img 
          src={country.flags.png} 
          alt={country.flags.alt || `Bandeira de ${country.name.common}`}
          loading="lazy"
        />
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
          onClick={() => onToggleFavorite(country.cca3)}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className={styles.cardBody}>
        <h3>{country.name.common}</h3>
        
        <div className={styles.cardInfo}>
          <div className={styles.infoItem}>
            <MapPin size={16} />
            <span><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</span>
          </div>
          
          <div className={styles.infoItem}>
            <Globe2 size={16} />
            <span><strong>Região:</strong> {country.region}</span>
          </div>
          
          <div className={styles.infoItem}>
            <Users size={16} />
            <span><strong>População:</strong> {formatters.population(country.population)}</span>
          </div>
        </div>

        <button 
          className={styles.detailsBtn}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              Menos detalhes <ChevronUp size={18} />
            </>
          ) : (
            <>
              Mais detalhes <ChevronDown size={18} />
            </>
          )}
        </button>

        {showDetails && (
          <div className={styles.cardDetails}>
            <div className={styles.detailRow}>
              <strong>Nome oficial:</strong>
              <span>{country.name.official}</span>
            </div>
            
            {country.subregion && (
              <div className={styles.detailRow}>
                <strong>Sub-região:</strong>
                <span>{country.subregion}</span>
              </div>
            )}
            
            <div className={styles.detailRow}>
              <strong>Área:</strong>
              <span>{formatters.area(country.area)}</span>
            </div>
            
            {languages.length > 0 && (
              <div className={styles.detailRow}>
                <strong>Idiomas:</strong>
                <span>{formatters.list(languages)}</span>
              </div>
            )}
            
            {currencies.length > 0 && (
              <div className={styles.detailRow}>
                <Coins size={16} />
                <strong>Moedas:</strong>
                <span>{formatters.list(currencies)}</span>
              </div>
            )}
            
            {country.timezones && country.timezones.length > 0 && (
              <div className={styles.detailRow}>
                <strong>Fusos horários:</strong>
                <span>{country.timezones.length === 1 ? country.timezones[0] : `${country.timezones.length} fusos`}</span>
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
        )}
      </div>
    </div>
  );
}