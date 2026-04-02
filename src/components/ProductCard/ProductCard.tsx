import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  image?: string;
  isNew?: boolean;
  link: string;
}

export default function ProductCard({ id, title, image, isNew, link }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <Link to={link} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold-200 hover:shadow-gold transition-all duration-300 hover:-translate-y-1">

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {image && !imgError ? (
            <>
              {imgLoading && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => { setImgError(true); setImgLoading(false); }}
                onLoad={() => setImgLoading(false)}
                style={{ display: imgLoading ? 'none' : 'block' }}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold-50 to-silver-100 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 64 64" fill="none" className="text-gold-300">
                <path d="M32 56 C32 56 12 44 12 28 C12 20 20 14 28 18 C29.5 18.6 31 19.5 32 20.5 C33 19.5 34.5 18.6 36 18 C44 14 52 20 52 28 C52 44 32 56 32 56Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M32 56 C32 56 22 48 22 36 C22 28 27 24 32 26 C37 24 42 28 42 36 C42 48 32 56 32 56Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="32" cy="38" r="4" fill="currentColor"/>
              </svg>
            </div>
          )}

          {/* New badge */}
          {isNew && (
            <div className="absolute top-3 left-3 bg-gold-500 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full font-modern">
              New
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display text-base md:text-lg font-light text-gray-800 leading-snug line-clamp-2 mb-2 group-hover:text-gold-700 transition-colors duration-200">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-modern">Price on Request</span>
            <span className="flex items-center gap-1 text-xs text-gold-600 font-semibold font-modern opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Enquire <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
