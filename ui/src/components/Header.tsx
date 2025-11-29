import React from 'react';
import { Globe, Moon, Sun, Map, Heart, BookOpen, Users } from 'lucide-react';
import styles from '../styles/Home/Header.module.css';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  theme: string;
  toggleTheme: () => void;
  favoritesCount?: number;
}

export default function Header({ currentView, setView, theme, toggleTheme, favoritesCount = 0 }: HeaderProps) {
  return (
    <header className={`${styles.header} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => setView('home')}>
          <Globe size={24} className={styles.icon} />
          <h1>Global Insights</h1>
        </div>

        <nav className={styles.nav}>
          <button 
            className={`${styles.navLink} ${currentView === 'home' ? styles.active : ''}`}
            onClick={() => setView('home')}
          >
            <Map size={18} />
            <span>Explorar</span>
          </button>

          <button 
            className={`${styles.navLink} ${currentView === 'favorites' ? styles.active : ''}`}
            onClick={() => setView('favorites')}
          >
            <Heart size={18} />
            <span>Favoritos</span>
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </button>
          <button 
            className={`${styles.navLink} ${currentView === 'team' ? styles.active : ''}`}
            onClick={() => setView('team')}
          >
            <Users size={18} />
            <span>Equipe</span>
          </button>

          <button 
            className={`${styles.navLink} ${currentView === 'about' ? styles.active : ''}`}
            onClick={() => setView('about')}
          >
            <BookOpen size={18} />
            <span>Sobre</span>
          </button>

          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

        </nav>
      </div>
    </header>
  );
}