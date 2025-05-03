import type { Metadata } from "next";
import { MedievalSharp } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const medievalSharp = MedievalSharp({ 
  weight: '400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Grimo Dev",
  description: "Crafting digital experiences with medieval elegance and modern technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={medievalSharp.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
