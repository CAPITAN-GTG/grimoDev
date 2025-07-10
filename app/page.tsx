"use client";

import { useState, useEffect } from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Mail, CheckCircle } from "lucide-react";

interface CallButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Products for the Hero Parallax (using preview images from the public folder)
  const products = [
    {
      title: "TGA HANDYMAN",
      link: "https://www.handymanservicestga.com/",
      thumbnail: "/preview-tga-handyman.png",
    },
    {
      title: "PUNTAS AZULES",
      link: "https://puntas-azules.vercel.app/",
      thumbnail: "/preview-puntas-azules.png",
    },
    {
      title: "TGA BUILDERS",
      link: "https://www.tgabuildersinc.com/",
      thumbnail: "/preview-tga-builders.png",
    },
    {
      title: "SENIC INTERNATIONAL",
      link: "https://senic-international.vercel.app/",
      thumbnail: "/preview-senic-internartional.png",
    },
    {
      title: "XTREME STICKERS",
      link: "https://xtreme-stickers.vercel.app/",
      thumbnail: "/preview-xtreme-stickers.png",
    },
    // Duplicate some projects to fill the required 15 slots for the parallax effect
    {
      title: "TGA HANDYMAN",
      link: "https://www.handymanservicestga.com/",
      thumbnail: "/preview-tga-handyman.png",
    },
    {
      title: "PUNTAS AZULES",
      link: "https://puntas-azules.vercel.app/",
      thumbnail: "/preview-puntas-azules.png",
    },
    {
      title: "TGA BUILDERS",
      link: "https://www.tgabuildersinc.com/",
      thumbnail: "/preview-tga-builders.png",
    },
    {
      title: "SENIC INTERNATIONAL",
      link: "https://senic-international.vercel.app/",
      thumbnail: "/preview-senic-internartional.png",
    },
    {
      title: "XTREME STICKERS",
      link: "https://xtreme-stickers.vercel.app/",
      thumbnail: "/preview-xtreme-stickers.png",
    },
    {
      title: "TGA HANDYMAN",
      link: "https://www.handymanservicestga.com/",
      thumbnail: "/preview-tga-handyman.png",
    },
    {
      title: "PUNTAS AZULES",
      link: "https://puntas-azules.vercel.app/",
      thumbnail: "/preview-puntas-azules.png",
    },
    {
      title: "TGA BUILDERS",
      link: "https://www.tgabuildersinc.com/",
      thumbnail: "/preview-tga-builders.png",
    },
    {
      title: "SENIC INTERNATIONAL",
      link: "https://senic-international.vercel.app/",
      thumbnail: "/preview-senic-internartional.png",
    },
    {
      title: "XTREME STICKERS",
      link: "https://xtreme-stickers.vercel.app/",
      thumbnail: "/preview-xtreme-stickers.png",
    },
  ];

  const CallButton = ({ className = "", variant = 'primary' }: CallButtonProps) => {
    const contactEmail = "grimodev@gmail.com";
    return (
      <a 
        href={`mailto:${contactEmail}`}
        className={`
          group
          relative
          flex items-center gap-3 sm:gap-4
          px-4 sm:px-6 md:px-8 py-3 sm:py-4
          font-bold
          text-sm
          tracking-widest
          uppercase
          transition-all duration-300
          transform hover:scale-105
          ${variant === 'primary' 
            ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl' 
            : 'bg-white border-2 border-black text-black hover:bg-black hover:text-white'
          }
          ${className}
        `}
      >
        <Mail className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
        <div className="flex flex-col items-start min-w-0">
          <span className="font-bold text-xs sm:text-sm leading-tight">
            {contactEmail}
          </span>
          <span className="text-xs opacity-80 tracking-wider whitespace-nowrap">
            FREE CONSULTATION
          </span>
        </div>
      </a>
    );
  };

  // Removed unused features array

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section (Optimized) */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        <HeroHighlight className="py-24 sm:py-32 md:py-40">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-inter mb-6 sm:mb-8 text-center text-gray-900 leading-tight">
              MODERN WEB <br className="hidden md:block" /> <Highlight>DEVELOPMENT</Highlight>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-700 leading-snug font-medium tracking-wide px-2 text-center">
              ENTERPRISE-GRADE DIGITAL SOLUTIONS WITH PRECISION ENGINEERING
            </p>

            {/* Call to Action */}
            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
              <div className="flex items-center justify-center w-full max-w-md sm:max-w-lg mx-auto">
                <CallButton className="w-full sm:w-auto" />
              </div>
              <p className="text-gray-500 max-w-md text-xs sm:text-sm tracking-wider uppercase font-semibold text-center">
                PROFESSIONAL WEB DEVELOPMENT SERVICES WITH GUARANTEED DELIVERY
              </p>
            </div>
          </div>
        </HeroHighlight>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-8 sm:h-16 bg-black opacity-30" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black mt-2 mx-auto animate-bounce" />
        </div>
      </section>

      {/* Portfolio Section - Hero Parallax */}
      <section id="portfolio">
        <HeroParallax products={products} />
      </section>

      {/* Removed Services/Features Section as requested */}

      {/* Hosting Options Section */}
      <section id="hosting" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-blue-600 px-6 py-2 text-white text-sm font-bold tracking-widest mb-6">
              <span>HOSTING OPTIONS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-inter text-gray-900 mb-4 tracking-tight">
              CHOOSE YOUR PATH
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto tracking-wide leading-relaxed">
              Select between our fully managed Next.js hosting or a customizable WordPress setup.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-12 items-stretch">
            {/* Grimo Dev Managed Hosting */}
            <div className="bg-black text-white p-10 flex flex-col transition-all duration-300 hover:bg-gray-900">
              <img src="/logo2.jpeg" alt="Grimo Dev Logo" className="w-20 h-auto mb-6 mx-auto" />
              <h3 className="text-3xl font-black font-inter mb-4 tracking-tight text-white">Grimo Dev Managed Hosting</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Built with Next.js, deployed on Vercel, backed by MongoDB, Cloudinary, Firebase and more.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-400 flex-shrink-0" /><span>Lightning-fast static & dynamic pages</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-400 flex-shrink-0" /><span>GitHub repository with full code access</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-400 flex-shrink-0" /><span>Automatic CI/CD & global CDN</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-400 flex-shrink-0" /><span>Image optimisation via Cloudinary</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-400 flex-shrink-0" /><span>Scalable databases (MongoDB Atlas, Firebase…)</span></li>
              </ul>
              <div className="mt-auto space-y-2">
                <p className="text-2xl font-bold">$20/mo <span className="text-sm font-normal">Basic hosting & minor edits</span></p>
                <p className="text-2xl font-bold">$150/mo <span className="text-sm font-normal">Active support & ongoing changes</span></p>
              </div>
            </div>

            {/* WordPress Hosting */}
            <div className="bg-white border-2 border-blue-600 p-10 flex flex-col text-black transition-all duration-300 hover:border-blue-700 shadow-sm">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg" alt="WordPress Logo" className="w-20 h-auto mb-6 mx-auto" />
              <h3 className="text-3xl font-black font-inter mb-4 tracking-tight">
                <span className="text-blue-600">WordPress</span> Build & Hosting
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Custom templates, plugins, and API integrations—built for easy self-management.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-blue-600 flex-shrink-0" /><span>Theme design & Elementor expertise</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-blue-600 flex-shrink-0" /><span>Template installation or custom builds</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-blue-600 flex-shrink-0" /><span>Plugin development & 3rd-party APIs (InkSoft, GoDaddy …)</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-blue-600 flex-shrink-0" /><span>Hosting guidance to minimise costs</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-blue-600 flex-shrink-0" /><span>Project-based pricing – no monthly commitment</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-blue-600 flex-shrink-0" /><span>Easily edit content & code via WP admin panel</span></li>
              </ul>
              <div className="mt-auto">
                <p className="text-xl font-bold text-blue-600">Billed per project, plugin, or integration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-3 bg-white px-6 py-2 text-black text-sm font-bold tracking-widest mb-8">
              <Mail size={16} />
              <span>CONTACT</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black font-inter mb-8 tracking-tight">
              READY TO TRANSFORM YOUR
              <span className="block text-gray-400">DIGITAL PRESENCE?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Schedule your complimentary project consultation and discover how we can accelerate your business growth through strategic web development.
            </p>
            
            <div className="flex flex-col items-center space-y-12">
              <div className="flex items-center">
                <CallButton />
              </div>
              
              <p className="text-gray-500 max-w-md text-sm tracking-widest uppercase font-bold">
                ENTERPRISE WEB DEVELOPMENT • GUARANTEED DELIVERY • TRANSPARENT PRICING
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
