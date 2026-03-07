export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  image?: string;
  /** Optional result achieved, e.g. "Increased leads by 40%" */
  result?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Yatusabe Studio",
    url: "https://yatusabesstudio.net/",
    description: "Creative studio portfolio showcasing artistic work and services",
    category: "Studio",
    image: "/yatusabesstudio.webp",
    result: "Increased booking rates",
  },
  {
    id: "2",
    name: "TGA Builders Inc",
    url: "https://www.tgabuildersinc.com/",
    description: "Professional construction company website with project galleries and contact forms",
    category: "Construction",
    image: "/tga-builders.webp",
    result: "More quote requests from Google",
  },
  {
    id: "3",
    name: "Los Vamos",
    url: "https://losvamos.vercel.app/",
    description: "Modern web application built with cutting-edge technology",
    category: "Blog",
    image: "/losavamos.webp",
    result: "Stronger reach and reader engagement",
  },
  {
    id: "4",
    name: "Lunar Headwear",
    url: "https://lunarheadwear.com/",
    description: "E-commerce platform for premium headwear with shopping cart functionality",
    category: "Wholesale",
    image: "/lunar-headwear.webp",
    result: "More wholesale orders and easier reorders",
  },
  {
    id: "5",
    name: "TGA Handyman",
    url: "https://www.tgahandymanservices.com/",
    description: "Local handyman service website featuring services, pricing, and booking system",
    category: "Home Services",
    image: "/handyman-services.webp",
    result: "More job requests from local search",
  },
  {
    id: "6",
    name: "TeestoGo",
    url: "https://www.teestogo.com/",
    description: "Custom t-shirt printing service with design tools and order management",
    category: "Screen Printing",
    image: "/teestogo.webp",
    result: "More custom orders and quote requests",
  },
  {
    id: "7",
    name: "Simone Henke",
    url: "https://simone-henke.de/",
    description: "the online presence of Agentur :kunstgerecht, presenting Simone Henke’s agency",
    category: "Agency",
    image: "/simone-henke.webp",
    result: "More client inquiries and project bookings",
  },
  {
    id: "8",
    name: "AvHatco",
    url: "https://avhatco.com/",
    description: "Wholesale performance hats for decorators, printers, and brands. Decoration-ready, sweat-resistant, fast shipping.",
    category: "Wholesale",
    image: "/avhats.png",
    result: "More dealer and B2B inquiries",
  },
];
