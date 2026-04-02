import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselItems = [
  {
    image: '/assets/images/carousel/carousel-1.png',
    title: 'Bridal Silver Collection',
    subtitle: 'Crafted for your most precious moments',
    cta: 'Explore Bridal',
    ctaLink: '/collections',
  },
  {
    image: '/assets/images/carousel/carousel-2.png',
    title: 'Pure 925 Silver',
    subtitle: 'Timeless artistry, hallmarked quality',
    cta: 'Shop Now',
    ctaLink: '/categories',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = carouselItems.length;

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 700);
    setCurrent((idx + total) % total);
  };

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(t);
  }, [current]);

  const item = carouselItems[current];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900" style={{ height: 'clamp(420px, 70vh, 700px)' }}>
      {/* Slides */}
      {carouselItems.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          {/* Fallback gradient when no image */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-silver-800 to-silver-900"
            style={{ zIndex: -1 }}
          />
        </div>
      ))}

      {/* Text overlay */}
      <div
        className="absolute inset-0 flex items-center z-10"
        style={{ zIndex: 2 }}
      >
        <div className="container mx-auto px-8 md:px-16">
          <div
            className={`max-w-xl transition-all duration-700 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            <p className="text-gold-400 text-xs md:text-sm tracking-[0.35em] uppercase font-modern mb-4">
              Sri Lakshmi Lavanya Jewellery
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4">
              {item.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-modern mb-8 leading-relaxed max-w-sm">
              {item.subtitle}
            </p>
            <a
              href={item.ctaLink}
              className="inline-block bg-gold-500 hover:bg-gold-600 text-white text-xs md:text-sm font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5 font-modern"
            >
              {item.cta}
            </a>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {carouselItems.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 h-2 bg-gold-400'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <div
          className="h-full bg-gold-gradient transition-all duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
