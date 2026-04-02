import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/categories', label: 'Silver Jewellery' },
    { to: '/products', label: 'New Arrivals' },
    { to: '/collections', label: 'Collections' },
    { to: '/weight-range', label: 'Weight Range' },
    { to: '/calendar', label: 'Auspicious Calendar' },
    { to: '/enquiry', label: 'Enquiry' },
    { to: '/about', label: 'About Us' },
  ];

  const categories = [
    'Necklaces & Sets',
    'Bangles & Kadas',
    'Earrings',
    'Anklets',
    'Rings',
    'Pendants & Chains',
    'Baby Silver',
    'Pooja Items',
  ];

  return (
    <footer className="bg-gray-950 text-white">
      {/* Top gold divider */}
      <div className="h-1 bg-gold-gradient" />

      {/* Main content */}
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="28" height="28" viewBox="0 0 64 64" fill="none" className="text-gold-400 flex-shrink-0">
                <path d="M32 56 C32 56 12 44 12 28 C12 20 20 14 28 18 C29.5 18.6 31 19.5 32 20.5 C33 19.5 34.5 18.6 36 18 C44 14 52 20 52 28 C52 44 32 56 32 56Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M32 56 C32 56 22 48 22 36 C22 28 27 24 32 26 C37 24 42 28 42 36 C42 48 32 56 32 56Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="32" cy="38" r="4" fill="currentColor"/>
              </svg>
              <div>
                <h2 className="font-indian-serif text-lg text-white leading-none">Sri Lakshmi Lavanya</h2>
                <p className="text-[10px] text-gray-500 tracking-[0.25em] uppercase font-modern mt-0.5">Silver Jewellery</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-modern leading-relaxed mb-6">
              Crafting pure 925 silver jewellery with love and tradition since 2001. Every piece
              is BIS hallmarked and handcrafted to last a lifetime.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
                { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
                { href: 'https://wa.me/917288865969', icon: FaWhatsapp, label: 'WhatsApp' },
                { href: 'https://youtube.com', icon: FaYoutube, label: 'YouTube' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold-500 border border-white/10 hover:border-gold-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-indian-serif text-sm text-gold-400 uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-gold-400 font-modern transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold-500/0 group-hover:bg-gold-500 rounded-full transition-colors duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="font-indian-serif text-sm text-gold-400 uppercase tracking-widest mb-5">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map(cat => (
                <li key={cat}>
                  <Link
                    to="/categories"
                    className="text-sm text-gray-400 hover:text-gold-400 font-modern transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold-500/0 group-hover:bg-gold-500 rounded-full transition-colors duration-200" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-indian-serif text-sm text-gold-400 uppercase tracking-widest mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400 font-modern leading-relaxed">
                  123 Silver Street, Jewellery Nagar,<br />
                  Hyderabad, Telangana 500 001
                </span>
              </li>
              <li>
                <a
                  href="tel:+917288865969"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-gold-400 font-modern transition-colors duration-200"
                >
                  <Phone size={15} className="text-gold-500 flex-shrink-0" />
                  +91 72888 65969
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@silvergold.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-gold-400 font-modern transition-colors duration-200"
                >
                  <Mail size={15} className="text-gold-500 flex-shrink-0" />
                  info@srilakshmilavanya.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={15} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400 font-modern space-y-1">
                  <div className="flex justify-between gap-4">
                    <span>Mon – Sat</span>
                    <span className="text-gold-400">10 AM – 8 PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Sunday</span>
                    <span className="text-red-400">Closed</span>
                  </div>
                </div>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917288865969"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold tracking-wide font-modern px-5 py-2.5 rounded-full w-fit transition-colors duration-200"
            >
              <FaWhatsapp size={14} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600 font-modern">
            <p>
              &copy; {new Date().getFullYear()} Sri Lakshmi Lavanya Jewellery. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gold-500" />
                BIS Hallmarked Silver
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Certified Authentic
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Trusted Since 2001
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
