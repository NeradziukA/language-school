import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>About Our French Language School</h1>
        <p>
          Welcome to our French language school. We offer a variety of courses
          to help you master the French language.
        </p>
      </main>
      <Footer />
    </div>
  );
}
