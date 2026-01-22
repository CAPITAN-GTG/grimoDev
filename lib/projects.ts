export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Yatusabe Studio",
    url: "https://yatusabesstudio.net/",
    description: "Creative studio portfolio showcasing artistic work and services",
    category: "Studio",
    image: "/yatusabesstudio.webp",
  },
  {
    id: "2",
    name: "TGA Builders Inc",
    url: "https://www.tgabuildersinc.com/",
    description: "Professional construction company website with project galleries and contact forms",
    category: "Construction",
    image: "/tga-builders.webp",
  },
  {
    id: "3",
    name: "Los Vamos",
    url: "https://losvamos.vercel.app/",
    description: "Modern web application built with cutting-edge technology",
    category: "Blog",
    image: "/losavamos.webp",
  },
  {
    id: "4",
    name: "Lunar Headwear",
    url: "https://lunarheadwear.com/",
    description: "E-commerce platform for premium headwear with shopping cart functionality",
    category: "Wholesale",
    image: "/lunar-headwear.webp",
  },{
    id: "5", 
    name: "TGA Handyman",
    url: "https://www.tgahandymanservices.com/",
    description: "Local handyman service website featuring services, pricing, and booking system",
    category: "Home Services",
    image: "/handyman-services.webp",
  },
  {
    id: "6",
    name: "TeestoGo",
    url: "https://www.teestogo.com/",
    description: "Custom t-shirt printing service with design tools and order management",
    category: "Screen Printing",
    image: "/teestogo.webp",
  },
  {
    id: "7",
    name: "Simone Henke",
    url: "https://simone-henke.de/",
    description: "the online presence of Agentur :kunstgerecht, presenting Simone Henke’s agency",
    category: "Agency",
    image: "/simone-henke.webp",
  },
];
