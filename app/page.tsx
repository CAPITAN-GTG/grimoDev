"use client";

import Link from "next/link";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Phone, PhoneCall, Globe, Code, Palette, Blocks, ArrowUpRight, Construction, Wine, Sticker } from "lucide-react";

interface CallButtonProps {
  phoneNumber: string;
  className?: string;
}

export default function Home() {
  const StatusTag = ({ status }: { status: 'completed' | 'in-progress' }) => (
    <span className={`
      inline-flex
      ml-3
      px-2
      py-0.5
      text-[10px]
      font-medium
      tracking-wider
      uppercase
      rounded-sm
      border
      ${status === 'completed' 
        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
        : 'bg-amber-950/30 border-amber-500/30 text-amber-400'
      }
      ${status === 'in-progress' ? 'animate-pulse' : ''}
    `}>
      {status === 'completed' ? 'Completed' : 'In Progress'}
    </span>
  );

  const portfolioItems = [
    {
      title: "TGA Builders",
      description: "Professional construction company website with modern design",
      features: ["Custom Project Gallery", "Service Booking System", "Responsive Design"],
      icon: "🏗️",
      url: "https://www.tgabuildersinc.com/",
      status: 'completed' as const,
      stack: "Next.js • Tailwind • NodeMailer"
    },
    {
      title: "Senic International",
      description: "Premium spirits distributor with elegant presentation",
      features: ["Product Catalog", "Age Verification", "Distributor Portal"],
      icon: "🥃",
      url: "https://senic-international.vercel.app/",
      status: 'in-progress' as const,
      stack: "Next.js • Tailwind"
    },
    {
      title: "Xtreme Stickers",
      description: "Custom sticker shop with dynamic e-commerce features",
      features: ["Custom Design Tool", "Order Management", "Real-time Preview"],
      icon: "🎨",
      url: "https://xtreme-stickers.vercel.app/",
      status: 'in-progress' as const,
      stack: "Next.js • Tailwind • MongoDB • Stripe"
    }
  ];

  const CallButton = ({ phoneNumber, className = "" }: CallButtonProps) => (
    <a 
      href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
      className={`
        group
        relative
        flex items-center gap-3
        px-6 py-3
        bg-black/20 backdrop-blur-sm
        hover:bg-black/30
        border border-amber-500/20
        hover:border-amber-500/40
        rounded-full
        transition-all duration-300
        ${className}
      `}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-xl group-hover:bg-amber-500/20 transition-colors duration-300" />
      
      {/* Button content */}
      <div className="relative flex items-center gap-3">
        <div className="relative">
          {/* Static icon */}
          <Phone className="w-5 h-5 text-amber-500/70" />
          {/* Animated icon overlay */}
          <PhoneCall 
            className="absolute inset-0 w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" 
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-base tracking-wider text-amber-100 font-[var(--font-modern)]">
            {phoneNumber}
          </span>
          <span className="text-xs text-amber-400/80 group-hover:text-amber-300/80 transition-colors font-[var(--font-modern)]">
            Request a Quote
          </span>
        </div>
      </div>
    </a>
  );

  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/background.jpeg"
          alt="Medieval Background"
          fill
          className="object-cover blur-[2px] brightness-[0.7]"
          priority
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black/40">
        <div className="relative z-10 text-center px-4 animate-fadeIn max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className=" text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-amber-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-slideDown">
              Welcome to Grimo Dev
            </h1>
            <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
          </div>

          {/* Subtitle */}
          <p className="font-[var(--font-medieval)] text-xl md:text-2xl lg:text-3xl mb-6 max-w-3xl mx-auto text-amber-200/90 leading-relaxed drop-shadow-lg animate-slideUp">
            Where Medieval Elegance Meets Modern Web Development
          </p>

          {/* Description */}
          <p className=" text-base md:text-lg text-amber-100/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Embark on a journey to transform your digital presence with our unique blend of timeless design and cutting-edge technology.
          </p>

          {/* Call to Action Section */}
          <div className="flex flex-col items-center space-y-8 animate-fadeIn">
            <h2 className="font-[var(--font-medieval)] text-lg md:text-xl text-amber-300/90 tracking-wide">
              Begin Your Digital Journey
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <CallButton phoneNumber="(702) 218-5068" />
              <span className=" text-amber-300/50 font-light">or</span>
              <CallButton phoneNumber="(747) 400-9401" />
            </div>
            <p className=" text-amber-200/60 mt-4 max-w-md text-sm font-light tracking-wide">
              Contact us for a free consultation and let's craft your perfect digital presence
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 bg-stone-900/90">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-amber-100 mb-4">
              Our Latest Conquests
            </h2>
            <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <CardContainer key={index} className="inter-var">
                <CardBody className="relative group/card border border-amber-900/30 w-auto h-auto rounded-xl bg-gradient-to-b from-stone-800/90 to-stone-900/90 backdrop-blur-sm overflow-hidden">
                  {/* Icon and Title Section */}
                  <div className="p-6 border-b border-amber-500/20">
                    <CardItem
                      translateZ="160"
                      className="text-center mb-6"
                    >
                      <span className="text-7xl transform transition-transform duration-500 hover:scale-110">
                        {item.icon}
                      </span>
                    </CardItem>

                    <CardItem 
                      translateZ="180" 
                      className="text-center"
                    >
                      <div className="flex items-center justify-center flex-wrap gap-y-2">
                        <h3 className="text-2xl font-bold text-amber-100">
                          {item.title}
                        </h3>
                        <StatusTag status={item.status} />
                      </div>
                      <p className="text-amber-200/70 text-sm leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </CardItem>
                  </div>

                  {/* Features Section */}
                  <div className="p-6 border-b border-amber-500/20">
                    <CardItem translateZ="140" className="space-y-3">
                      {item.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-2 text-amber-100/80 group/feature"
                        >
                          <span className="text-amber-500 transition-transform duration-300 group-hover/feature:rotate-90">
                            ◆
                          </span>
                          <span className="group-hover/feature:text-amber-400 transition-colors duration-200">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </CardItem>
                  </div>

                  {/* Tech Stack & Link */}
                  <div className="p-6">
                    <CardItem 
                      translateZ="130" 
                      className="text-center mb-6"
                    >
                      <p className="text-amber-300/70 text-sm font-light tracking-wider">
                        {item.stack}
                      </p>
                    </CardItem>

                    <CardItem
                      translateZ="150"
                      className="group/link relative"
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
                      >
                        <span className="text-lg font-medium">
                          {item.status === 'in-progress' ? 'Preview Site' : 'Visit Website'}
                        </span>
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </a>
                    </CardItem>
                  </div>

                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent" />
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-16 text-amber-100">
            Why Choose Our Guild?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Code Ownership",
                description: "Full access to your project's GitHub repository and source code"
              },
              {
                icon: "⚔️",
                title: "Swift Response",
                description: "Direct communication and quick support when you need it most"
              },
              {
                icon: "💰",
                title: "Fair Pricing",
                description: "Flexible and affordable rates tailored to your requirements"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 border border-amber-700/30 rounded-lg bg-stone-900/50 backdrop-blur-sm text-amber-100 transform transition-all duration-300 hover:scale-105 hover:bg-stone-900/70"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 bg-black/80 backdrop-blur-sm text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4 text-amber-100">
            Ready to Forge Your Digital Legacy?
          </h2>
          <p className="text-base text-amber-200/70 mb-12 max-w-2xl mx-auto font-light">
            Transform your vision into reality with our expertise
          </p>
          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <CallButton phoneNumber="(702) 218-5068" />
              <span className="text-amber-300/50 font-light">or</span>
              <CallButton phoneNumber="(747) 400-9401" />
            </div>
            <p className="text-amber-200/60 max-w-md text-sm font-light">
              Get a personalized quote for your project today
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
