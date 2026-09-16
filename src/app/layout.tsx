import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ajay Chauhan — Next.js & Full-Stack Developer",
    template: "%s | Ajay Chauhan",
  },
  description:
    "Full-stack developer specialising in Next.js, React, Node.js, and Supabase. I build complete web applications from database to deployment.",
  keywords: [
    "Next.js developer",
    "full-stack developer",
    "React developer",
    "freelance web developer",
    "Node.js",
    "Supabase",
    "Tailwind CSS",
    "Cloudflare Workers",
  ],
  authors: [{ name: "Ajay Chauhan" }],
  creator: "Ajay Chauhan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://portfolio-site.ajaychauhan0898.workers.dev",
    siteName: "Ajay Chauhan",
    title: "Ajay Chauhan — Next.js & Full-Stack Developer",
    description:
      "Full-stack developer specialising in Next.js, React, Node.js, and Supabase. I build complete web applications from database to deployment.",
    images: [
      {
        url: "/projects/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ajay Chauhan — Next.js & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Chauhan — Next.js & Full-Stack Developer",
    description:
      "Full-stack developer specialising in Next.js, React, Node.js, and Supabase.",
    images: ["/projects/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  metadataBase: new URL("https://portfolio-site.ajaychauhan0898.workers.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#f59e0b] focus:text-[#090d12] focus:font-medium focus:text-sm focus:rounded focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
