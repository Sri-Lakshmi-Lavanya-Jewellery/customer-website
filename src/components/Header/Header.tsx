import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Search, Phone, MapPin, Video, MessageCircle, ShieldCheck } from 'lucide-react'
import { useMetalRates } from '../../hooks/useMetalRates'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const rates = useMetalRates();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/categories', label: 'Silver Jewellery' },
    { to: '/products', label: 'New Arrivals' },
    { to: '/collections', label: 'Collections' },
    { to: '/calendar', label: 'Auspicious Calendar' },
    { to: '/weight-range', label: 'Weight Range' },
    { to: '/enquiry', label: 'Enquiry' },
    { to: '/about', label: 'About Us' },
  ];

  return (
    <div className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>

      {/* ── Row 1: Live-rate announcement bar ── */}
      <div className="bg-charcoal text-ivory">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-9 text-[11px] gap-2">

            {/* Left: contact (desktop) */}
            <div className="hidden md:flex items-center gap-4 text-ivory/55 shrink-0">
              <a href="tel:+917288865969"
                className="flex items-center gap-1 hover:text-gold-400 transition-colors duration-200">
                <Phone size={10} />
                <span>+91 72888 65969</span>
              </a>
              <span className="text-ivory/15">|</span>
              <span className="flex items-center gap-1"><MapPin size={10} />Store</span>
              <span className="text-ivory/15">|</span>
              <span className="flex items-center gap-1"><Video size={10} />Video Call</span>
            </div>

            {/* Center: today's live gold (24K + 22K) & silver rate */}
            <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 min-w-0 whitespace-nowrap overflow-hidden">
              {rates ? (
                <>
                  <span className="text-gold-400 tracking-wide">Gold</span>
                  <span className="hidden sm:inline text-ivory/80">
                    24K <span className="font-medium text-ivory">₹{rates.gold24k > 0 ? rates.gold24k.toFixed(0) : '—'}</span>
                  </span>
                  <span className="text-ivory/80">
                    22K <span className="font-medium text-ivory">₹{rates.gold22k > 0 ? rates.gold22k.toFixed(0) : '—'}</span>/g
                  </span>
                  <span className="text-ivory/15">|</span>
                  <span className="text-ivory/70 tracking-wide">Silver</span>
                  <span className="font-medium text-ivory">₹{rates.silverPerGram > 0 ? rates.silverPerGram.toFixed(0) : '—'}/g</span>
                </>
              ) : (
                <span className="tracking-[0.18em] uppercase text-ivory/50 text-[10px]">
                  Authentic Silver &amp; Gold · Today's Rate
                </span>
              )}
            </div>

            {/* Right: trust (desktop) */}
            <div className="hidden md:flex items-center gap-2 justify-end text-ivory/55 shrink-0">
              <ShieldCheck size={11} className="text-gold-400" />
              <span className="tracking-wide">BIS Hallmark-Grade · Est. 2001</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Logo Row ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 items-center h-20">

            {/* Left: search (desktop) */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-2 text-gray-500 hover:text-gold-600 transition-colors duration-200 text-sm font-medium font-modern"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
            {/* Mobile left: empty */}
            <div className="md:hidden" />

            {/* Center: brand — truly centered via grid */}
            <Link to="/" className="flex flex-col items-center group" onClick={closeMenu}>
              <div className="flex items-center gap-2 md:gap-3">
                <LotusIcon className="text-gold-500 w-7 h-7 hidden sm:block" />
                <div className="text-center">
                  <h1 className="font-display text-lg md:text-2xl font-light text-gray-900 tracking-wider leading-none group-hover:text-gold-700 transition-colors duration-300">
                    Sri Lakshmi Lavanya
                  </h1>
                  <p className="text-[9px] md:text-[10px] text-charcoal-muted tracking-[0.3em] uppercase mt-0.5 font-modern">
                    Silver &amp; Gold Jewellery
                  </p>
                </div>
                <LotusIcon className="text-gold-500 w-7 h-7 hidden sm:block" />
              </div>
            </Link>

            {/* Right: enquiry + hamburger */}
            <div className="flex items-center justify-end gap-3">
              <Link
                to="/enquiry"
                className="hidden md:flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 tracking-wide font-modern"
              >
                <MessageCircle size={13} />
                Enquiry
              </Link>
              {/* Mobile icons */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-gold-600 rounded-full hover:bg-gold-50 transition-colors"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-gold-600 rounded-full hover:bg-gold-50 transition-colors"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Desktop expandable search */}
          {isSearchOpen && (
            <div className="pb-4 hidden md:block">
              <div className="relative max-w-lg mx-auto">
                <input
                  autoFocus
                  type="search"
                  placeholder="Search for silver jewellery…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 border border-gold-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-gold-50 font-modern"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Row 3: Desktop Nav ── */}
      <nav className="hidden md:block bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-0">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `block px-3 lg:px-4 py-4 text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 border-b-2 font-modern whitespace-nowrap ${
                      isActive
                        ? 'border-gold-500 text-gold-700'
                        : 'border-transparent text-gray-600 hover:text-gold-600 hover:border-gold-300'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3">
          <div className="relative">
            <input
              autoFocus
              type="search"
              placeholder="Search for jewellery…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 border border-gold-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-gold-50 font-modern"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-xl">
          <ul className="divide-y divide-gray-50">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-6 py-4 text-sm font-semibold tracking-wide font-modern transition-colors ${
                      isActive ? 'text-gold-700 bg-gold-50' : 'text-gray-700 hover:text-gold-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {/* Mobile rates row */}
            {rates && (
              <li className="px-6 py-3 bg-charcoal flex items-center justify-between text-xs gap-2">
                <span className="text-gold-400 font-semibold">
                  Gold 24K ₹{rates.gold24k > 0 ? rates.gold24k.toFixed(0) : '—'} · 22K ₹{rates.gold22k > 0 ? rates.gold22k.toFixed(0) : '—'}
                </span>
                <span className="text-ivory/70">Silver ₹{rates.silverPerGram > 0 ? rates.silverPerGram.toFixed(0) : '—'}/g</span>
              </li>
            )}
            <li className="px-6 py-4">
              <a href="tel:+917288865969" className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} className="text-gold-500" />+91 72888 65969
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Lotus SVG icon (shared) ── */
function LotusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 56 C32 56 12 44 12 28 C12 20 20 14 28 18 C29.5 18.6 31 19.5 32 20.5 C33 19.5 34.5 18.6 36 18 C44 14 52 20 52 28 C52 44 32 56 32 56Z"
        fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M32 56 C32 56 18 46 16 34 C14 22 24 16 32 22 C40 16 50 22 48 34 C46 46 32 56 32 56Z"
        fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M32 56 C32 56 22 48 22 36 C22 28 27 24 32 26 C37 24 42 28 42 36 C42 48 32 56 32 56Z"
        fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="32" cy="38" r="4" fill="currentColor"/>
    </svg>
  );
}
