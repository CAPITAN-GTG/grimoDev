"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Mail, CheckCircle, Code, Smartphone, Globe, ArrowUpRight, ExternalLink, ChevronDown, Info, Zap, MapPin, TrendingUp } from "lucide-react";
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

export default function Home() {
  // Projects carousel state
  const [projectsApi, setProjectsApi] = useState<CarouselApi>();
  const [projectsCurrent, setProjectsCurrent] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  
  // Dropdown states - arrays to allow multiple open items
  const [openFaq, setOpenFaq] = useState<number[]>([]);
  const [openHosting, setOpenHosting] = useState<number[]>([]);
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
  const highlightRef = useRef<HTMLSpanElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
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



  // Services we offer — benefits-focused for business owners
  const services = [
    { icon: Code, title: "Websites that bring in customers", description: "Fast, mobile-friendly sites built to grow your business and turn visitors into leads." },
    { icon: Zap, title: "Speed & mobile-first", description: "Sites that load quickly and look great on every device—so customers stay and act." },
    { icon: MapPin, title: "Get found on Google", description: "SEO and local visibility included so nearby customers can find you when they search." },
    { icon: TrendingUp, title: "Ongoing support", description: "Hosting and updates handled so you can focus on running your business." },
  ];

  const faqData = [
    {
      question: "How long until my site is live?",
      answer: "Depends on the package: simple one-pagers often 1–2 weeks; multi-page sites 2–4 weeks. We’ll give you a clear timeline before you start."
    },
    {
      question: "What if I’m not happy with the result?",
      answer: "We do revisions until you’re satisfied. You pay 50% to start and the rest only after you approve the finished site—so you’re never locked in before you’re happy."
    },
    {
      question: "What does “SEO included” mean?",
      answer: "We set up your site so Google can find it and show it to people searching for your services. You get basic SEO built in—no extra fees or jargon."
    },
    {
      question: "Can you help with my Google Business listing?",
      answer: "Yes. On Growth and Pro packages we optimize your Google Business Profile so you show up when customers search for you locally."
    },
    {
      question: "Do you host my website?",
      answer: "Yes. Hosting and updates are included in every package so your site stays online, fast, and secure without you managing it."
    },
    {
      question: "How does the 50/50 payment work?",
      answer: "Half upfront starts the project. The other half is due only after you approve the site and we’re ready to launch. No surprises."
    },
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

  const packageOptions = [
    { value: "standalone", label: "Standalone ($250)" },
    { value: "starter", label: "Starter ($500)" },
    { value: "growth", label: "Growth ($1,200) — Most Popular" },
    { value: "pro", label: "Pro ($2,500+)" },
  ];

  const hostingPlanOptions = [
    { value: "Basic - $50/month", label: "Basic ($50/month) - Hosting & upkeep" },
    { value: "Standard - $150/month", label: "Standard ($150/month) - Site updates & content" },
    { value: "Premium - $300/month", label: "Premium ($300/month) - Advanced support" },
    { value: "Elite - $800/month", label: "Elite ($800/month) - Full management & ads" },
  ];

  const getReasonLabel = (value: string) => {
    const option = packageOptions.find((opt) => opt.value === value);
    return option ? option.label : "";
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

  const handlePackageSelect = (reasonValue: string) => {
    setSelectedReason(reasonValue);
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
      business: formData.get('business'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      reason: formData.get('reason'),
      hosting: showHostingOptions,
      hostingPlan: formData.get('hosting-plan'),
      challenge: formData.get('challenge'),
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
        setShowHostingOptions(false);
        setSelectedHostingPlan('');
        setIsServiceDropdownOpen(false);
        setIsHostingDropdownOpen(false);
        setShowHostingInfo(false);
        setOpenFaq([]);
        setOpenHosting([]);
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
              <span id="heading" ref={professionalTitleRef}>Get More Customers</span>{' '}
              <Highlight ref={highlightRef} className="bg-yellow-200 text-black">with a Modern Website</Highlight>
            </h1>
            <p ref={heroDescriptionRef} className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed font-normal tracking-wide px-4 sm:px-6 text-center">
              I build fast, mobile-friendly websites for local businesses that turn visitors into paying clients. SEO, hosting, and maintenance are included—no extra fees.
            </p>
            <div ref={heroButtonRef} className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 px-4">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 font-semibold text-sm sm:text-base tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:text-yellow-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <Mail className="w-5 h-5" />
                Get Your Free Demo
              </a>
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
                         <div className="mb-3 relative z-10">
                           <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-white/70 text-xs sm:text-sm font-normal tracking-wider uppercase border border-white/10 group-hover:bg-white/10 group-hover:text-white/90 group-hover:border-white/30 transition-all duration-300">
                             {project.category}
                           </span>
                         </div>
                         {project.result && (
                           <p className="text-sm text-yellow-200/90 mb-4 relative z-10 font-normal">
                             {project.result}
                           </p>
                         )}
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

      <section id="pricing" ref={pricingRef} className="py-24 bg-white relative overflow-hidden">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide leading-relaxed mb-4 font-normal">
              From a simple one-pager to a full lead-generation site. No hidden fees. 50% to start, 50% after you&apos;re happy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {/* Standalone — $250 */}
            <div className="bg-white border-2 border-gray-200 p-8 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300">
              <h4 className="text-2xl font-normal text-black mb-4">Standalone</h4>
              <div className="text-4xl font-normal text-black mb-6">$250</div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">1-page site, simple functionality</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Mobile-friendly & fast</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Hosting $10/mo (no changes)</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">$50/mo for maintenance & small changes</span></li>
              </ul>
              <a href="#contact" onClick={() => handlePackageSelect('standalone')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-[1.02]">
                Get Your Free Demo
              </a>
            </div>

            {/* Starter — $500 */}
            <div className="bg-white border-2 border-gray-200 p-8 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300">
              <h4 className="text-2xl font-normal text-black mb-4">Starter</h4>
              <div className="text-4xl font-normal text-black mb-6">$500</div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Up to 3 pages</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Mobile-friendly & fast</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">SEO included</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Contact form</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Hosting & updates</span></li>
              </ul>
              <a href="#contact" onClick={() => handlePackageSelect('starter')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-[1.02]">
                Get Your Free Demo
              </a>
            </div>

            {/* Growth — $1,200 (Most Popular) */}
            <div className="bg-black text-white p-8 flex flex-col hover:shadow-2xl transition-all duration-300 relative">
              <div className="inline-flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full mb-4 w-fit">
                <span className="text-black font-normal text-xs">MOST POPULAR</span>
              </div>
              <h4 className="text-2xl font-normal mb-4">Growth</h4>
              <div className="text-4xl font-normal mb-6">$1,200</div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Up to 5 pages</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Mobile-friendly & fast</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">SEO included</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Google Business optimization</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Contact & quote forms</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-yellow-200 flex-shrink-0 mt-1" /><span className="text-sm text-gray-200 font-normal">Hosting & updates</span></li>
              </ul>
              <a href="#contact" onClick={() => handlePackageSelect('growth')} className="block w-full text-center py-3 bg-white text-black font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-100 rounded-lg transform hover:scale-[1.02]">
                Get Your Free Demo
              </a>
            </div>

            {/* Pro — $2,500+ */}
            <div className="bg-white border-2 border-gray-200 p-8 flex flex-col hover:border-black hover:shadow-xl transition-all duration-300">
              <h4 className="text-2xl font-normal text-black mb-4">Pro</h4>
              <div className="text-4xl font-normal text-black mb-6">$2,500+</div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Multi-page site</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Lead generation system</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Mobile-friendly & fast</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">SEO included</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Google Business setup + booking system</span></li>
                <li className="flex items-start gap-3"><CheckCircle size={18} className="text-black flex-shrink-0 mt-1" /><span className="text-sm text-gray-700 font-normal">Hosting & updates</span></li>
              </ul>
              <a href="#contact" onClick={() => handlePackageSelect('pro')} className="block w-full text-center py-3 bg-black text-white font-normal text-sm tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-200 rounded-lg transform hover:scale-[1.02]">
                Schedule Your Free Demo
              </a>
            </div>
          </div>

          <div className="text-center">
            <a href="#contact" className="inline-flex items-center gap-2 bg-yellow-100 text-black px-8 py-4 font-semibold text-base tracking-widest uppercase transition-all duration-300 hover:bg-yellow-200 rounded-lg transform hover:scale-[1.02]">
              <Mail className="w-5 h-5" />
              Schedule Your Free Demo
            </a>
            <p className="text-sm text-gray-500 mt-6">
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
              <span>WHAT YOU GET</span>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto tracking-wide leading-relaxed font-normal">
              Websites built for business growth: fast, mobile-friendly, and easy for customers to find you.
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
              READY TO GET MORE CUSTOMERS?
            </h2>
            
            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed tracking-wide font-normal">
              Get your free demo today. No commitment—just a quick chat about your business and how a better website can help.
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
                    <label htmlFor="business" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                      Business
                    </label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                      placeholder="Your business name"
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
                  <div>
                    <label htmlFor="phone" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="reason" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                    Which package interests you? *
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
                      {packageOptions.map((option) => (
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
                  <label htmlFor="challenge" className="block text-sm font-normal text-gray-300 mb-2 text-left">
                    What&apos;s your biggest website challenge?
                  </label>
                  <input
                    type="text"
                    id="challenge"
                    name="challenge"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent"
                    placeholder="e.g. Not enough leads, slow site, hard to update..."
                  />
                </div>
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
