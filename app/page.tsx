"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Mail, CheckCircle, Globe, ExternalLink, Megaphone, Share2, Tv, Users } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialIconClass = "h-7 w-7 shrink-0";

function SocialIconWrap({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span role="img" aria-label={label} title={label} className={`inline-flex ${className ?? ""}`}>
      {children}
    </span>
  );
}

function IconFacebook() {
  return (
    <svg className={socialIconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 5.989 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg className={socialIconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg className={socialIconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.5 3v12.5a3.5 3.5 0 1 1-3.5-3.5V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14.5 3c1.2 1.8 3.2 3 5.5 3v4a8 8 0 0 1-5.5-2.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg className={socialIconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Home() {
  const [projectsApi, setProjectsApi] = useState<CarouselApi>();
  const [projectsCurrent, setProjectsCurrent] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLDivElement>(null);
  const professionalTitleRef = useRef<HTMLSpanElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const offeringsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const splitTextIntoChars = (element: HTMLElement) => {
    const text = element.textContent || "";
    element.innerHTML = "";
    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      element.appendChild(span);
      return span;
    });
    return chars;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (professionalTitleRef.current) {
        gsap.set(professionalTitleRef.current, { opacity: 1 });
        const chars = splitTextIntoChars(professionalTitleRef.current);
        gsap.from(chars, {
          y: 20,
          autoAlpha: 0,
          stagger: 0.05,
        });
      }

      if (highlightRef.current) {
        gsap.fromTo(
          highlightRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.2)",
            delay: 0.4,
          }
        );
      }

      if (heroDescriptionRef.current) {
        gsap.fromTo(
          heroDescriptionRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
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

      if (heroButtonRef.current) {
        const children = Array.from(heroButtonRef.current.children);
        gsap.fromTo(
          children,
          { opacity: 0, y: 30, scale: 0.9 },
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      if (projectsSectionRef.current) {
        const section = projectsSectionRef.current;
        const badge = section.querySelector('[class*="inline-flex"]');
        const heading = section.querySelector("h2");
        const description = section.querySelector("p");
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

          const projectCards = carousel.querySelectorAll(".project-card");
          if (projectCards.length > 0) {
            gsap.fromTo(
              projectCards,
              { opacity: 0, y: 100, scale: 0.85 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: { amount: 0.6, from: "start" },
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

      if (offeringsRef.current) {
        const bands = offeringsRef.current.querySelectorAll("[data-service-band]");
        if (bands.length > 0) {
          gsap.fromTo(
            bands,
            { opacity: 0, y: 72 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: bands[0],
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      if (contactRef.current) {
        const section = contactRef.current;
        const badge = section.querySelector('[class*="inline-flex"]');
        const heading = section.querySelector("h2");
        const description = section.querySelector("p");
        const form = section.querySelector("form");

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

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!projectsApi) return;
    setProjectsCount(projectsApi.scrollSnapList().length);
    setProjectsCurrent(projectsApi.selectedScrollSnap() + 1);
    projectsApi.on("select", () => {
      setProjectsCurrent(projectsApi.selectedScrollSnap() + 1);
    });
  }, [projectsApi]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      business: formData.get("business"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      details: formData.get("details"),
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent. We will get back to you soon.", {
          style: {
            background: "#fef3c7",
            color: "#000000",
            border: "1px solid #000000",
            borderRadius: "8px",
            fontFamily: "Outfit, sans-serif",
          },
        });
        formRef.current?.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send. Please try again.", {
        style: {
          background: "#fef3c7",
          color: "#000000",
          border: "1px solid #000000",
          borderRadius: "8px",
          fontFamily: "Outfit, sans-serif",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "url(/pattern.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        <HeroHighlight className="py-12 sm:py-16 md:py-20 lg:py-24 z-10 w-full">
          <div>
            <h1
              ref={heroTitleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading mb-4 sm:mb-6 md:mb-8 text-center text-black leading-tight px-4"
            >
              <div className="flex flex-col items-center justify-center">
                <span id="heading" ref={professionalTitleRef}>
                  Websites, Ads & Social
                </span>{" "}
                <Highlight ref={highlightRef} className="bg-yellow-200 text-black">
                  in one place
                </Highlight>
              </div>
            </h1>
            <p
              ref={heroDescriptionRef}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed font-normal tracking-wide px-4 sm:px-6 text-center"
            >
              Bold builds and ongoing growth: custom sites, Meta and Google campaigns, and
              social content on a schedule that fits your budget.
            </p>
            <div
              ref={heroButtonRef}
              className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 px-4"
            >
              <a
                href="#websites"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 font-semibold text-sm sm:text-base tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:text-yellow-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                View services
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-black text-black px-8 py-4 font-semibold text-sm sm:text-base tracking-widest uppercase transition-all duration-300 hover:bg-black hover:text-yellow-200"
              >
                <Mail className="w-5 h-5" />
                Reach out
              </a>
            </div>
          </div>
        </HeroHighlight>
      </section>

      <section ref={offeringsRef} className="relative" aria-label="Services and pricing">
        {/* Websites — ink + lime */}
        <div
          id="websites"
          data-service-band
          className="relative py-20 md:py-28 px-4 sm:px-8 bg-zinc-950 text-white overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 border-[3px] border-lime-300/30 rotate-12 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-10 h-10 md:w-12 md:h-12 text-lime-300 shrink-0" strokeWidth={1.25} />
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight uppercase">
                Websites
              </h2>
            </div>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 font-normal leading-relaxed">
              Custom sites engineered for speed, clarity, and leads. Pick the scope that matches
              where you are today.
            </p>
            <ul className="space-y-6 md:space-y-8">
              <li className="flex gap-4 border-l-4 border-lime-300 pl-5 py-1">
                <CheckCircle className="w-6 h-6 text-lime-300 shrink-0 mt-0.5" />
                <div>
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight text-lime-300">
                    $500 – $1,000
                  </p>
                  <p className="text-zinc-300 mt-1">Focused brochure or starter multi-page site.</p>
                </div>
              </li>
              <li className="flex gap-4 border-l-4 border-lime-300 pl-5 py-1">
                <CheckCircle className="w-6 h-6 text-lime-300 shrink-0 mt-0.5" />
                <div>
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight text-lime-300">
                    $1,200 – $2,500
                  </p>
                  <p className="text-zinc-300 mt-1">Full business site: more pages, forms, and polish.</p>
                </div>
              </li>
              <li className="flex gap-4 border-l-4 border-lime-300 pl-5 py-1">
                <CheckCircle className="w-6 h-6 text-lime-300 shrink-0 mt-0.5" />
                <div>
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight text-lime-300">
                    $3,000+
                  </p>
                  <p className="text-zinc-300 mt-1">
                    This tier is for <span className="text-zinc-100 font-medium">CRM-led sites</span>
                    —leads, pipelines, and integrations tied to your CRM—plus room for complex builds or
                    ecommerce-scale scope when needed.
                  </p>
                </div>
              </li>
            </ul>
            <a
              href="#contact"
              className="inline-flex mt-12 items-center gap-2 bg-lime-300 text-black px-8 py-4 font-semibold text-sm tracking-widest uppercase hover:bg-lime-200 transition-colors"
            >
              Discuss a website
            </a>
          </div>
        </div>

        {/* Ads — electric blue */}
        <div
          id="ads"
          data-service-band
          className="relative py-20 md:py-28 px-4 sm:px-8 bg-[#1d4ed8] text-white overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-48 h-48 border-4 border-white/20 -rotate-6 -translate-x-1/4 translate-y-1/4 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Megaphone className="w-10 h-10 md:w-12 md:h-12 text-white shrink-0" strokeWidth={1.25} />
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight uppercase">
                Ads
              </h2>
            </div>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-4 font-normal">
              Meta & Google: structured campaigns, clear reporting, and room for optional
              month-to-month care.
            </p>
            <p className="text-sm uppercase tracking-widest text-blue-200/90 mb-10">Meta / Google</p>
            <ul className="space-y-6 md:space-y-8">
              <li className="flex gap-4 bg-black/20 border border-white/25 px-5 py-5 md:px-6 md:py-6">
                <CheckCircle className="w-6 h-6 text-white shrink-0 mt-0.5" />
                <div>
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight">$300 set-up</p>
                  <p className="text-blue-100 mt-1">Account structure, creatives handoff, and launch checklist.</p>
                </div>
              </li>
              <li className="flex gap-4 bg-black/20 border border-white/25 px-5 py-5 md:px-6 md:py-6">
                <CheckCircle className="w-6 h-6 text-white shrink-0 mt-0.5" />
                <div>
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight">
                    $25 – $150<span className="text-lg font-normal">/mo</span> maintenance
                  </p>
                  <p className="text-blue-100 mt-1">Optional: tweaks, monitoring, and marketing guidance.</p>
                </div>
              </li>
            </ul>
            <a
              href="#contact"
              className="inline-flex mt-12 items-center gap-2 bg-white text-[#1d4ed8] px-8 py-4 font-semibold text-sm tracking-widest uppercase hover:bg-blue-50 transition-colors"
            >
              Talk ads
            </a>
          </div>
        </div>

        {/* Social — high-contrast light */}
        <div
          id="social"
          data-service-band
          className="relative py-20 md:py-28 px-4 sm:px-8 bg-neutral-100 text-black overflow-hidden border-y-4 border-black"
        >
          <div className="absolute top-8 left-8 text-[10rem] md:text-[14rem] font-heading leading-none text-black/[0.04] select-none pointer-events-none">
            @
          </div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
              <div className="flex items-center gap-3">
                <Share2 className="w-10 h-10 md:w-12 md:h-12 shrink-0" strokeWidth={1.25} />
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading tracking-tight uppercase">
                  Social
                </h2>
              </div>
              <p className="text-sm uppercase tracking-widest text-neutral-500 md:text-right md:max-w-xs">
                Retainers $150–$750/mo
              </p>
            </div>

            <p className="text-lg md:text-xl text-neutral-800 max-w-3xl mb-8 md:mb-10 leading-relaxed">
              You get <span className="text-black font-medium">content made for your brand</span> and{' '}
              <span className="text-black font-medium">published on your accounts</span> on a steady
              rhythm. Two things set the price: how often we post, and how many platforms we keep
              active for you.
            </p>

            <h3 className="font-heading text-2xl md:text-3xl mb-6 tracking-tight">Plans at a glance</h3>
            <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1.1fr)] gap-0 border-2 border-b-0 border-black bg-neutral-200 px-6 py-3 text-xs font-medium uppercase tracking-widest text-neutral-700">
              <div>Plan</div>
              <div>Posts</div>
              <div>Platforms</div>
              <div>Creative</div>
            </div>
            <div className="space-y-0 lg:space-y-0">
              <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1.1fr)] gap-4 lg:gap-0 lg:divide-x-2 lg:divide-black border-2 border-black bg-white p-5 lg:p-6">
                <div className="lg:pr-6">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Starter</p>
                  <p className="text-xl lg:text-2xl font-semibold">$150/mo</p>
                </div>
                <div className="lg:px-6 border-t-2 lg:border-t-0 border-black pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1 lg:hidden">Posts</p>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-heading text-5xl sm:text-6xl leading-none tabular-nums">2–3</span>
                    <span className="text-neutral-600 text-sm">posts / week</span>
                  </div>
                </div>
                <div className="lg:px-6 border-t-2 lg:border-t-0 border-black pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 lg:hidden">Platforms</p>
                  <div className="flex flex-wrap items-center gap-3 text-neutral-900" aria-label="Facebook and Instagram">
                    <SocialIconWrap label="Facebook">
                      <IconFacebook />
                    </SocialIconWrap>
                    <SocialIconWrap label="Instagram">
                      <IconInstagram />
                    </SocialIconWrap>
                  </div>
                </div>
                <div className="lg:pl-6 border-t-2 lg:border-t-0 border-black pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1 lg:hidden">Creative</p>
                  <p className="text-sm lg:text-base text-neutral-800">We post.</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1.1fr)] gap-4 lg:gap-0 lg:divide-x-2 lg:divide-black border-2 border-black border-t-0 bg-white p-5 lg:p-6">
                <div className="lg:pr-6">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Growth</p>
                  <p className="text-xl lg:text-2xl font-semibold">$250/mo</p>
                </div>
                <div className="lg:px-6 border-t-2 lg:border-t-0 border-black pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1 lg:hidden">Posts</p>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-heading text-5xl sm:text-6xl leading-none tabular-nums">4–5</span>
                    <span className="text-neutral-600 text-sm">posts / week</span>
                  </div>
                </div>
                <div className="lg:px-6 border-t-2 lg:border-t-0 border-black pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 lg:hidden">Platforms</p>
                  <div
                    className="flex flex-wrap items-center gap-3 text-neutral-900"
                    aria-label="Facebook, Instagram, TikTok, and YouTube"
                  >
                    <SocialIconWrap label="Facebook">
                      <IconFacebook />
                    </SocialIconWrap>
                    <SocialIconWrap label="Instagram">
                      <IconInstagram />
                    </SocialIconWrap>
                    <SocialIconWrap label="TikTok">
                      <IconTikTok />
                    </SocialIconWrap>
                    <SocialIconWrap label="YouTube">
                      <IconYouTube />
                    </SocialIconWrap>
                  </div>
                </div>
                <div className="lg:pl-6 border-t-2 lg:border-t-0 border-black pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1 lg:hidden">Creative</p>
                  <p className="text-sm lg:text-base text-neutral-800">We edit a little.</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1.1fr)] gap-4 lg:gap-0 lg:divide-x-2 lg:divide-white/25 border-2 border-black border-t-0 bg-black text-white p-5 lg:p-6">
                <div className="lg:pr-6">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Daily</p>
                  <p className="text-xl lg:text-2xl font-semibold">$500 – $750/mo</p>
                </div>
                <div className="lg:px-6 border-t-2 lg:border-t-0 border-white/25 pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1 lg:hidden">Posts</p>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-heading text-5xl sm:text-6xl leading-none tabular-nums text-white">
                      7
                    </span>
                    <span className="text-neutral-300 text-sm">posts / week · every day</span>
                  </div>
                </div>
                <div className="lg:px-6 border-t-2 lg:border-t-0 border-white/25 pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2 lg:hidden">Platforms</p>
                  <div className="flex flex-wrap items-center gap-3 text-white" aria-label="Core social platforms plus streaming and extra accounts">
                    <SocialIconWrap label="Facebook">
                      <IconFacebook />
                    </SocialIconWrap>
                    <SocialIconWrap label="Instagram">
                      <IconInstagram />
                    </SocialIconWrap>
                    <SocialIconWrap label="TikTok">
                      <IconTikTok />
                    </SocialIconWrap>
                    <SocialIconWrap label="YouTube">
                      <IconYouTube />
                    </SocialIconWrap>
                    <SocialIconWrap label="Streaming and broadcast">
                      <Tv className={socialIconClass} strokeWidth={1.75} aria-hidden />
                    </SocialIconWrap>
                    <SocialIconWrap label="Multiple accounts or extra channels">
                      <Users className={socialIconClass} strokeWidth={1.75} aria-hidden />
                    </SocialIconWrap>
                  </div>
                  <p className="text-neutral-400 text-xs mt-3 max-w-sm leading-relaxed">
                    Twitch, X, LinkedIn, Spotify, extra brand profiles, or live-style drops—scoped with
                    you.
                  </p>
                </div>
                <div className="lg:pl-6 border-t-2 lg:border-t-0 border-white/25 pt-4 lg:pt-0">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1 lg:hidden">Creative</p>
                  <p className="text-sm lg:text-base text-neutral-200">
                    We post every day and edit your creatives.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex mt-10 md:mt-12 items-center gap-2 bg-black text-white px-8 py-4 font-semibold text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors"
            >
              Talk social
            </a>
          </div>
        </div>
      </section>

      <section
        id="projects"
        ref={projectsSectionRef}
        className="py-20 md:py-24 bg-black text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-3 border border-white/20 px-5 sm:px-6 py-1.5 sm:py-2 text-white/70 text-xs sm:text-sm font-normal tracking-widest mb-5 sm:mb-6 backdrop-blur-sm">
              <span>OUR PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-4 sm:mb-6 tracking-tight">
              RECENT WORK
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto tracking-wide leading-relaxed font-normal px-4">
              A snapshot of live sites and brands we have shipped.
            </p>
          </div>

          <div className="relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-24">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
              setApi={setProjectsApi}
              aria-label="Projects showcase carousel"
            >
              <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
                {projects.map((project) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-2 sm:pl-3 md:pl-4 pt-5 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 project-card-item"
                  >
                    <div className="relative overflow-hidden h-full group project-card">
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/0 to-yellow-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative p-6 sm:p-8 text-center h-full flex flex-col z-10">
                        <div className="flex justify-center mb-5 sm:mb-6">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative">
                            {project.image ? (
                              <Image
                                src={project.image}
                                alt={`${project.name} logo`}
                                width={112}
                                height={112}
                                unoptimized={project.image.endsWith(".svg")}
                                className="w-full h-full object-contain relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                              />
                            ) : (
                              <Globe className="w-12 h-12 sm:w-14 sm:h-14 text-white/80 group-hover:text-white transition-colors duration-300 relative z-10" />
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-heading font-medium text-white mb-3 sm:mb-4 tracking-tight relative z-10">
                          {project.name}
                        </h3>
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
              <CarouselPrevious className="hidden lg:flex -left-12 xl:-left-16 2xl:-left-20 w-12 h-12 xl:w-14 xl:h-14 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-yellow-200 text-white border border-white/10 hover:border-white/30 transition-all duration-300 !rounded-none" />
              <CarouselNext className="hidden lg:flex -right-12 xl:-right-16 2xl:-right-20 w-12 h-12 xl:w-14 xl:h-14 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-yellow-200 text-white border border-white/10 hover:border-white/30 transition-all duration-300 !rounded-none" />
              <CarouselPrevious className="hidden sm:flex lg:hidden -left-6 md:-left-8 w-10 h-10 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-yellow-200 text-white border border-white/10 hover:border-white/30 transition-all duration-300 !rounded-none" />
              <CarouselNext className="hidden sm:flex lg:hidden -right-6 md:-right-8 w-10 h-10 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-yellow-200 text-white border border-white/10 hover:border-white/30 transition-all duration-300 !rounded-none" />
            </Carousel>

            <div className="sm:hidden mt-8">
              <div className="flex justify-center gap-1.5 mb-3">
                {Array.from({ length: projectsCount }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === projectsCurrent - 1 ? "bg-white w-4" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <div className="text-center text-xs text-white/50 font-normal">
                {projectsCurrent} / {projectsCount}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" ref={contactRef} className="py-24 bg-black text-white relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: "url(/pattern9.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-3 bg-yellow-100 px-6 py-2 text-black text-sm font-normal tracking-widest mb-8">
              <Mail size={16} />
              <span>CONTACT</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading mb-8 tracking-tight">REACH OUT</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed tracking-wide font-normal">
              Tell us who you are and what you need. We reply fast.
            </p>

            <form
              ref={formRef}
              className="space-y-6 text-left"
              aria-label="Contact form"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-normal text-gray-300 mb-2">
                  Name <span className="text-yellow-200">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent rounded-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="business" className="block text-sm font-normal text-gray-300 mb-2">
                  Business name <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  autoComplete="organization"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent rounded-none"
                  placeholder="Company or brand"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-normal text-gray-300 mb-2">
                  Email <span className="text-yellow-200">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent rounded-none"
                  placeholder="you@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-normal text-gray-300 mb-2">
                  Phone <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent rounded-none"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-normal text-gray-300 mb-2">
                  What you want &amp; what you do <span className="text-yellow-200">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-transparent resize-y min-h-[120px] rounded-none"
                  placeholder="Example: We run a local HVAC company. We need a 5-page site and help running Google Local ads…"
                />
              </div>
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-yellow-100 text-black px-8 py-4 font-normal text-lg tracking-widest uppercase transition-all duration-300 ease-in-out hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
                >
                  <Mail className="w-5 h-5" />
                  <span>{isSubmitting ? "Sending…" : "Send message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fef3c7",
            color: "#000000",
            border: "1px solid #000000",
            borderRadius: "8px",
            fontFamily: "Outfit, sans-serif",
            fontWeight: "400",
          },
        }}
      />
    </main>
  );
}
