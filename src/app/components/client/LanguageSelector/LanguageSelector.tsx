"use client";
import React, { useState, useEffect } from "react";
import styles from "./LanguageSelector.module.css";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const defaultLanguage = pathname.split("/")[1];
      if (defaultLanguage) {
        setLanguage(defaultLanguage);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined" && language) {
      Cookies.set("lang", language);
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
      {!language && <option></option>}
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="fr">French</option>
      <option value="ka">ქართული</option>
    </select>
  );
}

export default LanguageSelector;
