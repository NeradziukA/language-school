import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Image from "next/image";
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
        <section className={styles.teacherSection}>
          <h2>Meet Our Best Teacher</h2>
          <Image
            className={styles.teacherImage}
            src="/images/teacher.png"
            alt="Best Teacher"
            width={300}
            height={300}
          />
          <p>
            Our best teacher, Marie, has many years of experience in teaching
            French. She is passionate about helping students achieve fluency and
            has a unique teaching style that makes learning fun and effective.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
