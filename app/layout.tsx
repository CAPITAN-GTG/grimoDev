import type { Metadata } from "next";
import "./globals.css";
import NavigationSlider from "@/components/NavigationSlider";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://grimodev.com'),
  title: "Grimo Dev — Websites, Meta & Google Ads, Social Media",
  description: "Custom websites, paid ads on Meta and Google, and social media retainers. Clear pricing and a simple way to reach out.",
  keywords: "small business website, Meta ads, Google ads, social media management, website design, local business marketing",
  authors: [{ name: "Grimo Dev" }],
  creator: "Grimo Dev",
  publisher: "Grimo Dev",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grimodev.com",
    siteName: "Grimo Dev",
    title: "Grimo Dev — Websites, Meta & Google Ads, Social Media",
    description: "Custom websites, paid ads, and social content. Clear tiers and fast replies.",
    images: [
      {
        url: "/logo2.jpeg",
        width: 1200,
        height: 630,
        alt: "Grimo Dev - Professional Web & App Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grimo Dev — Websites, Meta & Google Ads, Social Media",
    description: "Custom websites, paid ads, and social content. Clear tiers and fast replies.",
    images: ["/logo2.jpeg"],
  },
  alternates: {
    canonical: "https://grimodev.com",
  },
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
      <body className="antialiased" suppressHydrationWarning>
        <StickyCta />
        <NavigationSlider />
        <MobileNavbar />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Grimo Dev",
              "description": "Websites, Meta and Google advertising, and social media content for growing businesses",
              "url": "https://grimodev.com",
              "logo": "https://grimodev.com/logo2.jpeg",
              "email": "grimodev@gmail.com",
              "serviceArea": {
                "@type": "Country",
                "name": "United States"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Grimo Dev services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Websites",
                      "description": "Custom websites from starter builds through large-scale sites"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Meta and Google Ads",
                      "description": "Paid advertising set-up and optional monthly maintenance"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Social media",
                      "description": "Scheduled posts and content retainers by monthly tier"
                    }
                  }
                ]
              },
              "priceRange": "$$"
            }),
          }}
        />
      </body>
    </html>
  );
}
