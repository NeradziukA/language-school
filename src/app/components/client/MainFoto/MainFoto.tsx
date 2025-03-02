"use client";
import Image from "next/image";
import styles from "./MainFoto.module.css";

export function MainFoto() {
  return (
    <aside className={styles.mainFoto}>
      <Image
        className={styles.img}
        src="/main-foto.png"
        alt="Main Foto"
        width={568}
        height={760}
      />
    </aside>
  );
}
