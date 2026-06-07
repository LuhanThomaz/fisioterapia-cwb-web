import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import RevealObserver from "./components/RevealObserver";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap"
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Adrielly Costa Pontarolo | Fisioterapia Domiciliar Humanizada",
  description:
    "Fisioterapia personalizada em Curitiba com foco em reabilitação, mobilidade e bem-estar. Agende sua avaliação com a Dra. Adrielly Costa Pontarolo.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${openSans.variable} antialiased`}>
        <ScrollProgress />
        <CustomCursor />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
