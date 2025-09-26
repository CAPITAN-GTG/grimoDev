"use client";

import { useState, useEffect } from "react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Mail, CheckCircle, Code, Smartphone, Zap, Shield, Globe, Layers, Star, Users, Clock, Trophy } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CallButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Services we offer
  const services = [
    { icon: Code, title: "Web Development", description: "Modern, responsive websites built with cutting-edge technology" },
    { icon: Smartphone, title: "Mobile Applications", description: "Cross-platform mobile apps for iOS and Android" },
    { icon: Globe, title: "E-commerce Solutions", description: "Shopify, WordPress, and custom online stores" },
    { icon: Zap, title: "Performance Optimization", description: "Lightning-fast loading times and seamless user experience" },
    { icon: Shield, title: "Security & Maintenance", description: "Ongoing support and security updates for peace of mind" },
    { icon: Layers, title: "Custom Integrations", description: "Third-party APIs, payment systems, and automation tools" },
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
          hover-lift
          focus-ring
          ${variant === 'primary' 
            ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-lg hover:shadow-xl' 
            : 'bg-white border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'
          }
          ${className}
        `}
      >
        <Mail className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0 group-hover:animate-pulse" />
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

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section (Optimized) */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        <HeroHighlight className="py-24 sm:py-32 md:py-40">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-jura mb-6 sm:mb-8 text-center text-gray-900 leading-tight">
              WEBSITES & MOBILE <br className="hidden md:block" /> <Highlight className="bg-blue-900/20 text-blue-900">APPLICATIONS</Highlight>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-4xl mx-auto text-gray-700 leading-snug font-medium tracking-wide px-2 text-center">
              Professional digital solutions for businesses of all sizes. Fast delivery, flexible pricing, and premium quality that meets your business needs.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
              <div className="flex items-center justify-center w-full max-w-md sm:max-w-lg mx-auto">
                <CallButton className="w-full sm:w-auto" />
              </div>
              <p className="text-gray-500 max-w-md text-xs sm:text-sm tracking-wider uppercase font-semibold text-center">
                50% TO START • 50% AFTER SATISFACTION • FAST RESPONSE TIME
              </p>
            </div>
          </div>
        </HeroHighlight>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center stagger-animation stagger-1">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 float-animation">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-black text-blue-900 mb-2 count-up">100%</div>
              <p className="text-gray-600 font-medium text-sm lg:text-base">Happy Clients</p>
            </div>
            <div className="text-center stagger-animation stagger-2">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 float-animation" style={{animationDelay: '1s'}}>
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-black text-blue-900 mb-2 count-up">24h</div>
              <p className="text-gray-600 font-medium text-sm lg:text-base">Response Time</p>
            </div>
            <div className="text-center stagger-animation stagger-3">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 float-animation" style={{animationDelay: '2s'}}>
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-black text-blue-900 mb-2 count-up">100%</div>
              <p className="text-gray-600 font-medium text-sm lg:text-base">Success Rate</p>
            </div>
            <div className="text-center stagger-animation stagger-4">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 float-animation" style={{animationDelay: '3s'}}>
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-black text-blue-900 mb-2 count-up">5.0</div>
              <p className="text-gray-600 font-medium text-sm lg:text-base">Client Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Options Section */}
      <section id="pricing" className="py-24 bg-white section-transition relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-blue-900 px-6 py-2 text-white text-sm font-bold tracking-widest mb-6">
              <span>PRICING OPTIONS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-jura text-gray-900 mb-6 tracking-tight">
              CHOOSE YOUR APPROACH
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto tracking-wide leading-relaxed mb-4">
              We offer two paths: fully managed hosting with us, or build on the platform you prefer. Both options include our signature 50/50 payment structure.
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-blue-900" />
              <span className="text-blue-900 font-semibold text-sm">50% to start • 50% after satisfaction</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Gimo Hosted */}
            <div className="bg-gradient-to-br from-black to-gray-900 text-white p-8 lg:p-10 flex flex-col transition-all duration-500 hover:shadow-2xl hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <Zap className="w-8 h-8 text-black" />
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full mb-3">
                    <span className="text-green-700 font-semibold text-xs">MOST POPULAR</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black font-jura tracking-tight">Gimo Hosted</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-8 text-center text-sm lg:text-base">
                  Cheaper and much more flexible. We handle everything - hosting, updates, and maintenance.
                </p>
                
                <div className="bg-white/10 p-4 lg:p-6 rounded-lg mb-8 backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">$750<span className="text-lg font-normal">+</span></div>
                    <p className="text-gray-300 text-sm lg:text-base font-medium">Starting Price</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-lg lg:text-2xl font-bold text-white mb-1">$10<span className="text-sm font-normal">/month</span></div>
                      <p className="text-gray-300 text-xs lg:text-sm">Hosting & Maintenance</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg lg:text-2xl font-bold text-white mb-1">$75-500<span className="text-sm font-normal">/month</span></div>
                      <p className="text-gray-300 text-xs lg:text-sm">Updates & Support</p>
                    </div>
                  </div>
                </div>

              <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">Lightning-fast performance</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">GITHUB repo ownership</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">Ongoing maintenance included</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">Separate quotes for bigger changes</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">50% to start, 50% after satisfaction</span></li>
              </ul>
                
                <div className="mt-auto">
                  <p className="text-xs lg:text-sm text-gray-400 text-center italic">Perfect for businesses wanting hassle-free web presence</p>
                </div>
              </div>
            </div>

            {/* Client Hosted */}
            <div className="bg-white border-2 border-blue-900 p-8 lg:p-10 flex flex-col text-black transition-all duration-500 hover:border-blue-700 hover:shadow-xl hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full mb-3">
                    <span className="text-blue-700 font-semibold text-xs">MAXIMUM CONTROL</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black font-jura tracking-tight">Client Hosted</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 text-center text-sm lg:text-base">
                  You choose the platform. We meet you where you are - WordPress, Shopify, or whatever you prefer.
                </p>
                
                <div className="bg-blue-50 p-4 lg:p-6 rounded-lg mb-8 border border-blue-200 group-hover:bg-blue-100 transition-colors duration-300">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-black text-blue-900 mb-2">$1000<span className="text-lg font-normal">+</span></div>
                    <p className="text-gray-600 text-sm lg:text-base font-medium">Starting Price</p>
                    <p className="text-gray-500 text-xs lg:text-sm mt-2">Based on platform complexity</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-blue-900 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">Work with WordPress, Shopify, etc.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-blue-900 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">You can edit content yourself</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-blue-900 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">No programming knowledge required</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-blue-900 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">Platform flexibility and freedom</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-blue-900 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base">50% to start, 50% after satisfaction</span></li>
                </ul>
                
                <div className="mt-auto">
                  <p className="text-xs lg:text-sm text-gray-500 text-center italic">More expensive but gives you full control and editing capabilities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-8">
              <strong>Note:</strong> Domain purchase not included in either option. Project timeline varies by complexity.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:text-blue-700 transition-colors duration-300 text-lg">
              <span>Ready to get started?</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 section-transition relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-blue-900 px-6 py-2 text-white text-sm font-bold tracking-widest mb-6">
              <span>SERVICES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-jura text-gray-900 mb-6 tracking-tight">
              WHAT WE BUILD
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide leading-relaxed">
              From design to deployment, we create digital experiences that drive business growth and engage your customers.
            </p>
            
            {/* Desktop/Tablet scroll hint */}
            <div className="hidden sm:block text-center mt-4">
              <p className="text-sm text-blue-900 font-medium">
                Use arrow buttons to navigate our services
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Mobile scroll indicator */}
            <div className="sm:hidden text-center mb-6">
              <div className="inline-flex items-center gap-3 text-blue-900 text-sm font-medium bg-blue-50 px-6 py-3 rounded-full shadow-md border border-blue-200">
                <span className="font-semibold">Swipe to explore our services</span>
                <div className="flex gap-1 swipe-indicator">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-3 md:-ml-4">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <CarouselItem key={index} className="pl-3 md:pl-4 pt-5 basis-4/5 sm:basis-1/2 lg:basis-1/3">
                      <div className="bg-white p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-900 hover-lift group relative overflow-hidden h-full rounded-lg carousel-card">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-600/5 opacity-100 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="w-14 h-14 bg-blue-900 flex items-center justify-center mb-6 group-hover:bg-black transition-colors duration-300 rounded-lg shadow-md">
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors duration-300 font-jura">{service.title}</h3>
                          <p className="text-gray-700 leading-relaxed text-base lg:text-lg flex-grow">{service.description}</p>
                          
                          {/* Card number indicator */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2 py-1 rounded-full">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              
              {/* Desktop arrows with better visibility */}
              <CarouselPrevious className="hidden lg:flex -left-16 w-12 h-12 bg-blue-900 hover:text-white hover:bg-black text-white border-0 shadow-lg carousel-btn" />
              <CarouselNext className="hidden lg:flex -right-16 w-12 h-12 bg-blue-900 hover:text-white hover:bg-black text-white border-0 shadow-lg carousel-btn" />
              
              {/* Tablet arrows */}
              <CarouselPrevious className="hidden sm:flex lg:hidden -left-8 w-10 h-10 bg-blue-900 hover:text-white hover:bg-black text-white border-0 shadow-md carousel-btn" />
              <CarouselNext className="hidden sm:flex lg:hidden -right-8 w-10 h-10 bg-blue-900 hover:text-white hover:bg-black text-white border-0 shadow-md carousel-btn" />
            </Carousel>

            {/* Progress indicator for mobile */}
            <div className="sm:hidden mt-8">
              <div className="text-center text-sm text-gray-600 mb-3">
                <span className="font-medium">Services</span> • <span className="text-blue-900 font-semibold">1 of {services.length}</span>
              </div>
              <div className="flex justify-center gap-2">
                {services.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index < 2 
                        ? 'bg-blue-900 scale-110' 
                        : 'bg-blue-200 hover:bg-blue-300'
                    }`}
                  ></div>
                ))}
              </div>
              <div className="text-center mt-3 text-xs text-gray-500">
                Touch and drag to navigate
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
            
            <h2 className="text-4xl md:text-6xl font-black font-jura mb-8 tracking-tight">
              READY TO BUILD YOUR
              <span className="block text-gray-400">DIGITAL SOLUTION?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed tracking-wide">
              Get your free consultation today. We deliver fast, work around your business needs, and provide flexible pricing with premium quality results.
            </p>
            
            <div className="flex flex-col items-center space-y-12">
              <div className="flex items-center">
                <CallButton />
              </div>
              
              <p className="text-gray-500 max-w-lg text-sm tracking-widest uppercase font-bold">
                WEBSITES & MOBILE APPS • FAST DELIVERY • FLEXIBLE PRICING • PREMIUM QUALITY
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
