import { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import SearchComponent from '../components/Search';
import { countryService, type Country } from '../services/countryService';
import { favoritesStorage } from '../utils/favoritesStorage';
import styles from '../styles/Shared.module.css';

export default function FavoritesPage() {
  const { theme } = useOutletContext<{ theme: string }>();
  const [favorites, setFavorites] = useState<string[]>(favoritesStorage.getFavorites());
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedRegion, setSelectedRegion] = useState({ value: 'all', label: 'Todos os Continentes' });

  useEffect(() => {
    const loadFavoritesData = async () => {
        setLoading(true);
        try {
            const allCountries = await countryService.getAllCountries();
            const filtered = allCountries.filter(c => favorites.includes(c.cca3));
            setFavoriteCountries(filtered);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    if (favorites.length > 0) loadFavoritesData();
    else {
        setFavoriteCountries([]);
        setLoading(false);
    }
  }, [favorites]);

  const toggleFavorite = (code: string) => {
    const newFavs = favoritesStorage.toggleFavorite(code);
    setFavorites(newFavs);
    setFavoriteCountries(prev => prev.filter(c => c.cca3 !== code));
  };

  const clearSearch = () => setSearchTerm('');

  const filteredFavorites = favoriteCountries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          country.name.official.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion.value === 'all' || country.region === selectedRegion.value;
    
    return matchesSearch && matchesRegion;
  });

  return (
    <div className={theme === 'dark' ? styles.dark : ''}>
      <SearchComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearSearch={clearSearch}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      {!loading && (
         <div className={`${styles.resultsInfo} ${theme === 'dark' ? styles.dark : ''}`}>
             <p>
               {filteredFavorites.length} {filteredFavorites.length === 1 ? 'favorito encontrado' : 'favoritos encontrados'}
             </p>
         </div>
      )}

      {loading ? (
        <div className={`${styles.loading} ${theme === 'dark' ? styles.dark : ''}`}>
            <div className={styles.spinner}></div>
        </div>
      ) : favorites.length === 0 ? (
        <div className={`${styles.noResults} ${theme === 'dark' ? styles.dark : ''}`}>
          <p>Você ainda não tem favoritos.</p>
          <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold', marginTop: '1rem', display: 'inline-block' }}>
            Explorar Países
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className={`${styles.noResults} ${theme === 'dark' ? styles.dark : ''}`}>
           <p>Nenhum favorito encontrado para esta busca.</p>
        </div>
      ) : (
        <div className={styles.countriesGrid}>
          {filteredFavorites.map(country => (
            <CountryCard
              key={country.cca3}
              country={country}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              isDarkMode={theme === 'dark'}
            />
          ))}
        </div>
      )}
    </div>
  );
}