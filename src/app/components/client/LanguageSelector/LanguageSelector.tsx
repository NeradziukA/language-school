"use client";
import React, { useState, useEffect } from "react";
import styles from "./LanguageSelector.module.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function LanguageSelector() {
  const router = useRouter();
  const [language, setLanguage] = useState<string>();

  useEffect(() => {
    const lang = Cookies.get("lang") ?? "en";
    setLanguage(lang);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname.replace(/^\/[a-z]{2}/, "");
    if (
      typeof window !== "undefined" &&
      language &&
      window.location.pathname !== `/${language}${currentPath}`
    ) {
      router.push(`/${language}${currentPath}`);
    }
  }, [language, router]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    Cookies.set("lang", lang);
    setLanguage(lang);
  };

  return (
    <select
      className={styles.languageSelect}
      value={language}
      onChange={handleChange}
    >
      {!language && <option></option>}
      <option value="en">EN</option>
      <option value="ru">RU</option>
      {/* <option value="fr">FR</option>*/}
      <option value="ka">KA</option>
    </select>
  );
}
