import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../css/HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <Header />
      <Footer />
    </div>
  )
}