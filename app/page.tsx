"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Mail, CheckCircle, Code, Smartphone, Zap, Shield, Globe, Layers, Star, Users, Calendar, Briefcase, ArrowUpRight, ExternalLink, ChevronDown, Info, ShoppingCart, Search, MapPin, TrendingUp, Share2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
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
  const [selectedHostingPlan, setSelectedHostingPlan] = useState<string>('');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState<boolean>(false);
  const [isHostingDropdownOpen, setIsHostingDropdownOpen] = useState<boolean>(false);
  const [showHostingInfo, setShowHostingInfo] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Refs for sections
  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLDivElement>(null);
  const professionalTitleRef = useRef<HTMLSpanElement>(null);
  const businessTitleRef = useRef<HTMLSpanElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const clientResultsRef = useRef<HTMLElement>(null);
  const standaloneRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Helper function to split text into characters (SplitText alternative)
  const splitTextIntoChars = (element: HTMLElement) => {
    const text = element.textContent || '';
    element.innerHTML = '';
    const chars = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space for spaces
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });
    return chars;
  };

  // Hero animation on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // SplitText animation for "PROFESSIONAL" and "FOR YOUR BUSINESS"
      if (professionalTitleRef.current) {
        gsap.set(professionalTitleRef.current, { opacity: 1 });
        const chars = splitTextIntoChars(professionalTitleRef.current);
        gsap.from(chars, {
          y: 20,
          autoAlpha: 0,
          stagger: 0.05
        });
      }

      // Animate "ONLINE PRESENCE" highlight component
      if (highlightRef.current) {
        gsap.fromTo(highlightRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.2)",
            delay: 0.4, // Start after some characters of "PROFESSIONAL" have animated
          }
        );
      }

      if (businessTitleRef.current) {
        gsap.set(businessTitleRef.current, { opacity: 1 });
        const chars = splitTextIntoChars(businessTitleRef.current);
        gsap.from(chars, {
          y: 20,
          autoAlpha: 0,
          stagger: 0.05,
          delay: 0.6, // Start after highlight animation
        });
      }

      // Animate hero description
      if (heroDescriptionRef.current) {
        gsap.fromTo(heroDescriptionRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.8,
          }
        );
      }

      // Animate hero button and tagline
      if (heroButtonRef.current) {
        const children = Array.from(heroButtonRef.current.children);
        gsap.fromTo(children,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 1.4,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // GSAP ScrollTrigger animations with improved performance
  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

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
          // Animate carousel container
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

          // Animate project cards with stagger for cool effect
          const projectCards = carousel.querySelectorAll('.project-card');
          if (projectCards.length > 0) {
            gsap.fromTo(
              projectCards,
              {
                opacity: 0,
                y: 100,
                scale: 0.85,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: {
                  amount: 0.6,
                  from: "start"
                },
                scrollTrigger: {
                  trigger: carousel,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
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
        const serviceItems = section.querySelectorAll('[class*="grid"] > *');

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

        if (serviceItems.length > 0) {
          gsap.fromTo(
            serviceItems,
            { opacity: 0, y: 40, x: -20 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: serviceItems[0],
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
      description: "Professional and modern designs that look stunning across all devices. We create responsive websites that provide an exceptional user experience on desktop, tablet, and mobile, ensuring your brand stands out with clean, contemporary aesthetics.",
      icon: Globe,
      image: "/modern-website.webp"
    },
    {
      project: "E-commerce Success",
      metric: "Custom Solutions",
      description: "Turn visitors into customers with smart e-commerce features. We make online selling simple and profitable.",
      icon: ShoppingCart,
      image: "/e-commerce.webp"
    },
    {
      project: "Streamlined Operations",
      metric: "Booking Systems",
      description: "Stop juggling phone calls and emails. Let customers book appointments online 24/7 while you focus on growing your business.",
      icon: Calendar,
      image: "/booking.webp"
    }
  ];

  // Services we offer
  const services = [
    { icon: Code, title: "Web Development", description: "Custom websites that grow your business" },
    { icon: Smartphone, title: "Mobile Apps", description: "Native and cross-platform applications" },
    { icon: Search, title: "SEO Optimization", description: "Rank higher on Google and get found first" },
    { icon: MapPin, title: "GEO Optimization", description: "Appear in local searches and nearby results" },
    { icon: TrendingUp, title: "AIO Optimization", description: "Complete optimization across all platforms" },
    { icon: Share2, title: "Social Media Management", description: "Grow your brand and engage customers" },
  ];

  const faqData = [
    {
      question: "How long will my site or app take?",
      answer: "Timeline depends on your package: Standalone sites (1-2 weeks), Starter apps (2-3 weeks), Business apps (3-4 weeks), Enterprise (custom timeline). We always deliver on time."
    },
    {
      question: "What if I don't like the result?",
      answer: "We offer unlimited revisions until you're completely satisfied. Our 50/50 payment structure means you only pay the final 50% after you approve the completed project."
    },
    {
      question: "What is SEO optimization?",
      answer: "SEO (Search Engine Optimization) helps your website rank higher on Google. We optimize your content, keywords, and technical elements so customers find you first when searching for your services."
    },
    {
      question: "What is GEO optimization?",
      answer: "GEO optimization ensures your business appears in local search results. We optimize your Google Business Profile, local citations, and location-based content to help nearby customers find you."
    },
    {
      question: "What is AIO optimization?",
      answer: "AIO (All-In-One) optimization is our comprehensive service that combines SEO, GEO, social media, and Google Business optimization. We handle everything so you can focus on your business."
    },
    {
      question: "How does social media management work?",
      answer: "We create and schedule posts, engage with your audience, and grow your following. Regular reporting shows you what's working. Perfect for businesses that want an online presence without the daily work."
    },
    {
      question: "Can you help improve my Google Business listing?",
      answer: "Yes! We optimize your Google Business Profile with accurate info, photos, posts, and reviews. This helps you appear in 'near me' searches and get more customers through your door."
    },
    {
      question: "Do you provide hosting?",
      answer: "Yes! We offer hosting options or work with your preferred provider. We handle setup and maintenance so your site stays online and secure."
    },
    {
      question: "What's included in the 50/50 payment?",
      answer: "50% deposit starts your project. The remaining 50% is due after you approve and before launch. This ensures you're happy with the result before final payment."
    }
  ];

  const hostingData = [
    {
      title: "Basic",
      price: "$50",
      period: "/month",
      features: ["Grimo Hosting", "Security updates", "Basic maintenance", "Email support"]
    },
    {
      title: "Standard",
      price: "$150",
      period: "/month",
      features: ["Everything in Basic", "Website changes upon request", "Content updates", "Performance monitoring", "Priority support"],
      popular: true
    },
    {
      title: "Premium",
      price: "$300",
      period: "/month",
      features: ["Everything in Standard", "Advanced analytics", "Infrastructure updates", "Latest technology", "Dedicated support"]
    },
    {
      title: "Elite",
      price: "$800",
      period: "/month",
      features: ["Everything in Premium", "Full-service management", "Strategy & consulting", "Priority response", "Custom solutions"]
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

  const reasonGroups = [
    {
      label: "Standalone Sites ($250)",
      options: [
        { value: "portfolio", label: "Portfolio Site" },
        { value: "event", label: "Event Scheduling Page" },
        { value: "mini-business", label: "Mini Business Page" },
      ],
    },
    {
      label: "Business Apps",
      options: [
        { value: "business-app-starter", label: "Starter ($750)" },
        { value: "business-app-business", label: "Business ($1,500)" },
        { value: "business-app-enterprise", label: "Enterprise (Custom)" },
      ],
    },
    {
      label: "Online Presence",
      options: [
        { value: "online-presence-starter", label: "Starter ($299/month)" },
        { value: "online-presence-business", label: "Business ($799/month)" },
        { value: "online-presence-enterprise", label: "Enterprise (Custom/month)" },
      ],
    },
  ];

  const hostingPlanOptions = [
    { value: "Basic - $50/month", label: "Basic ($50/month) - Hosting & upkeep" },
    { value: "Standard - $150/month", label: "Standard ($150/month) - Site updates & content" },
    { value: "Premium - $300/month", label: "Premium ($300/month) - Advanced support" },
    { value: "Elite - $800/month", label: "Elite ($800/month) - Full management & ads" },
  ];

  const getReasonLabel = (value: string) => {
    for (const group of reasonGroups) {
      const option = group.options.find((opt) => opt.value === value);
      if (option) {
        return option.label;
      }
    }
    return "";
  };

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

    let reasonValue = packageName.toLowerCase();

    switch (packageName) {
      case 'Business App - Starter':
        reasonValue = 'business-app-starter';
        break;
      case 'Business App - Business':
        reasonValue = 'business-app-business';
        break;
      case 'Business App - Enterprise':
        reasonValue = 'business-app-enterprise';
        break;
      case 'Online Presence - Starter':
        reasonValue = 'online-presence-starter';
        break;
      case 'Online Presence - Business':
        reasonValue = 'online-presence-business';
        break;
      case 'Online Presence - Enterprise':
        reasonValue = 'online-presence-enterprise';
        break;
      default:
        break;
    }

    setSelectedReason(reasonValue);
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

    // Dismiss any existing toasts
    toast.dismiss();

    if (!selectedReason) {
      toast.error('Please select what you are looking for.', {
        style: {
          background: '#fef3c7',
          color: '#000000',
          border: '1px solid #000000',
          borderRadius: '8px',
          fontFamily: 'Outfit, sans-serif',
        },
      });
      return;
    }

    if (showHostingOptions && !selectedHostingPlan) {
      toast.error('Please select a hosting plan since you\'re interested in hosting options.', {
        style: {
          background: '#fef3c7',
          color: '#000000',
          border: '1px solid #000000',
          borderRadius: '8px',
          fontFamily: 'Outfit, sans-serif',
        },
      });
      return;
    }

    setIsSubmitting(true);

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
        setSelectedHostingPlan('');
        setIsServiceDropdownOpen(false);
        setIsHostingDropdownOpen(false);
        setShowHostingInfo(false);
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
          transition-all duration-300 ease-in-out
          hover-lift
          focus-ring
          ${variant === 'primary' 
            ? 'bg-black text-white hover:bg-gray-800 hover:text-yellow-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
            : 'bg-white border-2 border-black text-black hover:bg-black hover:text-yellow-200 transform hover:scale-[1.02]'
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
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'url(/pattern.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
        />
        <HeroHighlight className="py-12 sm:py-16 md:py-20 lg:py-24 z-10 w-full">
          <div> 
            <h1 ref={heroTitleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading mb-4 sm:mb-6 md:mb-8 text-center text-black leading-tight px-4">
              <span id="heading" ref={professionalTitleRef}>PROFESSIONAL</span>{' '}
              <Highlight ref={highlightRef} className="bg-yellow-200 text-black">ONLINE PRESENCE</Highlight>{' '}
              <br className="hidden md:block" />
              <span id="heading2" ref={businessTitleRef}>FOR YOUR BUSINESS</span>
            </h1>
            <p ref={heroDescriptionRef} className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed font-normal tracking-wide px-4 sm:px-6 text-center">
              We build websites, mobile apps, and optimize your online presence. SEO, GEO, AIO, social media, and Google Business management. From small businesses to large corporations.
            </p>
            <div ref={heroButtonRef} className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 px-4">
              <div className="flex items-center justify-center w-full max-w-md sm:max-w-lg mx-auto">
                <CallButton className="w-full sm:w-auto" />
              </div>
              <p className="text-gray-500 max-w-md text-xs sm:text-sm tracking-wider uppercase font-semibold text-center px-2">
                50% TO START • 50% AFTER SATISFACTION • FAST RESPONSE TIME
              </p>
            </div>
          </div>
        </HeroHighlight>
       </section>

       {/* Our Projects Section */}
       <section id="projects" ref={projectsSectionRef} className="py-20 md:py-24 bg-black text-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-3 border border-white/20 px-5 sm:px-6 py-1.5 sm:py-2 text-white/70 text-xs sm:text-sm font-normal tracking-widest mb-5 sm:mb-6 backdrop-blur-sm">
              <span>OUR PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-4 sm:mb-6 tracking-tight">
              RECENT WORK
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto tracking-wide leading-relaxed font-normal px-4">
              Explore some of our latest projects. From construction companies to e-commerce platforms, we deliver results that drive business growth.
            </p>
          </div>

           <div className="relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-24">
             <Carousel
               opts={{
                 align: "start",
                 loop: true,
               }}
               className="w-full"
               setApi={setProjectsApi}
              aria-label="Projects showcase carousel"
             >
               <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
                 {projects.map((project, index) => (
                   <CarouselItem key={project.id} className="pl-2 sm:pl-3 md:pl-4 pt-5 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 project-card-item">
                     <div className="relative overflow-hidden h-full group project-card">
                       {/* Sharp Background */}
                       <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300"></div>
                       
                       {/* Sharp Hover Accent */}
                       <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/0 to-yellow-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       
                       {/* Content */}
                       <div className="relative p-6 sm:p-8 text-center h-full flex flex-col z-10">
                         {/* Logo */}
                         <div className="flex justify-center mb-5 sm:mb-6">
                           <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative">
                             {project.image ? (
                               <Image
                                 src={project.image}
                                 alt={`${project.name} logo`}
                                 width={112}
                                 height={112}
                                 className="w-full h-full object-contain relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                               />
                             ) : (
                                 <Globe className="w-12 h-12 sm:w-14 sm:h-14 text-white/80 group-hover:text-white transition-colors duration-300 relative z-10" />
                               )}
                           </div>
                         </div>
                           
                         {/* Project Name */}
                         <h3 className="text-xl sm:text-2xl font-heading font-medium text-white mb-3 sm:mb-4 tracking-tight relative z-10">
                           {project.name}
                         </h3>
                             
                         {/* Category Badge - Sharp */}
                         <div className="mb-6 sm:mb-8 relative z-10">
                           <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-white/70 text-xs sm:text-sm font-normal tracking-wider uppercase border border-white/10 group-hover:bg-white/10 group-hover:text-white/90 group-hover:border-white/30 transition-all duration-300">
                             {project.category}
                           </span>
                         </div>
                       
                         {/* Visit Site Button - Sharp Design */}
                         <div className="mt-auto relative z-10">
                           <a
                             href={project.url}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 font-normal text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-yellow-200 hover:translate-y-[-2px]"
                           >
                             <span>Visit Site</span>
                             <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                           </a>
                         </div>
                       </div>
                     </div>
                   </CarouselItem>
                 ))}
               </CarouselContent>
               
               {/* Desktop Navigation Arrows - Much More Spacing, Sharp Design */}
               <CarouselPrevious className="hidden lg:flex -left-12 xl:-left-16 2xl:-left-20 w-12 h-12 xl:w-14 xl:h-14 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-yellow-200 text-white border border-white/10 hover:border-white/30 transition-all duration-300 !rounded-none" />
               <CarouselNext className="hidden lg:flex -right-12 xl:-right-16 2xl:-right-20 w-12 h-12 xl:w-14 xl:h-14 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-yellow-200 text-white border border-white/10 hover:border-white/30 transition-all duration-300 !rounded-none" />
               
               {/* Tablet Navigation Arrows - Sharp Design */}
               <CarouselPrevious className="hidden sm:flex lg:hidden -left-6 md:-left-8 w-10 h-10 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-yellow-200 text-white border border-white/10 hover:border-white/30 transition-all duration-300 !rounded-none" />
               <CarouselNext className="hidden sm:flex lg:hidden -right-6 md:-right-8 w-10 h-10 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-yellow-200 text-white border border-white/10 hover:border-white/30 transition-all duration-300 !rounded-none" />
             </Carousel>

             {/* Mobile Progress Indicator */}
             <div className="sm:hidden mt-8">
               <div className="flex justify-center gap-1.5 mb-3">
                 {Array.from({ length: projectsCount }).map((_, index) => (
                   <div 
                     key={index} 
                     className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                       index === projectsCurrent - 1
                         ? 'bg-white w-4' 
                         : 'bg-white/30'
                     }`}
                   ></div>
                 ))}
               </div>
               <div className="text-center text-xs text-white/50 font-normal">
                 {projectsCurrent} / {projectsCount}
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Client Results Section */}
       <section id="client-results" ref={clientResultsRef} className="py-24 bg-white relative overflow-hidden">
         {/* Pattern Background */}
         <div 
           className="absolute inset-0 z-0 opacity-5"
           style={{
             backgroundImage: 'url(/pattern3.jpg)',
             backgroundRepeat: 'repeat',
             backgroundSize: 'auto',
           }}
         />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                 <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                   {/* Image Section */}
                   <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                     <Image
                       src={result.image || ""}
                       alt={result.metric}
                       fill
                       className="object-cover"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                     <div className="absolute top-4 right-4 inline-flex items-center justify-center w-12 h-12 bg-black rounded-full">
                       <result.icon className="w-6 h-6 text-white" />
                     </div>
                   </div>
                   {/* Content Section */}
                   <div className="p-6">
                     <h3 className="text-2xl font-normal text-black mb-2">{result.metric}</h3>
                     <p className="text-gray-700 font-normal mb-3 text-sm">{result.project}</p>
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
                     className="w-full p-6 text-left hover:bg-gray-50 transition-all duration-300 ease-in-out flex items-center justify-between"
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
                     <div className="flex items-center gap-1 text-sm font-normal text-black bg-yellow-100 px-2 py-1 rounded-full transition-all duration-300 ease-in-out hover:bg-yellow-200">
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
             <a href="#contact" onClick={() => handleStandaloneSelect('standalone')} className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-normal text-sm sm:text-lg tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-105">
               <span className="hidden sm:inline">Build My Standalone Site</span>
               <span className="sm:hidden">Build Site</span>
               <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
             </a>
           </div>
         </div>
       </section>
      <section id="pricing" ref={pricingRef} className="py-24 bg-white relative overflow-hidden">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: 'url(/pattern3.jpg)',
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-black px-6 py-2 text-white text-sm font-normal tracking-widest mb-6">
              <span>PRICING</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading text-black mb-6 tracking-tight">
              SIMPLE, TRANSPARENT PRICING
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto tracking-wide leading-relaxed mb-4 font-normal">
              Three service categories. Choose what fits your needs. 50% to start, 50% after satisfaction.
            </p>
          </div>

          {/* Business Apps Pricing */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-heading text-black mb-4">Business Apps</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Mobile & web applications for businesses</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white border-2 border-gray-200 p-8 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300">
                <h4 className="text-2xl font-normal text-black mb-4">Starter</h4>
                <div className="text-4xl font-normal text-black mb-6">$750</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Simple web app</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">2-3 weeks delivery</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Mobile responsive</span></li>
                </ul>
                <a href="#contact" onClick={() => handlePackageSelect('Business App - Starter')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-[1.02]">
                  Get Started
                </a>
              </div>

              <div className="bg-black text-white p-8 flex flex-col hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full mb-4 w-fit">
                  <span className="text-black font-normal text-xs">POPULAR</span>
                </div>
                <h4 className="text-2xl font-normal mb-4">Business</h4>
                <div className="text-4xl font-normal mb-6">$1,500</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Full-featured app</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">3-4 weeks delivery</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Custom features</span></li>
                </ul>
                <a href="#contact" onClick={() => handlePackageSelect('Business App - Business')} className="block w-full text-center py-3 bg-white text-black font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-100 rounded-lg transform hover:scale-[1.02]">
                  Get Started
                </a>
              </div>

              <div className="bg-white border-2 border-gray-200 p-8 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300">
                <h4 className="text-2xl font-normal text-black mb-4">Enterprise</h4>
                <div className="text-4xl font-normal text-black mb-6">Custom</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Complex solutions</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Scalable architecture</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Ongoing support</span></li>
                </ul>
                <a href="#contact" onClick={() => handlePackageSelect('Business App - Enterprise')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-[1.02]">
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          {/* Online Presence Pricing */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-heading text-black mb-4">Online Presence</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">SEO, GEO, AIO, Social Media & Google Business</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white border-2 border-gray-200 p-8 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300">
                <h4 className="text-2xl font-normal text-black mb-4">Starter</h4>
                <div className="text-4xl font-normal text-black mb-2">$299</div>
                <div className="text-sm text-gray-600 mb-6">/month</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Basic SEO setup</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Google Business optimization</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Monthly reports</span></li>
                </ul>
                <a href="#contact" onClick={() => handlePackageSelect('Online Presence - Starter')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-[1.02]">
                  Get Started
                </a>
              </div>

              <div className="bg-black text-white p-8 flex flex-col hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full mb-4 w-fit">
                  <span className="text-black font-normal text-xs">POPULAR</span>
                </div>
                <h4 className="text-2xl font-normal mb-4">Business</h4>
                <div className="text-4xl font-normal mb-2">$799</div>
                <div className="text-sm text-gray-300 mb-6">/month</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Advanced SEO & GEO</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Social media management</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Content creation</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Weekly optimization</span></li>
                </ul>
                <a href="#contact" onClick={() => handlePackageSelect('Online Presence - Business')} className="block w-full text-center py-3 bg-white text-black font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-100 rounded-lg transform hover:scale-[1.02]">
                  Get Started
                </a>
              </div>

              <div className="bg-white border-2 border-gray-200 p-8 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300">
                <h4 className="text-2xl font-normal text-black mb-4">Enterprise</h4>
                <div className="text-4xl font-normal text-black mb-2">Custom</div>
                <div className="text-sm text-gray-600 mb-6">/month</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Full AIO optimization</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Dedicated account manager</span></li>
                  <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Multi-platform management</span></li>
                </ul>
                <a href="#contact" onClick={() => handlePackageSelect('Online Presence - Enterprise')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-[1.02]">
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">
              Standalone sites start at <strong>$250</strong> - See <a href="#standalone" className="text-black underline hover:text-gray-600">Standalone section</a> for details.
            </p>
            <p className="text-sm text-gray-500">
              50% deposit to start • 50% after satisfaction • All prices subject to project scope
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={faqRef} className="py-16 bg-black text-white relative overflow-hidden">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'url(/pattern8.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 border border-white/30 px-6 py-2 text-white text-sm font-normal tracking-widest mb-6 backdrop-blur-sm">
              <span>FAQ</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading text-white mb-6 tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto tracking-wide leading-relaxed font-normal">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, index) => {
              const isOpen = openFaq.includes(index);
              
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left hover:bg-white/10 transition-all duration-300 ease-in-out flex items-center justify-between"
                  >
                    <h3 className="text-base font-normal text-white pr-4">{faq.question}</h3>
                    <ChevronDown 
                      className={`w-4 h-4 text-white/70 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`} 
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{
                      transitionProperty: 'max-height, opacity',
                    }}
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-white/80 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-16 md:py-20 relative overflow-hidden">
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
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center space-x-3 border border-white/30 px-6 py-2 text-white text-sm font-normal tracking-widest mb-4 backdrop-blur-sm">
              <span>WHAT WE DO</span>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto tracking-wide leading-relaxed font-normal">
              Professional online presence solutions. Websites, mobile apps, SEO, GEO, and AIO optimization.
            </p>
          </div>

          {/* Services List - 2 columns on desktop/tablet, 1 column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <div key={index} className="flex items-start gap-3 md:gap-4 border-b border-white/20 pb-4 md:pb-5">
                  <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-heading text-white font-normal mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-black text-white relative overflow-hidden">
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: 'url(/pattern9.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
                
                <div className="relative">
                  <label htmlFor="reason" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                    What are you looking for? *
                  </label>
                  <input type="hidden" id="reason" name="reason" value={selectedReason} />
                  <button
                    type="button"
                    onClick={() => setIsServiceDropdownOpen((prev) => !prev)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                  >
                    <span className="text-sm text-gray-200">
                      {selectedReason ? getReasonLabel(selectedReason) : 'Select an option'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${
                        isServiceDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`absolute left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden transform origin-top transition-all duration-200 z-50 ${
                      isServiceDropdownOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="max-h-64 overflow-y-auto py-2">
                      {reasonGroups.map((group, groupIndex) => (
                        <div
                          key={group.label}
                          className={`px-4 pb-2 ${groupIndex !== 0 ? 'border-t border-gray-800 pt-2' : ''}`}
                        >
                          <div className="text-xs uppercase tracking-widest text-gray-400 mb-1 text-left">
                            {group.label}
                          </div>
                          {group.options.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setSelectedReason(option.value);
                                setIsServiceDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                                selectedReason === option.value
                                  ? 'bg-yellow-100 text-black'
                                  : 'text-gray-200 hover:bg-gray-800'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hosting"
                    name="hosting"
                    checked={showHostingOptions}
                    onChange={(e) => {
                      setShowHostingOptions(e.target.checked);
                      if (!e.target.checked) {
                        setSelectedHostingPlan('');
                        setIsHostingDropdownOpen(false);
                      }
                    }}
                    className="w-4 h-4 text-yellow-200 bg-gray-800 border-gray-600 rounded focus:ring-yellow-200 focus:ring-2"
                  />
                  <label htmlFor="hosting" className="text-sm font-normal text-gray-300">
                    I'm also interested in hosting options
                  </label>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowHostingInfo(true)}
                    onMouseLeave={() => setShowHostingInfo(false)}
                  >
                    <div
                      className="p-1 rounded-full text-gray-400 hover:text-yellow-200 hover:bg-gray-800 transition-colors duration-200 cursor-default"
                      aria-label="More info about hosting"
                    >
                      <Info className="w-4 h-4" />
                    </div>
                    {showHostingInfo && (
                      <div className="absolute left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-left text-xs text-gray-200 z-50">
                        <p>
                          Higher hosting tiers can include ongoing Facebook or Google ads
                          at a steady monthly pace. For full details and options, contact us.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {showHostingOptions && (
                  <div className="transition-all duration-300 max-h-96 opacity-100">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <label htmlFor="hosting-plan" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                        Hosting Plan Preference
                      </label>
                      <input type="hidden" id="hosting-plan" name="hosting-plan" value={selectedHostingPlan} />
                      <button
                        type="button"
                        onClick={() => setIsHostingDropdownOpen((prev) => !prev)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                      >
                        <span className="text-sm text-gray-200">
                          {selectedHostingPlan || 'Select hosting plan'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${
                            isHostingDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`relative mt-2 transform origin-top transition-all duration-200 ${
                          isHostingDropdownOpen
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                        }`}
                      >
                        <div className="absolute left-0 right-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-64 overflow-y-auto py-2 z-[70]">
                          {hostingPlanOptions.map((option, index) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setSelectedHostingPlan(option.value);
                                setIsHostingDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm border-t border-gray-700 ${
                                index === 0 ? 'border-t-0' : ''
                              } ${
                                selectedHostingPlan === option.value
                                  ? 'bg-yellow-100 text-black'
                                  : 'text-gray-200 hover:bg-gray-800'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
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
                    className="inline-flex items-center gap-2 bg-yellow-100 text-black px-8 py-4 font-normal text-lg tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-yellow-200 rounded-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                WEBSITES • MOBILE APPS • SEO • GEO • AIO • SOCIAL MEDIA • GOOGLE BUSINESS • FAST DELIVERY
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
