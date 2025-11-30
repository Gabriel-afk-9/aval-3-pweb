import { Link, NavLink } from 'react-router-dom';
import { Globe, Moon, Sun, Map, Heart, BookOpen, Users } from 'lucide-react';
import styles from '../styles/Home/Header.module.css';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  favoritesCount?: number;
}

export default function Header({ theme, toggleTheme, favoritesCount = 0 }: HeaderProps) {
  return (
    <header className={`${styles.header} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Globe size={24} className={styles.icon} />
          <h1>Global Insights</h1>
        </Link>

        <nav className={styles.nav}>          
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <Map size={18} />
            <span>Explorar</span>
          </NavLink>

          <NavLink 
            to="/favorites" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <Heart size={18} />
            <span>Favoritos</span>
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink 
            to="/team" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <Users size={18} />
            <span>Equipe</span>
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <BookOpen size={18} />
            <span>Sobre</span>
          </NavLink>

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