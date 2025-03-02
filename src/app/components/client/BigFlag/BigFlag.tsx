"use client";
import Image from "next/image";
import styles from "./BigFlag.module.css";

export function BigFlag() {
  return (
    <aside className={styles.flag}>
      <Image src="/flag-big.png" alt="Big Flag" width={355} height={750} />
    </aside>
  );
}
