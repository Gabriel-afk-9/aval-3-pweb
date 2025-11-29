import { Heart, Globe } from 'lucide-react';
import styles from '../styles/Home/Footer.module.css';

interface FooterProps {
  theme: string;
}

export default function Footer({ theme }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={theme === "light" ? styles.text : styles.dark }>
          Feito com <Heart size={16} className={styles.heart} /> usando{' '}
          <a 
            href="https://restcountries.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            <Globe size={14} />
            REST Countries API
          </a>
        </p>

        <div className={styles.authors}>
          <p className={styles.author}>Samuel Nascimento</p>
          <hr className={styles.divisor}></hr>
          <p className={styles.author}>Gabriel Lima</p>
          <hr className={styles.divisor}></hr>
          <p className={styles.author}>Gabriel Oliveira</p>
          <hr className={styles.divisor}></hr>
          <p className={styles.author}>Paulo Henrique</p>
        </div>

        <p className={theme === "light" ? styles.copyright : styles.copyDark}>
          © 2025 Global Insights
        </p>
      </div>
    </footer>
  );
}