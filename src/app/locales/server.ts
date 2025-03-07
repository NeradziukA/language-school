import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    en: () => import("./en"),
    ru: () => import("./ru"),
    fr: () => import("./fr"), // TODO remove language
    ka: () => import("./ka"),
  });
