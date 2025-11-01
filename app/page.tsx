"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Mail, CheckCircle, Code, Smartphone, Zap, Shield, Globe, Layers, Star, Users, Calendar, Briefcase, ArrowUpRight, ExternalLink, ChevronDown, Info, ShoppingCart } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import qrFrame from "@/public/frame.png";
import { projects } from "@/lib/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CallButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}


export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  // Projects carousel state
  const [projectsApi, setProjectsApi] = useState<CarouselApi>();
  const [projectsCurrent, setProjectsCurrent] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  
  // Dropdown states - arrays to allow multiple open items
  const [openFaq, setOpenFaq] = useState<number[]>([]);
  const [openHosting, setOpenHosting] = useState<number[]>([]);
  const [openStandalone, setOpenStandalone] = useState<number[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [showHostingOptions, setShowHostingOptions] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Refs for sections
  const projectsSectionRef = useRef<HTMLElement>(null);
  const clientResultsRef = useRef<HTMLElement>(null);
  const standaloneRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    // Create animation context
    const ctx = gsap.context(() => {
      // Helper function to create scroll animations
      const createScrollAnimation = (ref: React.RefObject<HTMLElement | null>, delay: number = 0) => {
        if (!ref.current) return;

        const section = ref.current;
        const heading = section.querySelector('h2');
        const description = section.querySelector('p');
        const cards = section.querySelectorAll('[class*="grid"] > *');

        // Animate heading
        if (heading) {
          gsap.fromTo(
            heading,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Animate description
        if (description) {
          gsap.fromTo(
            description,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: delay,
              scrollTrigger: {
                trigger: description,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Animate cards with stagger
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 60,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: cards[0],
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      };

      // Animate Projects Section
      if (projectsSectionRef.current) {
        const section = projectsSectionRef.current;
        const badge = section.querySelector('[class*="inline-flex"]');
        const heading = section.querySelector('h2');
        const description = section.querySelector('p');
        const carousel = section.querySelector('[role="region"]');

        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: badge,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (description) {
          gsap.fromTo(
            description,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: description,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (carousel) {
          gsap.fromTo(
            carousel,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.3,
              scrollTrigger: {
                trigger: carousel,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Animate Client Results Section
      createScrollAnimation(clientResultsRef, 0.2);

      // Animate Standalone Section
      createScrollAnimation(standaloneRef, 0.2);

      // Animate Pricing Section
      if (pricingRef.current) {
        const section = pricingRef.current;
        const badge = section.querySelector('[class*="inline-flex"]');
        const heading = section.querySelector('h2');
        const description = section.querySelector('p');
        const packages = section.querySelectorAll('[class*="grid"] > *');

        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: badge,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (description) {
          gsap.fromTo(
            description,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: description,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (packages.length > 0) {
          gsap.fromTo(
            packages,
            { opacity: 0, y: 80, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power2.out",
              stagger: 0.2,
              scrollTrigger: {
                trigger: packages[0],
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Animate FAQ Section
      if (faqRef.current) {
        const section = faqRef.current;
        const badge = section.querySelector('[class*="inline-flex"]');
        const heading = section.querySelector('h2');
        const description = section.querySelector('p');
        const faqItems = section.querySelectorAll('[class*="space-y"] > *');

        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: badge,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (description) {
          gsap.fromTo(
            description,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: description,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (faqItems.length > 0) {
          gsap.fromTo(
            faqItems,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: faqItems[0],
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Animate Services Section
      if (servicesRef.current) {
        const section = servicesRef.current;
        const badge = section.querySelector('[class*="inline-flex"]');
        const heading = section.querySelector('h2');
        const description = section.querySelector('p');
        const carousel = section.querySelector('[role="region"]');

        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: badge,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (description) {
          gsap.fromTo(
            description,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: description,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (carousel) {
          gsap.fromTo(
            carousel,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.3,
              scrollTrigger: {
                trigger: carousel,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Animate Contact Section
      if (contactRef.current) {
        const section = contactRef.current;
        const badge = section.querySelector('[class*="inline-flex"]');
        const heading = section.querySelector('h2');
        const description = section.querySelector('p');
        const form = section.querySelector('form');

        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: badge,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (description) {
          gsap.fromTo(
            description,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: description,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (form) {
          gsap.fromTo(
            form,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.3,
              scrollTrigger: {
                trigger: form,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert(); // Reverts all animations when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (!projectsApi) {
      return;
    }

    setProjectsCount(projectsApi.scrollSnapList().length);
    setProjectsCurrent(projectsApi.selectedScrollSnap() + 1);

    projectsApi.on("select", () => {
      setProjectsCurrent(projectsApi.selectedScrollSnap() + 1);
    });
  }, [projectsApi]);



  // Client results data
  const clientResults = [
    {
      project: "Professional Online Presence",
      metric: "Modern Website",
      description: "Get a website that actually works for your business. Build trust with customers and stand out from the competition.",
      icon: Globe
    },
    {
      project: "E-commerce Success",
      metric: "Custom Solutions",
      description: "Turn visitors into customers with smart e-commerce features. We make online selling simple and profitable.",
      icon: ShoppingCart
    },
    {
      project: "Streamlined Operations",
      metric: "Booking Systems",
      description: "Stop juggling phone calls and emails. Let customers book appointments online 24/7 while you focus on growing your business.",
      icon: Calendar
    }
  ];

  // Services we offer
  const services = [
    { icon: Code, title: "Boost credibility with a custom-built website", description: "Web Development" },
    { icon: Smartphone, title: "Reach customers anywhere with mobile apps", description: "Mobile Applications" },
    { icon: Globe, title: "Sell more online with optimized ecommerce", description: "E-commerce Solutions" },
    { icon: Star, title: "Stand out with professional design", description: "Design Improvement" },
    { icon: Zap, title: "Keep customers engaged with fast performance", description: "Performance Optimization" },
    { icon: Shield, title: "Stay secure with ongoing maintenance", description: "Security & Maintenance" },
    { icon: Layers, title: "Streamline operations with smart integrations", description: "Custom Integrations" },
  ];

  const faqData = [
    {
      question: "How long will my site take?",
      answer: "Timeline depends on your package: Starter sites (2 weeks), Business sites (4 weeks), Pro sites (6 weeks). We always deliver on time and keep you updated throughout the process."
    },
    {
      question: "What if I don't like the result?",
      answer: "We offer unlimited revisions until you're completely satisfied. Our 50/50 payment structure means you only pay the final 50% after you approve the completed project. However, we don't give project ownership until final payment"
    },
    {
      question: "Can I update my site later?",
      answer: "Absolutely! We offer monthly support plans starting at $25/month for updates, maintenance, and content changes. You can also choose a platform like WordPress, shopify, wix, etc... to update your site yourself."
    },
    {
      question: "Do you provide hosting?",
      answer: "Yes! Our Grimo Hosting option includes secure SSL hosting, maintenance, and updates. We also work with your preferred hosting provider if you want something like WordPress, shopify, wix, etc..."
    },
    {
      question: "What's included in the 50/50 payment?",
      answer: "A 50% deposit covers the full development of your project. The remaining 50% grants you full ownership and launches the site live. Monthly hosting keeps it online and maintained. If final payment isn’t made within 30 days, the site will be taken offline until final payment is made. Hosting must start within 30 days of final payment unless you choose to self-host."
    }
  ];

  const hostingData = [
    {
      title: "Basic",
      price: "$25",
      period: "/month",
      features: ["Grimo Hosting", "Security updates", "Basic maintenance", "Email support"]
    },
    {
      title: "Standard",
      price: "$200",
      period: "/month",
      features: ["Everything in Basic", "Website changes upon request", "Content updates", "Performance monitoring", "Priority support"],
      popular: true
    },
    {
      title: "Premium",
      price: "$500",
      period: "/month",
      features: ["Everything in Standard", "Advanced analytics", "Infrastructure updates", "Latest technology", "Dedicated support"]
    }
  ];

  const standaloneData = [
    {
      title: "Portfolio Sites",
      icon: Briefcase,
      description: "Simple, fast, and mobile-ready. Showcase your work professionally with a clean, modern design that loads instantly.",
      features: ["Responsive design", "Fast loading times", "Easy content updates"]
    },
    {
      title: "Event Scheduling Pages",
      icon: Calendar,
      description: "Accept appointments or RSVPs without external tools. Built-in booking system that works seamlessly with your schedule.",
      features: ["Built-in booking system", "Calendar integration", "Email notifications", "Payment processing"]
    },
    {
      title: "Mini Business Pages",
      icon: Users,
      description: "Lightweight single-page websites for small services. Perfect for consultants, freelancers, and local businesses.",
      features: ["Single-page design", "Contact forms", "Service listings", "Mobile optimized"]
    }
  ];

  // Dropdown toggle functions
  const toggleFaq = (index: number) => {
    setOpenFaq(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const toggleHosting = (index: number) => {
    setOpenHosting(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const toggleStandalone = (index: number) => {
    setOpenStandalone(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    setSelectedReason(packageName.toLowerCase());
    // Scroll to contact form
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStandaloneSelect = (reason: string) => {
    setSelectedReason(reason);
    // Don't auto-fill for standalone, just scroll to form
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Dismiss any existing toasts
    toast.dismiss();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      reason: formData.get('reason'),
      hosting: showHostingOptions,
      hostingPlan: formData.get('hosting-plan'),
      message: formData.get('message'),
    };

    // Validate hosting plan if hosting interest is checked
    if (showHostingOptions && !data.hostingPlan) {
      toast.error('Please select a hosting plan since you\'re interested in hosting options.', {
        style: {
          background: '#fef3c7',
          color: '#000000',
          border: '1px solid #000000',
          borderRadius: '8px',
          fontFamily: 'Outfit, sans-serif',
        },
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.', {
          style: {
            background: '#fef3c7',
            color: '#000000',
            border: '1px solid #000000',
            borderRadius: '8px',
            fontFamily: 'Outfit, sans-serif',
          },
        });
        
        // Reset form completely
        if (formRef.current) {
          formRef.current.reset();
        }
        setSelectedReason('');
        setSelectedPackage('');
        setShowHostingOptions(false);
        setOpenFaq([]);
        setOpenHosting([]);
        setOpenStandalone([]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again.', {
        style: {
          background: '#fef3c7',
          color: '#000000',
          border: '1px solid #000000',
          borderRadius: '8px',
          fontFamily: 'Outfit, sans-serif',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          font-semibold
          text-sm
          tracking-widest
          uppercase
          transition-colors duration-300
          hover-lift
          focus-ring
          ${variant === 'primary' 
            ? 'bg-black text-white hover:bg-gray-800 hover:text-yellow-200 shadow-lg hover:shadow-xl' 
            : 'bg-white border-2 border-black text-black hover:bg-black hover:text-yellow-200'
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
            START FREE CONSULTATION — NO COMMITMENT
          </span>
        </div>
      </a>
    );
  };

  return (
    <main className="min-h-screen bg-white">
     {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* QR Code */}
        <div className="absolute top-4 left-4 z-20">
          <Image
            src={qrFrame}
            alt="QR code to share Grimo Dev website with friends"
            className="w-16 sm:w-20 md:w-24 lg:w-28"
            priority
          />
        </div>

        <HeroHighlight className="py-24 sm:py-32 md:py-40 z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading mb-6 sm:mb-8 text-center text-black leading-tight">
              WE BUILD WEBSITES AND APPS <br className="hidden md:block" /> THAT <Highlight className="bg-yellow-200 text-black">GROW YOUR BUSINESS</Highlight>
            </h1>
            <p className="text-base md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-4xl mx-auto text-gray-700 leading-snug font-normal tracking-wide px-2 text-center">
              Fast delivery, transparent pricing, and support that keeps your business online. Professional digital solutions that drive real results.
            </p>
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

       {/* Our Projects Section */}
       <section id="projects" ref={projectsSectionRef} className="py-16 bg-yellow-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-normal tracking-widest mb-6">
               <span>OUR PROJECTS</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-heading text-black mb-6 tracking-tight">
               RECENT WORK
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide leading-relaxed font-normal">
               Explore some of our latest projects. From construction companies to e-commerce platforms, we deliver results that drive business growth.
             </p>
           </div>

           <div className="relative">
             <Carousel
               opts={{
                 align: "start",
                 loop: true,
               }}
               className="w-full max-w-6xl mx-auto"
               setApi={setProjectsApi}
              aria-label="Projects showcase carousel"
             >
               <CarouselContent className="-ml-3 md:-ml-4">
                 {projects.map((project, index) => (
                   <CarouselItem key={project.id} className="pl-3 md:pl-4 pt-5 basis-4/5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                     <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 overflow-hidden h-full">
                       {/* Project Card */}
                       <div className="p-8 text-center h-full flex flex-col">
                         {/* Logo */}
                         <div className="flex justify-center mb-6">
                           <div className="w-32 h-32 bg-white flex items-center justify-center p-4">
                             {project.image ? (
                               <Image
                                 src={project.image}
                                 alt={`${project.name} logo`}
                                 width={128}
                                 height={128}
                                 className="w-full h-full object-contain"
                               />
                             ) : (
                                 <Globe className="w-16 h-16 text-black" />
                               )}
                             </div>
                           </div>
                           
                         {/* Project Name */}
                         <h3 className="text-2xl font-heading font-bold text-black mb-3 tracking-tight">
                               {project.name}
                             </h3>
                             
                             {/* Category Badge */}
                         <div className="mb-6">
                           <span className="inline-flex items-center px-4 py-2 bg-yellow-100 text-black text-sm font-normal tracking-widest uppercase rounded-full">
                                 {project.category}
                               </span>
                       </div>
                       
                         {/* Visit Site Button */}
                         <div className="mt-auto">
                           <a
                             href={project.url}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-normal text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-105"
                           >
                             <span>Visit Site</span>
                             <ExternalLink className="w-4 h-4" />
                           </a>
                         </div>
                       </div>
                     </div>
                   </CarouselItem>
                 ))}
               </CarouselContent>
               
               {/* Desktop Navigation Arrows */}
               <CarouselPrevious className="hidden lg:flex -left-16 w-12 h-12 bg-black hover:bg-gray-800 hover:text-yellow-200 text-white border-0 shadow-lg" />
               <CarouselNext className="hidden lg:flex -right-16 w-12 h-12 bg-black hover:bg-gray-800 hover:text-yellow-200 text-white border-0 shadow-lg" />
               
               {/* Tablet Navigation Arrows */}
               <CarouselPrevious className="hidden sm:flex lg:hidden -left-8 w-10 h-10 bg-black hover:bg-gray-800 hover:text-yellow-200 text-white border-0 shadow-md" />
               <CarouselNext className="hidden sm:flex lg:hidden -right-8 w-10 h-10 bg-black hover:bg-gray-800 hover:text-yellow-200 text-white border-0 shadow-md" />
             </Carousel>

             {/* Mobile Progress Indicator */}
             <div className="sm:hidden mt-8">
               <div className="text-center text-sm text-gray-600 mb-3">
                 <span className="font-normal">Projects</span> • <span className="text-black font-normal">{projectsCurrent} of {projectsCount}</span>
               </div>
               <div className="flex justify-center gap-2">
                 {Array.from({ length: projectsCount }).map((_, index) => (
                   <div 
                     key={index} 
                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
                       index === projectsCurrent - 1
                         ? 'bg-black scale-110' 
                         : 'bg-yellow-200'
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

       {/* Client Results Section */}
       <section ref={clientResultsRef} className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-normal tracking-widest mb-6">
               <span>CLIENT RESULTS</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-heading text-black mb-6 tracking-tight">
               PROVEN RESULTS
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide leading-relaxed font-normal">
               Real results from real businesses. See how we help companies like yours grow and succeed online.
             </p>
           </div>

           {/* Results Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
             {clientResults.map((result, index) => (
                 <div key={index} className="bg-yellow-50 p-8 rounded-xl shadow-lg border border-yellow-100">
                   <div className="text-center">
                     <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
                       <result.icon className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-2xl font-normal text-black mb-2">{result.metric}</h3>
                     <p className="text-gray-700 font-normal mb-2">{result.project}</p>
                     <p className="text-gray-600 text-sm leading-relaxed font-normal">{result.description}</p>
                   </div>
                 </div>
             ))}
           </div>
         </div>
       </section>

       {/* Standalone Sites Section */}
       <section id="standalone" ref={standaloneRef} className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-normal tracking-widest mb-6">
               <span>STANDALONE SITES</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-heading text-black mb-6 tracking-tight">
               FOR INDIVIDUALS & CREATORS
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide leading-relaxed mb-8 font-normal">
               Perfect for personal projects, small portfolios, event scheduling, and more.
             </p>
             <div className="inline-flex items-center gap-2 bg-yellow-100 px-6 py-3 rounded-full mb-8">
               <span className="text-black font-normal text-2xl">$250</span>
               <span className="text-black font-normal text-lg">flat rate</span>
             </div>
             <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
               Ideal for freelancers, photographers, coaches, and anyone needing a clean, functional site without heavy maintenance.
             </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
             {standaloneData.map((item, index) => {
               const IconComponent = item.icon;
               const isOpen = openStandalone.includes(index);
               
               return (
                 <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                   <button
                     onClick={() => toggleStandalone(index)}
                     className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                   >
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                         <IconComponent className="w-6 h-6 text-white" />
                       </div>
                       <div>
                         <h3 className="text-lg font-normal text-black">{item.title}</h3>
                         <p className="text-sm text-gray-600 font-normal">$250 flat rate</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-1 text-sm font-normal text-black bg-yellow-100 px-2 py-1 rounded-full transition-colors duration-200 hover:bg-yellow-200">
                       <Info className="w-3 h-3" />
                       <span className="hidden sm:inline">{isOpen ? 'Less' : 'More'}</span>
                     </div>
                   </button>
                   
                   <div className={`overflow-hidden transition-all duration-300 ${
                     isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                   }`}>
                     <div className="px-6 pb-6">
                       <p className="text-gray-600 text-sm leading-relaxed mb-4 font-normal">
                         {item.description}
                       </p>
                       <ul className="space-y-2">
                         {item.features.map((feature, featureIndex) => (
                           <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                             <CheckCircle size={14} className="text-black flex-shrink-0" />
                             <span className="font-normal">{feature}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>

           <div className="text-center">
             <a href="#contact" onClick={() => handleStandaloneSelect('standalone')} className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-normal text-sm sm:text-lg tracking-widest uppercase transition-colors duration-300 hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-105">
               <span className="hidden sm:inline">Build My Standalone Site</span>
               <span className="sm:hidden">Build Site</span>
               <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
             </a>
           </div>
         </div>
       </section>
      <section id="pricing" ref={pricingRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-normal tracking-widest mb-6">
              <span>PRICING OPTIONS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading text-black mb-6 tracking-tight">
              CHOOSE YOUR PACKAGE
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto tracking-wide leading-relaxed mb-4 font-normal">
              Transparent pricing with clear deliverables. All packages include revisions until launch and secure SSL hosting.
            </p>
            <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-black" />
              <span className="text-black font-normal text-sm">50% to start • 50% after satisfaction</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12">
            {/* Starter Package */}
            <div className="bg-white border-2 border-gray-200 p-8 lg:p-10 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300 group min-h-[600px] max-h-[600px]">
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl lg:text-3xl font-normal tracking-tight text-black">Starter</h3>
                  <div className="text-4xl lg:text-5xl font-normal text-black mb-2 mt-4">$750</div>
                  <p className="text-gray-600 text-sm lg:text-base font-normal">Perfect for getting started</p>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Up to 5 pages</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Basic SEO optimization</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Delivery in 2 week</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Mobile responsive design</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Contact form integration</span></li>
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <a href="#contact" onClick={() => handlePackageSelect('Starter')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-105">
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* Business Package */}
            <div className="bg-black text-white p-8 lg:p-10 flex flex-col hover:shadow-2xl transition-all duration-300 group min-h-[600px] max-h-[600px]">
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full mb-3">
                    <span className="text-black font-normal text-xs">MOST POPULAR</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-normal tracking-tight">Business</h3>
                  <div className="text-4xl lg:text-5xl font-normal text-white mb-2 mt-4">$1200</div>
                  <p className="text-gray-300 text-sm lg:text-base font-normal">Most businesses choose this</p>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-200 font-normal">Unlimited pages</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-200 font-normal">Advanced SEO optimization</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-200 font-normal">Delivery in 3-4 weeks</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-200 font-normal">Content management system</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-200 font-normal">Analytics integration</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-200 font-normal">Social media integration</span></li>
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <a href="#contact" onClick={() => handlePackageSelect('Business')} className="block w-full text-center py-3 bg-white text-black font-normal text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-100 rounded-lg transform hover:scale-105">
                    Get Started
                  </a>
                </div>
              </div>
                  </div>

            {/* Pro Package */}
            <div className="bg-white border-2 border-gray-200 p-8 lg:p-10 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300 group min-h-[600px] max-h-[600px]">
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl lg:text-3xl font-normal tracking-tight text-black">Pro</h3>
                  <div className="text-4xl lg:text-5xl font-normal text-black mb-2 mt-4">$2500</div>
                  <p className="text-gray-600 text-sm lg:text-base font-normal">Custom full solution</p>
                </div>

                <div className="flex-1 overflow-y-auto">
                <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Custom full solution</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">4-6 week delivery</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">E-commerce functionality</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Custom integrations</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Advanced analytics</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm lg:text-base text-gray-700 font-normal">Priority support</span></li>
                </ul>
                </div>
                
                <div className="mt-auto">
                  <a href="#contact" onClick={() => handlePackageSelect('Pro')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-105">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Support Plans */}
          <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-normal text-black mb-4">Grimo Hosting Monthly Plans</h3>
              <p className="text-gray-600 max-w-2xl mx-auto font-normal">Keep your website running smoothly with our ongoing hosting and support plans.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {hostingData.map((plan, index) => {
                const isOpen = openHosting.includes(index);
                
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => toggleHosting(index)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-normal text-black">{plan.title}</h4>
                          {plan.popular && (
                            <span className="bg-black text-white px-2 py-1 rounded-full text-xs font-normal">POPULAR</span>
                          )}
                        </div>
                        <div className="text-2xl font-normal text-black">
                          {plan.price}<span className="text-sm font-normal text-gray-600">{plan.period}</span>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6">
                        <ul className="space-y-2">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle size={14} className="text-black flex-shrink-0" />
                              <span className="font-normal">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-8">
              <strong>Note:</strong> Domain purchase not included. Project timeline varies by complexity.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:text-blue-700 transition-colors duration-300 text-lg">
              <span>Ready to get started?</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={faqRef} className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-normal tracking-widest mb-6">
              <span>FAQ</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading text-black mb-6 tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto tracking-wide leading-relaxed font-normal">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, index) => {
              const isOpen = openFaq.includes(index);
              
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                  >
                    <h3 className="text-base font-normal text-black pr-4">{faq.question}</h3>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {isOpen && (
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-600 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/whatwebuild-1.webp)',
              filter: 'blur(8px)',
              transform: 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gray-50/60" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-normal tracking-widest mb-6">
              <span>SERVICES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading text-black mb-6 tracking-tight">
              WHAT WE BUILD
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide leading-relaxed font-normal">
              From design to deployment, we create digital experiences that drive business growth and engage your customers.
            </p>
            
            {/* Desktop/Tablet scroll hint */}
            <div className="hidden sm:block text-center mt-4">
              <p className="text-sm text-black font-normal">
                Use arrow buttons to navigate our services
              </p>
            </div>
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
              setApi={setApi}
              aria-label="Services showcase carousel"
            >
              <CarouselContent className="-ml-3 md:-ml-4">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <CarouselItem key={index} className="pl-3 md:pl-4 pt-5 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <div className="bg-white p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-900 h-full rounded-lg">
                        <div className="flex flex-col h-full">
                          <h3 className="text-xl lg:text-2xl font-normal text-black mb-4">{service.title}</h3>
                          <p className="text-gray-700 leading-relaxed text-base lg:text-lg flex-grow font-normal">{service.description}</p>
                          
                          {/* Card number indicator */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-xs font-normal text-black bg-yellow-100 px-2 py-1 rounded-full">
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
              <CarouselPrevious className="hidden lg:flex -left-16 w-12 h-12 bg-black hover:bg-gray-800 hover:text-yellow-200 text-white border-0 shadow-lg" />
              <CarouselNext className="hidden lg:flex -right-16 w-12 h-12 bg-black hover:bg-gray-800 hover:text-yellow-200 text-white border-0 shadow-lg" />
              
              {/* Tablet arrows */}
              <CarouselPrevious className="hidden sm:flex lg:hidden -left-8 w-10 h-10 bg-black hover:bg-gray-800 hover:text-yellow-200 text-white border-0 shadow-md" />
              <CarouselNext className="hidden sm:flex lg:hidden -right-8 w-10 h-10 bg-black hover:bg-gray-800 hover:text-yellow-200 text-white border-0 shadow-md" />
            </Carousel>

            {/* Real-time progress indicator for mobile */}
            <div className="sm:hidden mt-8">
              <div className="text-center text-sm text-gray-600 mb-3">
                <span className="font-normal">Services</span> • <span className="text-black font-normal">{current} of {count}</span>
              </div>
              <div className="flex justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === current - 1
                        ? 'bg-black scale-110' 
                        : 'bg-yellow-200'
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
      <section id="contact" ref={contactRef} className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-3 bg-yellow-100 px-6 py-2 text-black text-sm font-normal tracking-widest mb-8">
              <Mail size={16} />
              <span>CONTACT</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-heading mb-8 tracking-tight">
              READY TO BUILD YOUR
              <span className="block text-gray-300">DIGITAL SOLUTION?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed tracking-wide font-normal">
              Get your free consultation today. We deliver fast, work around your business needs, and provide flexible pricing with premium quality results.
            </p>
            
            {/* Enhanced Contact Form */}
            <div className="max-w-2xl mx-auto mb-12">
              <form ref={formRef} className="space-y-6" aria-label="Contact form" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                    What are you looking for? *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <optgroup label="Standalone Sites">
                      <option value="portfolio">Portfolio Site</option>
                      <option value="event">Event Scheduling Page</option>
                      <option value="mini-business">Mini Business Page</option>
                    </optgroup>
                    <optgroup label="Packages">
                      <option value="starter">Starter Package ($750)</option>
                      <option value="business">Business Package ($1200)</option>
                      <option value="pro">Pro Package ($2500)</option>
                    </optgroup>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hosting"
                    name="hosting"
                    checked={showHostingOptions}
                    onChange={(e) => setShowHostingOptions(e.target.checked)}
                    className="w-4 h-4 text-yellow-200 bg-gray-800 border-gray-600 rounded focus:ring-yellow-200 focus:ring-2"
                  />
                  <label htmlFor="hosting" className="text-sm font-normal text-gray-300">
                    I'm also interested in hosting options
                  </label>
                </div>

                {showHostingOptions && (
                  <div className="overflow-hidden transition-all duration-300 max-h-96 opacity-100">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <label htmlFor="hosting-plan" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                        Hosting Plan Preference
                      </label>
                      <select
                        id="hosting-plan"
                        name="hosting-plan"
                        required={showHostingOptions}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                      >
                        <option value="">Select hosting plan</option>
                        <option value="basic">Basic ($25/month) - Hosting & Upkeep</option>
                        <option value="standard">Standard ($200/month) - Website Changes</option>
                        <option value="premium">Premium ($500/month) - APIs & Infrastructure</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent resize-vertical"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-yellow-100 text-black px-8 py-4 font-normal text-lg tracking-widest uppercase transition-colors duration-300 hover:bg-yellow-200 rounded-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </div>
            
            <div className="flex flex-col items-center space-y-12">
              <div className="flex items-center">
                <CallButton />
              </div>
              
              <p className="text-gray-500 max-w-lg text-sm tracking-widest uppercase font-normal">
                WEBSITES & MOBILE APPS • FAST DELIVERY • FLEXIBLE PRICING • PREMIUM QUALITY
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fef3c7',
            color: '#000000',
            border: '1px solid #000000',
            borderRadius: '8px',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: '400',
          },
        }}
      />
    </main>
  );
}
