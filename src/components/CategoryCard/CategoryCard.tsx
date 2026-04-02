import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
}

export default function CategoryCard({ title, image, description, link }: CategoryCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={link} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 hover:border-gold-200 hover:shadow-gold transition-all duration-300 hover:-translate-y-1 aspect-[3/4]">

        {/* Background image */}
        {!imgError ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gold-100 to-silver-200 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="text-gold-400">
              <path d="M32 56 C32 56 12 44 12 28 C12 20 20 14 28 18 C29.5 18.6 31 19.5 32 20.5 C33 19.5 34.5 18.6 36 18 C44 14 52 20 52 28 C52 44 32 56 32 56Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M32 56 C32 56 22 48 22 36 C22 28 27 24 32 26 C37 24 42 28 42 36 C42 48 32 56 32 56Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="32" cy="38" r="4" fill="currentColor"/>
            </svg>
          </div>
        )}

        {/* Gradient overlay — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Hover sheen */}
        <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-300" />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <h3 className="font-display text-lg md:text-xl font-light text-white leading-tight mb-1 group-hover:text-gold-300 transition-colors duration-200">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/60 font-modern hidden md:block line-clamp-1">
              {description}
            </p>
            <span className="flex items-center gap-1 text-[10px] text-gold-300 font-semibold font-modern tracking-widest uppercase ml-auto">
              Shop <ArrowRight size={10} className="transform group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
