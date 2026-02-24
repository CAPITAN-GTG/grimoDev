"use client";

import { useState, useEffect } from 'react';
import { Home, FolderKanban, User, DollarSign, HelpCircle, Info, Mail, ArrowUpToLine, ArrowDownToLine, TrendingUp, Monitor } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Client Results', href: '#client-results', icon: TrendingUp },
  { name: 'Standalone', href: '#standalone', icon: User },
  { name: 'Pricing', href: '#pricing', icon: DollarSign },
  { name: 'FAQ', href: '#faq', icon: HelpCircle },
  { name: 'Info', href: '#services', icon: Info },
  { name: '3D Showcase', href: '#showcase', icon: Monitor },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const NavigationSlider = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show slider after a brief delay
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      
      // Find which section is currently in view
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
      
      // Handle top of page
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for any fixed headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      } hidden md:block`}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border-2 border-black/10 p-2 flex flex-col items-center gap-2">
        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="p-2 rounded-full hover:bg-black hover:text-white transition-all duration-200 group"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUpToLine className="w-4 h-4" />
        </button>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.substring(1);
            
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`
                  relative p-3 rounded-full transition-all duration-200 group
                  ${isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                  }
                `}
                aria-label={`Navigate to ${item.name}`}
                title={item.name}
              >
                <Icon className="w-5 h-5" />
                {/* Tooltip */}
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll to Bottom */}
        <button
          onClick={scrollToBottom}
          className="p-2 rounded-full hover:bg-black hover:text-white transition-all duration-200 group"
          aria-label="Scroll to bottom"
          title="Scroll to bottom"
        >
          <ArrowDownToLine className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NavigationSlider;

