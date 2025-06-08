"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  ExternalLink,
  Shield,
  Zap,
  Users,
  Building,
  HardHat,
  Wine,
  Palette
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

  const StatusTag = ({ status }: { status: 'completed' | 'in-progress' }) => (
    <span className={`
      inline-flex
      items-center
      ml-3
      px-3
      py-1
      text-xs
      font-bold
      tracking-widest
      uppercase
      border
      ${status === 'completed' 
        ? 'bg-green-50 border-green-600 text-green-800'
        : 'bg-yellow-50 border-yellow-600 text-yellow-800'
      }
      ${status === 'in-progress' ? 'animate-pulse' : ''}
    `}>
      {status === 'completed' ? (
        <>
          <CheckCircle size={12} className="mr-1" />
          COMPLETED
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-yellow-600 mr-2 animate-pulse" />
          IN PROGRESS
        </>
      )}
    </span>
  );

  const portfolioItems = [
    {
      title: "TGA HANDYMAN",
      description: "Professional handyman and construction services website with comprehensive service listings and contact system",
      features: ["Service Portfolio", "Contact Forms", "Business Licensing Display"],
      icon: HardHat,
      url: "https://www.handymanservicestga.com/",
      status: 'completed' as const,
      stack: "HTML • CSS • JavaScript"
    },
    {
      title: "PUNTAS AZULES",
      description: "Premium tequila brand website with elegant product showcase and authentic Mexican heritage presentation",
      features: ["Product Catalog", "Brand Storytelling", "Premium Design"],
      icon: Wine,
      url: "https://puntas-azules.vercel.app/",
      status: 'in-progress' as const,
      stack: "Next.js • Tailwind • Vercel"
    },
    {
      title: "TGA BUILDERS",
      description: "Professional construction company website with enterprise-grade functionality and modern corporate design",
      features: ["Custom Project Gallery", "Service Booking System", "Responsive Design"],
      icon: Building,
      url: "https://www.tgabuildersinc.com/",
      status: 'completed' as const,
      stack: "Next.js • Tailwind • NodeMailer"
    },
    {
      title: "SENIC INTERNATIONAL",
      description: "Premium spirits distributor platform with sophisticated branding and professional presentation",
      features: ["Product Catalog", "Age Verification", "Distributor Portal"],
      icon: Wine,
      url: "https://senic-international.vercel.app/",
      status: 'in-progress' as const,
      stack: "Next.js • Tailwind"
    },
    {
      title: "XTREME STICKERS",
      description: "Custom sticker e-commerce platform with advanced design tools and real-time customization",
      features: ["Custom Design Tool", "Order Management", "Real-time Preview"],
      icon: Palette,
      url: "https://xtreme-stickers.vercel.app/",
      status: 'in-progress' as const,
      stack: "Next.js • Tailwind • MongoDB • Stripe"
    }
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
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto py-16 sm:py-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Main Title */}
            <div className="mb-8 sm:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-inter mb-4 sm:mb-6 md:mb-8 text-gray-900 leading-none tracking-tight">
                MODERN WEB
                <span className="block text-gray-600">DEVELOPMENT</span>
              </h1>
              <div className="w-16 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-black mx-auto" />
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 max-w-4xl mx-auto text-gray-700 leading-tight font-medium tracking-wide px-2">
              ENTERPRISE-GRADE DIGITAL SOLUTIONS WITH PRECISION ENGINEERING
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 leading-relaxed tracking-wide px-2">
              We deliver high-performance, scalable web applications that drive measurable business results through strategic design and advanced technology implementation.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-12">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 font-bold tracking-widest uppercase px-2 text-center">
                REQUEST PROJECT CONSULTATION
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center justify-center w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
                <div className="w-full sm:w-auto flex-shrink-0">
                  <CallButton phoneNumber="(702) 218-5068" className="w-full sm:w-auto" />
                </div>
                <span className="text-gray-400 font-bold tracking-widest text-sm flex-shrink-0">OR</span>
                <div className="w-full sm:w-auto flex-shrink-0">
                  <CallButton phoneNumber="(747) 400-9401" variant="secondary" className="w-full sm:w-auto" />
                </div>
              </div>
              <p className="text-gray-500 max-w-md text-xs sm:text-sm tracking-wider uppercase font-semibold px-4 text-center leading-relaxed">
                PROFESSIONAL WEB DEVELOPMENT SERVICES WITH GUARANTEED DELIVERY
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-8 sm:h-16 bg-black opacity-30" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black mt-2 mx-auto animate-bounce" />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-bold tracking-widest mb-6">
              <span>PORTFOLIO</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-inter text-gray-900 mb-8 tracking-tight">
              RECENT PROJECTS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide">
              Discover enterprise solutions that have transformed businesses through strategic digital implementation and advanced technical architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {portfolioItems.map((item, index) => (
              <div key={index} className="group max-w-sm mx-auto md:max-w-none h-full">
                <CardContainer className="inter-var h-full">
                  <CardBody className="relative w-full h-full bg-white border-2 border-gray-200 hover:border-black transition-all duration-300 overflow-hidden flex flex-col">
                    {/* Project Icon */}
                    <div className="relative h-48 bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                      <CardItem translateZ="160" className="text-center">
                        <item.icon 
                          size={64} 
                          className="text-gray-700 group-hover:text-white transition-colors duration-300" 
                        />
                      </CardItem>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex flex-col flex-1 min-h-0">
                      {/* Title and Description */}
                      <CardItem translateZ="180" className="mb-4">
                        <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                          <h3 className="text-base sm:text-lg font-black font-inter text-gray-900 tracking-tight leading-tight flex-shrink-0">
                            {item.title}
                          </h3>
                          <div className="flex-shrink-0">
                            <StatusTag status={item.status} />
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed tracking-wide text-xs sm:text-sm">
                          {item.description}
                        </p>
                      </CardItem>

                      {/* Features */}
                      <CardItem translateZ="140" className="mb-4">
                        <div className="space-y-2">
                          {item.features.map((feature, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <div className="w-1.5 h-1.5 bg-black flex-shrink-0 mt-1.5" />
                              <span className="text-xs font-semibold tracking-wide leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardItem>

                      {/* Tech Stack */}
                      <CardItem translateZ="130" className="mb-6">
                        <p className="text-xs text-gray-500 font-mono tracking-wider uppercase">
                          {item.stack}
                        </p>
                      </CardItem>

                      {/* Spacer to push link to bottom */}
                      <div className="flex-1"></div>

                      {/* Link - Always at bottom */}
                      <CardItem translateZ="150" className="mt-auto pt-4">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-black hover:text-gray-600 font-bold text-sm tracking-widest uppercase transition-colors duration-200"
                        >
                          <span className="whitespace-nowrap">
                            {item.status === 'in-progress' ? 'PREVIEW SITE' : 'VIEW PROJECT'}
                          </span>
                          <ExternalLink size={16} className="flex-shrink-0" />
                        </a>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>
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
