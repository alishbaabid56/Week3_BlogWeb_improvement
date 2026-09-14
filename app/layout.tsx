
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devjournal.example.com"),

  title: {
    default: "DevJournal | Modern Developer Blog",
    template: "%s | DevJournal",
  },

  description:
    "Practical insights about web development, React, Next.js, JavaScript, AI, and modern technology.",

  keywords: [
    "web development",
    "Next.js",
    "React",
    "JavaScript",
    "AI",
    "developer blog",
  ],

  authors: [{ name: "Alishba" }],

  creator: "Alishba",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "DevJournal | Modern Developer Blog",
    description:
      "Practical insights about web development, React, Next.js, JavaScript, AI, and modern technology.",
    type: "website",
    siteName: "DevJournal",
  },

  twitter: {
    card: "summary_large_image",
    title: "DevJournal | Modern Developer Blog",
    description:
      "Practical insights about web development, React, Next.js, JavaScript, AI, and modern technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} bg-stone-50 text-stone-900 antialiased`}
      >
        <header>
          <Navbar />
        </header>

        <main id="main-content">{children}</main>

        <Footer />
      </body>
    </html>
  );
}

