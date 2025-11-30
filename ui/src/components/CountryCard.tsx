import { Heart, MapPin, Users, Globe2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Country } from '../services/countryService';
import { formatters } from '../utils/formatters';
import styles from '../styles/Home/CountryCard.module.css';

interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (code: string) => void;
  isDarkMode: boolean;
}

export default function CountryCard({ 
  country, 
  isFavorite, 
  onToggleFavorite,
  isDarkMode
}: CountryCardProps) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/country/${country.cca3}`, { state: country });
  };

  return (
    <div className={styles.card} data-theme={isDarkMode ? "dark" : "light"}>
      <div className={styles.cardHeader}>
        <img 
          src={country.flags.png} 
          alt={country.flags.alt || `Bandeira de ${country.name.common}`}
          loading="lazy"
        />
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(country.cca3);
          }}
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
          onClick={handleDetailsClick}
        >
          Mais detalhes <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}