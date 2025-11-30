import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';
import { favoritesStorage } from '../utils/favoritesStorage';

export default function Layout() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateCount = () => setFavoritesCount(favoritesStorage.getFavorites().length);
    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`}>
      <Header theme={theme} toggleTheme={toggleTheme} favoritesCount={favoritesCount} />
      
      <main className={styles.main}>
        <Outlet context={{ theme }} />
      </main>

      <Footer theme={theme}/>
    </div>
  );
}