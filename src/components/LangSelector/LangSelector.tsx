"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { languages } from "@/i18n/settings";
import { I12n } from "@/i18n/types";
import styles from "./LangSelector.module.css";

export const LangSelector: React.FC<I12n> = ({ lang }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    const newPathname = pathname?.replace(`/${lang}`, `/${selectedLang}`);
    newPathname && router.push(newPathname);
  };

  return (
    <div className={styles.langSelector}>
      <select value={lang} onChange={handleChange}>
        {languages.map((lng) => (
          <option key={lng} value={lng}>
            {lng}
          </option>
        ))}
      </select>
    </div>
  );
};
