import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { languages } from "@/i18n/settings";
import "./globals.css";
import { Header, Footer } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Language School",
  description: "Learn languages with professional tutors",
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="layout">
          <Header lang={lang} />
          <main className="content">{children}</main>
          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}
