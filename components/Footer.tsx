import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img 
              src="/logo2.jpeg" 
              alt="Grimo Dev Logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <h3 className="text-xl font-black font-inter text-white tracking-tight">GRIMO DEV</h3>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
              © {currentYear} GRIMO DEV. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 