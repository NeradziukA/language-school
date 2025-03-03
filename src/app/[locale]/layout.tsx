import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer, Header } from "@components/server";
import { I18nProviderClient } from "@locales/client";
import { setStaticParamsLocale } from "next-international/server";
import "./globals.css";
import styles from "./page.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "French Tutor",
  description:
    "Learn French with personalized lessons from an experienced tutor",
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <html lang={locale}>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.page}>
          <I18nProviderClient locale={locale}>
            <Header />
            {children}
            <Footer />
          </I18nProviderClient>
        </div>
      </body>
    </html>
  );
}
