import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import RevealObserver from "./components/RevealObserver";

const siteUrl = "https://www.fisioterapiacwb.com.br";
const siteTitle =
  "Fisioterapia Domiciliar para Idosos em Curitiba | Adrielly Costa";
const siteDescription =
  "Fisioterapia domiciliar em Curitiba para idosos, recuperação funcional, reabilitação pós-cirurgia, prevenção de quedas, mobilidade e autonomia no lar.";

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
  metadataBase: new URL(siteUrl),
  applicationName: "Fisioterapia CWB",
  title: {
    default: siteTitle,
    template: "%s | Fisioterapia CWB"
  },
  description: siteDescription,
  keywords: [
    "fisioterapia domiciliar Curitiba",
    "fisioterapia para idosos Curitiba",
    "fisioterapia geriatrica Curitiba",
    "reabilitacao de idosos",
    "recuperacao funcional",
    "prevencao de quedas idosos",
    "fisioterapia pos cirurgia",
    "fisioterapia ortopedica domiciliar",
    "mobilidade de idosos",
    "atendimento fisioterapeutico domiciliar"
  ],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Fisioterapia CWB",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/hero-elderly.jpg",
        width: 1200,
        height: 630,
        alt: "Fisioterapia domiciliar para idosos em Curitiba"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/hero-elderly.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: "healthcare",
  icons: {
    icon: "/icon.svg"
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
