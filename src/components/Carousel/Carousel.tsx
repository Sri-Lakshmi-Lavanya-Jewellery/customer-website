import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, BadgeCheck } from 'lucide-react';

/*
 * Editorial hero. Each slide pairs a real product photograph (framed like a
 * gallery piece, so the casual catalogue backdrop reads as intentional) with
 * an elegant headline. No baked-in marketing text — the copy lives in HTML so
 * it stays crisp at every screen size.
 */
const WHATSAPP = 'https://wa.me/917288865969?text=Namaste%2C%20I%27d%20like%20to%20enquire%20about%20your%20silver%20collection.';

import { SITE_CONTENT_DEFAULTS, type HeroSlide } from '../../hooks/useSiteContent';

const DEFAULT_SLIDES = SITE_CONTENT_DEFAULTS.hero.slides;

export default function Carousel({ slides }: { slides?: HeroSlide[] }) {
  const carouselItems = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = carouselItems.length;

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    setCurrent((idx + total) % total);
  };

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 6500);
    return () => clearInterval(t);
  }, [current]);

  const item = carouselItems[current];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #17120a 0%, #0d0b06 55%, #120d07 100%)' }}
    >
      {/* Ambient texture + gold glow */}
      <div className="absolute inset-0 opacity-[0.06] bg-mandala" />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.55), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.5), transparent 70%)' }}
      />

      <div className="relative container mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-16 lg:py-20 min-h-[clamp(560px,82vh,780px)]">

          {/* ── Text ── */}
          <div
            className={`order-2 lg:order-1 text-center lg:text-left transition-all duration-600 ${
              animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="text-gold-400 text-[11px] md:text-xs tracking-[0.4em] uppercase font-modern mb-5">
              {item.eyebrow}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] font-light text-white leading-[1.08] mb-5">
              {item.title}
              <br />
              <span className="text-gold-400 italic">{item.titleAccent}</span>
            </h1>
            <p className="text-gray-300/90 text-sm md:text-base font-modern leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              {item.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
              <Link
                to={item.ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-white text-xs md:text-sm font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5 font-modern"
              >
                {item.cta} <ArrowRight size={14} />
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white/85 hover:border-gold-400 hover:text-gold-300 text-xs md:text-sm font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 font-modern"
              >
                Enquire on WhatsApp
              </a>
            </div>
            {/* Trust line */}
            <div className="flex items-center gap-5 justify-center lg:justify-start mt-9 text-[11px] text-gray-400 font-modern">
              <span className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-gold-500" /> BIS Hallmark-Grade</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-gold-500" /> Sold by Honest Weight</span>
            </div>
          </div>

          {/* ── Framed image ── */}
          <div className="order-1 lg:order-2 relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px]">
            {/* Decorative gold corner frame */}
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-gold-500/40 rounded-tr-3xl hidden sm:block" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-gold-500/40 rounded-bl-3xl hidden sm:block" />

            <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden ring-1 ring-gold-500/20 shadow-2xl">
              {carouselItems.map((slide, i) => (
                <img
                  key={i}
                  src={slide.image}
                  alt={`${slide.title} ${slide.titleAccent}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === current ? 1 : 0 }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
              {/* soft inner vignette so the framed photo feels finished */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.35)] rounded-[1.75rem]" />
            </div>

            {/* Floating purity chip */}
            <div className="absolute -bottom-4 right-4 sm:right-6 bg-white rounded-2xl px-4 py-2.5 shadow-gold flex items-center gap-2">
              <span className="font-display text-lg text-gold-600 leading-none">925</span>
              <span className="text-[9px] text-gray-500 font-modern tracking-widest uppercase leading-tight">Pure<br />Silver</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {carouselItems.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/35 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
