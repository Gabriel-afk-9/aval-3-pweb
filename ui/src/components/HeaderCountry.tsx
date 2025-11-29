import { Globe, Moon, Sun, Map, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home/Header.module.css';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export default function HeaderCountry({ theme, toggleTheme}: HeaderProps) {
    const navigate = useNavigate();
  return (
    <header className={`${styles.header} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.container}>
        
        <div className={styles.logo} onClick={() => {navigate('/')}}>
          <Globe size={24} className={styles.icon} />
          <h1>Global Insights</h1>
        </div>

        <nav className={styles.nav}>
          <button 
            className={`${styles.navLink}`}
            onClick={() => navigate('/')}
          >
            <Map size={18} />
            <span>Explorar</span>
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