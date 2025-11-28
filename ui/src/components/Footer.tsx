import React from 'react';
import { Heart, Globe } from 'lucide-react';
import styles from '../styles/Home/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
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
        <p className={styles.copyright}>
          © 2024 Global Insights
        </p>
      </div>
    </footer>
  );
}