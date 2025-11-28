import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountryCard from '../components/CountryCard';
import type { Country } from '../services/countryService';
import { countryService } from '../services/countryService';
import { favoritesStorage } from '../utils/favoritesStorage';
import styles from '../styles/HomePage.module.css';

const REGIONS = [
  { value: 'all', label: 'Todos os continentes' },
  { value: 'Africa', label: 'África' },
  { value: 'Americas', label: 'Américas' },
  { value: 'Asia', label: 'Ásia' },
  { value: 'Europe', label: 'Europa' },
  { value: 'Oceania', label: 'Oceania' },
];

export default function HomePage() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });
  const [currentView, setCurrentView] = useState('home');
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    setFavorites(favoritesStorage.getFavorites());
  }, []);

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
  const timeoutId = setTimeout(() => {
    filterCountries();
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchTerm, selectedRegion, countries]);

  const loadCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await countryService.getAllCountries();
      if (data.length === 0) {
        setError('Nenhum país encontrado');
      }
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError('Erro ao carregar países. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterCountries = async () => {
    let result = countries;

    if (searchTerm.trim()) {
      setLoading(true);
      try {
        result = await countryService.searchByName(searchTerm);
      } catch (err) {
        result = [];
      }
      setLoading(false);
    }

    if (selectedRegion !== 'all') {
      result = result.filter(c => c.region === selectedRegion);
    }

    setFilteredCountries(result);
  };

  const toggleFavorite = (countryCode: string) => {
    const newFavorites = favoritesStorage.toggleFavorite(countryCode);
    setFavorites(newFavorites);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const displayedCountries = currentView === 'favorites'
    ? filteredCountries.filter(c => favorites.includes(c.cca3))
    : filteredCountries;

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`}>
      <Header 
        currentView={currentView}
        setView={setCurrentView}
        theme={theme}
        toggleTheme={toggleTheme}
        favoritesCount={favorites.length}
      />

      <main className={styles.main}>
        {currentView === 'home' || currentView === 'favorites' ? (
          <>
            <div className={styles.filtersSection}>
              <div className={styles.searchBox}>
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Buscar país por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className={styles.clearBtn} onClick={clearSearch}>
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className={styles.regionFilter}>
                <Filter size={20} />
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {REGIONS.map(region => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.resultsInfo}>
              <p>
                {currentView === 'favorites' 
                  ? `${displayedCountries.length} ${displayedCountries.length === 1 ? 'país favorito' : 'países favoritos'}`
                  : `${displayedCountries.length} ${displayedCountries.length === 1 ? 'país encontrado' : 'países encontrados'}`
                }
              </p>
            </div>

            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Carregando países...</p>
              </div>
            ) : error ? (
              <div className={styles.error}>
                <p>{error}</p>
                <button onClick={loadCountries}>Tentar novamente</button>
              </div>
            ) : displayedCountries.length === 0 ? (
              <div className={styles.noResults}>
                {currentView === 'favorites' 
                  ? 'Nenhum país favorito ainda. Explore e adicione seus favoritos!'
                  : 'Nenhum país encontrado com os filtros aplicados.'
                }
              </div>
            ) : (
              <div className={styles.countriesGrid}>
                {displayedCountries.map(country => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    isFavorite={favorites.includes(country.cca3)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.aboutSection}>
            <h2>Sobre o Global Insights</h2>
            <p>
              Explore informações detalhadas sobre todos os países do mundo usando a 
              <strong> REST Countries API</strong>. Busque por nome, filtre por continente e salve seus 
              países favoritos diretamente no seu navegador!
            </p>
            
            <div className={styles.features}>
              <h3>Funcionalidades:</h3>
              <ul>
                <li> <strong>Busca em tempo real</strong> por nome do país</li>
                <li> <strong>Filtro por continente</strong> (África, Américas, Ásia, Europa, Oceania)</li>
                <li> <strong>Sistema de favoritos</strong> persistente no navegador</li>
                <li> <strong>Tema claro/escuro</strong> personalizável</li>
                <li> <strong>Informações detalhadas:</strong> população, área, idiomas, moedas e mais</li>
                <li> <strong>Design responsivo</strong> para todos os dispositivos</li>
                <li> <strong>Link direto</strong> para Google Maps</li>
              </ul>
            </div>

            <div className={styles.techStack}>
              <h3>Tecnologias:</h3>
              <p>React, TypeScript, CSS Modules, REST Countries API</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}