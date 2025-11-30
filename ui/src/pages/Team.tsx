import { useOutletContext } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import styles from '../styles/Team.module.css';

export default function TeamPage() {
  const { theme } = useOutletContext<{ theme: string }>();

  const sectionClass = `${styles.teamSection} ${theme === 'dark' ? styles.dark : ''}`;
  const textClass = `${styles.teamText} ${theme === 'dark' ? styles.dark : ''}`;

  return (
    <div className={sectionClass}>
      <h2>Nossa Equipe</h2>
      <p className={textClass}>
          Conheça quem está por trás do desenvolvimento do Global Insights.
      </p>

      <div className={styles.teamGrid}>
         <div className={styles.teamCard}>
            <div className={styles.teamMain}>
                <img src="https://avatars.githubusercontent.com/u/180032627?v=4" alt="avatar" className={styles.avatar} />
                <h3 className={styles.memberName}>Gabriel Lima</h3>
            </div>
            <span className={styles.memberRole}>Desenvolvedor Frontend</span>
            <p className={styles.memberBio}>Sou apaixonado por tecnologia e desenvolvimento frontend.</p>
            <div className={styles.socialLinks}>
                <a href="https://github.com/Gabriel-afk-9" target="_blank" rel="noopener noreferrer"><Github size={30} className={styles.socialIcon} /></a>
                <a href="https://www.linkedin.com/in/gabriel-lima-62a376326" target="_blank" rel="noopener noreferrer"><Linkedin size={30} className={styles.socialIcon} /></a>
            </div>
         </div>

         <div className={styles.teamCard}>
            <div className={styles.teamMain}>
                <img src="https://avatars.githubusercontent.com/u/199638000?v=4" alt="avatar" className={styles.avatar} />
                <h3 className={styles.memberName}>Samuel Nascimento</h3>
            </div>
            <span className={styles.memberRole}>Desenvolvedor Full Stack</span>
            <p className={styles.memberBio}>Apaixonado por criar aplicativos e jogos.</p>
            <div className={styles.socialLinks}>
                <a href="https://github.com/Zidan-09" target="_blank" rel="noopener noreferrer"><Github size={30} className={styles.socialIcon} /></a>
                <a href="https://www.linkedin.com/in/samuel-nascimento-fullstack/" target="_blank" rel="noopener noreferrer"><Linkedin size={30} className={styles.socialIcon} /></a>
            </div>
         </div>
         
         <div className={styles.teamCard}>
            <div className={styles.teamMain}>
                <img src="https://avatars.githubusercontent.com/u/160227231?v=4" alt="avatar" className={styles.avatar} />
                <h3 className={styles.memberName}>Paulo Alves</h3>
            </div>
            <span className={styles.memberRole}>Desenvolvedor Frontend</span>
            <p className={styles.memberBio}>Studying programming in Technology in Computer Systems at UESPI College.</p>
            <div className={styles.socialLinks}>
                <a href="https://github.com/PaulEvezely" target="_blank" rel="noopener noreferrer"><Github size={30} className={styles.socialIcon} /></a>
            </div>
         </div>

         <div className={styles.teamCard}>
            <div className={styles.teamMain}>
                <img src="https://avatars.githubusercontent.com/u/157530699?v=4" alt="avatar" className={styles.avatar} />
                <h3 className={styles.memberName}>Gabriel Oliveira</h3>
            </div>
            <span className={styles.memberRole}>Security Engineer</span>
            <p className={styles.memberBio}>Full Stack Developer committed to building scalable solutions.</p>
            <div className={styles.socialLinks}>
                <a href="https://github.com/gaboliveira-alt" target="_blank" rel="noopener noreferrer"><Github size={30} className={styles.socialIcon} /></a>
                <a href="https://www.linkedin.com/in/gabriel-oliveira-pinto-75a480326/" target="_blank" rel="noopener noreferrer"><Linkedin size={30} className={styles.socialIcon} /></a>
            </div>
         </div>

      </div>
    </div>
  );
}