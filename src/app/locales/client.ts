"use client";
import { createI18nClient } from "next-international/client";

export const { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale } =
  createI18nClient({
    en: () => import("./en"),
    ru: () => import("./ru"),
    fr: () => import("./fr"),
    ka: () => import("./ka"),
  });
