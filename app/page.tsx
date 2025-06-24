"use client";

import { useState, useEffect } from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { 
  Phone,
  Shield,
  Zap,
  Users
} from "lucide-react";

interface CallButtonProps {
  phoneNumber: string;
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

  const CallButton = ({ phoneNumber, className = "", variant = 'primary' }: CallButtonProps) => (
    <a 
      href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
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
      <Phone className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
      <div className="flex flex-col items-start min-w-0">
        <span className="font-bold text-xs sm:text-sm leading-tight">
          {phoneNumber}
        </span>
        <span className="text-xs opacity-80 tracking-wider whitespace-nowrap">
          FREE CONSULTATION
        </span>
      </div>
    </a>
  );

  const features = [
    {
      icon: Shield,
      title: "CODE OWNERSHIP",
      description: "Complete access to your project's GitHub repository and full source code ownership with comprehensive documentation"
    },
    {
      icon: Zap,
      title: "RAPID DELIVERY",
      description: "Direct communication channels and accelerated development cycles for immediate project progression"
    },
    {
      icon: Users,
      title: "TRANSPARENT PRICING",
      description: "Clear, competitive rates with detailed project breakdowns and no hidden costs or surprises"
    }
  ];

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
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center justify-center w-full max-w-md sm:max-w-lg mx-auto">
                <CallButton phoneNumber="(702) 218-5068" className="w-full sm:w-auto" />
                <span className="text-gray-400 font-bold tracking-widest text-sm flex-shrink-0">OR</span>
                <CallButton phoneNumber="(747) 400-9401" variant="secondary" className="w-full sm:w-auto" />
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

      {/* Services/Features Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-bold tracking-widest mb-6">
              <span>SERVICES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-inter text-gray-900 mb-8 tracking-tight">
              PROFESSIONAL EXCELLENCE
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide">
              Enterprise-grade development services with transparent processes, quality assurance, and comprehensive support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-gray-50 border-2 border-gray-200 hover:border-black hover:bg-white p-12 text-center transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-black mx-auto mb-8 flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-black font-inter text-gray-900 mb-6 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed tracking-wide">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WordPress Development Section */}
      <section id="wordpress" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-blue-600 px-6 py-2 text-white text-sm font-bold tracking-widest mb-6">
              <span>WORDPRESS DEVELOPMENT</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-inter text-gray-900 mb-8 tracking-tight">
              WORDPRESS & ELEMENTOR
              <span className="block text-blue-600">SPECIALISTS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto tracking-wide leading-relaxed">
              Professional WordPress development services with Elementor expertise. From existing project enhancement to complete custom solutions.
            </p>
          </div>

          {/* Technology Logos */}
          <div className="flex items-center justify-center gap-12 mb-16">
            <div className="group">
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg"
                alt="WordPress"
                className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="w-px h-16 bg-gray-300"></div>
            <div className="group">
              <img 
                src="/elementor.webp"
                alt="Elementor"
                className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110 rounded-lg"
              />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white border-2 border-gray-200 hover:border-blue-600 p-8 text-center transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 mx-auto mb-6 flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-black font-inter text-gray-900 mb-4 tracking-tight">
                EXISTING PROJECT ENHANCEMENT
              </h3>
              <p className="text-gray-600 leading-relaxed tracking-wide text-sm">
                Jump into already existing WordPress projects. Performance optimization, feature additions, and maintenance.
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-200 hover:border-blue-600 p-8 text-center transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 mx-auto mb-6 flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-black font-inter text-gray-900 mb-4 tracking-tight">
                PROJECT SETUP & ARCHITECTURE
              </h3>
              <p className="text-gray-600 leading-relaxed tracking-wide text-sm">
                Complete project setup from scratch. Server configuration, theme development, and strategic planning.
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-200 hover:border-blue-600 p-8 text-center transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 mx-auto mb-6 flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-black font-inter text-gray-900 mb-4 tracking-tight">
                CUSTOM PLUGINS & FEATURES
              </h3>
              <p className="text-gray-600 leading-relaxed tracking-wide text-sm">
                Bespoke plugin development, custom functionality, API integrations, and advanced WordPress features.
              </p>
            </div>

            <div className="group bg-white border-2 border-gray-200 hover:border-blue-600 p-8 text-center transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 mx-auto mb-6 flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-black font-inter text-gray-900 mb-4 tracking-tight">
                ELEMENTOR CUSTOMIZATION
              </h3>
              <p className="text-gray-600 leading-relaxed tracking-wide text-sm">
                Advanced Elementor designs, custom widgets, dynamic content, and professional page building solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-3 bg-white px-6 py-2 text-black text-sm font-bold tracking-widest mb-8">
              <Phone size={16} />
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
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <CallButton phoneNumber="(702) 218-5068" />
                <span className="text-gray-500 font-bold tracking-widest">OR</span>
                <CallButton phoneNumber="(747) 400-9401" variant="secondary" />
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
