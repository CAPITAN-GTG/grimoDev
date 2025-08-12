import type { Metadata } from "next";
import { Jura, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jura = Jura({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-jura'
});

const inter = Inter({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Gimo Dev - Websites & Mobile Applications for Business",
  description: "Professional websites and mobile applications for businesses of all sizes. Fast delivery, flexible pricing, premium quality. Choose Gimo Hosted ($10/month) or Client Hosted (WordPress, Shopify). 50% to start, 50% after satisfaction.",
  keywords: "web development, mobile apps, WordPress, Shopify, business websites, custom development, hosting, Gimo Hosted, Client Hosted",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jura.variable} ${inter.variable} font-jura`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
