import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

export const LOCALES = ["en", "ru", "fr", "ka"];

const I18nMiddleware = createI18nMiddleware({
  locales: LOCALES,
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
