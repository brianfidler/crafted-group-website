import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://crafted.group"),
  title: {
    default: "Crafted Group | Web Design & Development Services",
    template: "%s | Crafted Group",
  },
  description: "Professional web design and development services. Custom websites, full-stack applications, e-commerce solutions, and CMS integration for growing businesses.",
  keywords: ["web design", "web development", "custom websites", "e-commerce", "CMS integration", "full-stack development"],
  authors: [{ name: "Crafted Group" }],
  creator: "Crafted Group",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Crafted Group",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

// JSON-LD structured data for Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Crafted Group",
  description: "Professional web design and development services for growing businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://crafted.group",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://crafted.group"}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@crafted.group",
    contactType: "customer service",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    addressCountry: "US",
  },
  sameAs: [
    "https://linkedin.com/in/brianfidler",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
