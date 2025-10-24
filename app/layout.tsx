import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Grimo Dev - We Build Websites and Apps That Grow Your Business",
  description: "Professional websites and mobile applications that drive business growth. Fast delivery, transparent pricing, premium quality. Choose from Starter ($750), Business ($1200), or Pro ($2500) packages. 50% to start, 50% after satisfaction.",
  keywords: "web development, business websites, mobile apps, ecommerce, portfolios, event sites, web development services, business websites, mobile applications, ecommerce solutions, portfolio sites, event scheduling, standalone websites, freelancer websites, small business websites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Unicase:wght@300;400;500;600;700&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
