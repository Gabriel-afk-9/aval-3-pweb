import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CountryCard from '../components/CountryCard';
import SearchComponent from '../components/Search';
import { countryService, type Country } from '../services/countryService';
import { favoritesStorage } from '../utils/favoritesStorage';
import styles from '../styles/Shared.module.css';

const REGIONS = [
  { value: 'all', label: 'Todos os continentes' },
  { value: 'Africa', label: 'África' },
  { value: 'Americas', label: 'Américas' },
  { value: 'Asia', label: 'Ásia' },
  { value: 'Europe', label: 'Europa' },
  { value: 'Oceania', label: 'Oceania' },
];

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  const { theme } = useOutletContext<{ theme: string }>();
  const isDarkMode = theme === 'dark';

  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(favoritesStorage.getFavorites());
  const [currentPage, setCurrentPage] = useState(1);

  const loadCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await countryService.getAllCountries();
      if (!data || data.length === 0) setError('Nenhum país encontrado');
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError('Erro ao carregar países.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCountries(); }, []);

  useEffect(() => {
    setCurrentPage(1);

    const timeoutId = setTimeout(async () => {
      let result = countries;
      
      if (searchTerm.trim()) {
        try {
            result = await countryService.searchByName(searchTerm);
        } catch { result = []; }
      }
      
      if (selectedRegion !== 'all') {
        result = result.filter(c => c.region === selectedRegion);
      }
      
      setFilteredCountries(result);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedRegion, countries]);

  const toggleFavorite = (code: string) => {
    const newFavs = favoritesStorage.toggleFavorite(code);
    setFavorites(newFavs);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCountries = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className={isDarkMode ? styles.dark : ''}>
      <SearchComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearSearch={() => setSearchTerm('')}
        selectedRegion={selectedRegion}
        REGIONS={REGIONS}
        setSelectedRegion={setSelectedRegion}
      />

      <div className={`${styles.resultsInfo} ${isDarkMode ? styles.dark : ''}`}>
        <p>
            {filteredCountries.length} {filteredCountries.length === 1 ? 'país encontrado' : 'países encontrados'}
            {filteredCountries.length > 0 && (
              <span> (Exibindo {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredCountries.length)})</span>
            )}
        </p>
      </div>

      {loading ? (
        <div className={`${styles.loading} ${isDarkMode ? styles.dark : ''}`}>
          <div className={styles.spinner}></div>
          <p>Carregando países...</p>
        </div>
      ) : error ? (
        <div className={`${styles.error} ${isDarkMode ? styles.dark : ''}`}>
          <p>{error}</p>
          <button onClick={loadCountries}>Tentar novamente</button>
        </div>
      ) : (
        <>
          <div className={styles.countriesGrid}>
            {currentCountries.map(country => (
              <CountryCard
                key={country.cca3}
                country={country}
                isFavorite={favorites.includes(country.cca3)}
                onToggleFavorite={toggleFavorite}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          {filteredCountries.length > ITEMS_PER_PAGE && (
            <div className={`${styles.pagination} ${isDarkMode ? styles.dark : ''}`}>
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className={styles.pageBtn}
              >
                <ChevronLeft size={20} /> Anterior
              </button>
              
              <span className={styles.pageInfo}>
                Página <strong>{currentPage}</strong>
              </span>
              
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                Próximo <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}