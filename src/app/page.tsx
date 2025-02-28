import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>Welcome to Our French Language School</h1>
        <Link href="/about" className={styles.link}>
          Learn more about us
        </Link>
      </main>
      <Footer />
    </div>
  );
}
