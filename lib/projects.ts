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
    name: "TGA Builders Inc",
    url: "https://www.tgabuildersinc.com/",
    description: "Professional construction company website with project galleries and contact forms",
    category: "Construction",
    image: "/tga-builders.webp",
  },
  {
    id: "2", 
    name: "Handyman Services TGA",
    url: "https://www.handymanservicestga.com/",
    description: "Local handyman service website featuring services, pricing, and booking system",
    category: "Home Services",
    image: "/handyman-services.webp",
  },
  {
    id: "3",
    name: "Yatusabe Studio",
    url: "https://yatusabesstudio.net/",
    description: "Creative studio portfolio showcasing artistic work and services",
    category: "Creative",
    image: "/yatusabesstudio.webp",
  },
  {
    id: "4",
    name: "Los Vamos",
    url: "https://losvamos.vercel.app/",
    description: "Modern web application built with cutting-edge technology",
    category: "Web App",
    image: "/losavamos.webp",
  },
  {
    id: "5",
    name: "Lunar Headwear",
    url: "https://lunarheadwear.com/",
    description: "E-commerce platform for premium headwear with shopping cart functionality",
    category: "E-commerce",
    image: "/lunar-headwear.webp",
  },
  {
    id: "6",
    name: "TeestoGo",
    url: "https://www.teestogo.com/",
    description: "Custom t-shirt printing service with design tools and order management",
    category: "Printing Services",
    image: "/teestogo.webp",
  },
];
