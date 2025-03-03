"use client";
import React, { useState, useEffect } from "react";
import styles from "./LanguageSelector.module.css";
import { useRouter } from "next/navigation";

function LanguageSelector() {
  const router = useRouter();
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") ?? "en";
    }
    return "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
      const currentPath = window.location.pathname.replace(/^\/[a-z]{2}/, "");
      router.push(`/${language}${currentPath}`);
    }
  }, [language, router]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <select
      className={styles.languageSelect}
      value={language}
      onChange={handleChange}
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="fr">French</option>
      <option value="ka">ქართული</option>
    </select>
  );
}

export default LanguageSelector;
