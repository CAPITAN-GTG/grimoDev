"use client";

import { useState, useEffect } from 'react';
import { Home, FolderKanban, User, DollarSign, HelpCircle, Info, Mail, TrendingUp, Menu, X, Monitor } from 'lucide-react';
import Image from 'next/image';

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

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Mobile Navbar */}
      <nav
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl border-2 border-black/10 px-4 py-2">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="flex items-center gap-2 pr-2 border-r border-gray-200">
              <Image
                src="/logo2.jpeg"
                alt="Grimo Dev Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-black" />
              ) : (
                <Menu className="w-5 h-5 text-black" />
              )}
            </button>

            {/* Quick Navigation Items (visible when menu is closed) */}
            {!isOpen && (
              <div className="flex items-center gap-1">
                {navItems.slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="p-2 rounded-full hover:bg-black hover:text-white transition-all duration-200"
                      aria-label={item.name}
                      title={item.name}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Expanded Menu Dropdown */}
        {isOpen && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[90vw] max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-black/10 p-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black hover:text-white transition-all duration-200 group"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-normal">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default MobileNavbar;

