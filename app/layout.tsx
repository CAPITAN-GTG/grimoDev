import type { Metadata } from "next";
import "./globals.css";
import NavigationSlider from "@/components/NavigationSlider";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://grimodev.com'),
  title: "Grimo Dev - Professional Websites, Mobile Apps & Online Presence Solutions",
  description: "We build websites and mobile apps for small businesses to large corporations. Professional online presence with SEO, GEO, AIO optimization, social media management, and Google Business improvements. Fast delivery, transparent pricing.",
  keywords: "web development, mobile app development, SEO optimization, GEO optimization, AIO optimization, social media management, Google Business optimization, business websites, ecommerce solutions, professional online presence, small business websites, enterprise applications, website design, app development services",
  authors: [{ name: "Grimo Dev" }],
  creator: "Grimo Dev",
  publisher: "Grimo Dev",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grimodev.com",
    siteName: "Grimo Dev",
    title: "Grimo Dev - Professional Websites, Mobile Apps & Online Presence",
    description: "We build websites and mobile apps for small businesses to large corporations. Professional online presence with SEO, GEO, AIO optimization.",
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
    title: "Grimo Dev - Professional Websites, Mobile Apps & Online Presence",
    description: "We build websites and mobile apps for small businesses to large corporations. Professional online presence with SEO, GEO, AIO optimization.",
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
      <body className="antialiased">
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
              "description": "Professional web development, mobile app development, and online presence optimization services",
              "url": "https://grimodev.com",
              "logo": "https://grimodev.com/logo2.jpeg",
              "email": "grimodev@gmail.com",
              "serviceArea": {
                "@type": "Country",
                "name": "United States"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Web Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Development",
                      "description": "Custom website development for businesses"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mobile App Development",
                      "description": "Native and cross-platform mobile applications"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "SEO Optimization",
                      "description": "Search engine optimization services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "GEO Optimization",
                      "description": "Geographic/local search optimization"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AIO Optimization",
                      "description": "All-in-one optimization services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Social Media Management",
                      "description": "Social media management and strategy"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Google Business Optimization",
                      "description": "Google Business Profile optimization and management"
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
