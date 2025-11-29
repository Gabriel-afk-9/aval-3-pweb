import { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountryCard from '../components/CountryCard';
import type { Country } from '../services/countryService';
import { countryService } from '../services/countryService';
import { favoritesStorage } from '../utils/favoritesStorage';
import styles from '../styles/Home.module.css';
import SearchComponent from '../components/Search';

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
      if (!data || data.length === 0) {
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
            <SearchComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clearSearch={clearSearch}
            selectedRegion={selectedRegion}
            REGIONS={REGIONS}
            setSelectedRegion={setSelectedRegion}
            />

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
        ) : currentView === 'about' ? (
          <div className={styles.aboutSection}>
            <h2>Sobre o Global Insights</h2>
            <p className={styles.aboutText}>
              O Global Insights é uma aplicação web interativa desenvolvida para permitir que qualquer pessoa explore informações culturais, geográficas e políticas de países ao redor do mundo.
              Todos os dados exibidos são obtidos diretamente da <strong>REST Countries API</strong>, sem a necessidade de autenticação ou chaves de acesso.
            </p>
            
            <div className={styles.features}>
              <h3>Funcionalidades:</h3>
              <ul>
                <li> <strong>Buscar países por nome</strong></li>
                <li> <strong>Filtrar países por continente</strong></li>
                <li> <strong>Visualizar detalhes completos</strong></li>
                <li> <strong>Tema claro/escuro</strong></li>
                <li> <strong>Salvar países nos favoritos</strong></li>
              </ul>
            </div>

            <div className={styles.techStack}>
              <h3>Tecnologias:</h3>
              <p>React, TypeScript, CSS Modules, REST Countries API</p>
            </div>
          </div>
        ) : (
          <div className={styles.teamSection}>
            <h2>Nossa Equipe</h2>
            <p className={styles.teamText}>Conheça quem está por trás do desenvolvimento do Global Insights.</p>

            <div className={styles.teamGrid}>
              
              <div className={styles.teamCard}>
                <div className={styles.teamMain}>
                  <img
                  src="https://avatars.githubusercontent.com/u/180032627?v=4"
                  alt="avatar"
                  className={styles.avatar}
                  />
                  <h3 className={styles.memberName}>Gabriel Lima</h3>
                </div>
                <span className={styles.memberRole}>Desenvolvedor Frontend</span>
                <p className={styles.memberBio}>
                  Sou apaixonado por tecnologia e desenvolvimento frontend, com interesse também em backend.
                </p>
                <div className={styles.socialLinks}>
                  <a href="https://github.com/Gabriel-afk-9" title='Github'>
                    <Github size={30} className={styles.socialIcon} />
                  </a>
                  <a href="https://www.linkedin.com/in/gabriel-lima-62a376326" title='Linkedin'>
                    <Linkedin size={30} className={styles.socialIcon} />
                  </a>
                </div>
              </div>

              <div className={styles.teamCard}>
                <div className={styles.teamMain}>
                  <img
                  src="https://avatars.githubusercontent.com/u/199638000?v=4"
                  alt="avatar"
                  className={styles.avatar}
                  /> 
                  <h3 className={styles.memberName}>Samuel Nasc.</h3>
                </div>
                <span className={styles.memberRole}>Desenvolvedor Full Stack</span>
                <p className={styles.memberBio}>
                  Apaixonado por criar aplicativos, jogos e experiências interativas.
                </p>
                <div className={styles.socialLinks}>
                  <a href="https://github.com/Zidan-09" title='Github'>
                    <Github size={30} className={styles.socialIcon} />
                  </a>
                  <a href="https://www.linkedin.com/in/samuel-nascimento-fullstack/" title='Linkedin'>
                    <Linkedin size={30} className={styles.socialIcon} />
                  </a>
                </div>
              </div>

              <div className={styles.teamCard}>
                <div className={styles.teamMain}>
           
                  <img
                  src="https://avatars.githubusercontent.com/u/160227231?v=4"
                  alt="avatar"
                  className={styles.avatar}
                  />
                  
                  <h3 className={styles.memberName}>Paulo Alves</h3>
                </div>
                <span className={styles.memberRole}>Desenvolvedor Frontend</span>
                <p className={styles.memberBio}>
                  Studying programming in Technology in Computer Systems at UESPI College.
                </p>
                <div className={styles.socialLinks}>
                  <a href="https://github.com/PaulEvezely" title='Github' className={styles.link}>
                    <Github size={30} className={styles.socialIcon} />
                  </a>
                  <a href="" title='Linkedin' className={styles.link}>
                    <Linkedin size={30} className={styles.socialIcon} />
                  </a>
                </div>
              </div>

              <div className={styles.teamCard}>
                <div className={styles.teamMain}>
                  <img
                  src="https://avatars.githubusercontent.com/u/157530699?v=4"
                  alt="avatar"
                  className={styles.avatar}
                  />
                  <h3 className={styles.memberName}>Gabriel Oliv.</h3>
                </div>
                <span className={styles.memberRole}>Security Engineer</span>
                <p className={styles.memberBio}>
                  Full Stack Developer committed to building scalable, efficient solutions while also pursuing professional growth in the field of Cybersecurity.
                </p>
                <div className={styles.socialLinks}>
                  <a href="https://github.com/gaboliveira-alt" title='Github'>
                    <Github size={30} className={styles.socialIcon} />
                  </a>
                  <a href="https://www.linkedin.com/in/gabriel-oliveira-pinto-75a480326/" title='Linkedin'>
                    <Linkedin size={30} className={styles.socialIcon} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      <Footer theme={theme}/>
    </div>
  );
}