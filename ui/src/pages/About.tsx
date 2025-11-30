import { useOutletContext } from 'react-router-dom';
import styles from '../styles/About.module.css';

export default function AboutPage() {
  const { theme } = useOutletContext<{ theme: string }>();

  const sectionClass = `${styles.aboutSection} ${theme === 'dark' ? styles.dark : ''}`;

  return (
    <div className={sectionClass}>
        <h2>Sobre o Global Insights</h2>
        <p className={styles.aboutText}>
            O Global Insights é uma aplicação web interativa desenvolvida para permitir que qualquer pessoa explore informações culturais, geográficas e políticas de países ao redor do mundo.
            Todos os dados exibidos são obtidos diretamente da <strong>REST Countries API</strong>, sem a necessidade de autenticação.
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
  );
}