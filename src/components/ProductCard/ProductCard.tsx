import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BadgeCheck } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';

interface ProductCardProps {
  id: string;
  title: string;
  image?: string;
  /** Optional second image revealed on hover */
  image2?: string;
  isNew?: boolean;
  bestseller?: boolean;
  /** e.g. "925 Silver", "999", "22K" */
  purity?: string;
  /** e.g. "120 g" */
  weight?: string;
  link: string;
}

export default function ProductCard({
  id, title, image, image2, isNew, bestseller, purity, weight, link,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const { has, toggle } = useWishlist();
  const wished = has(id);

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };

  return (
    <Link to={link} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-ivory-200 shadow-card card-hover">

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-ivory-100">
          {image && !imgError ? (
            <>
              {imgLoading && <div className="absolute inset-0 bg-ivory-200 animate-pulse" />}
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => { setImgError(true); setImgLoading(false); }}
                onLoad={() => setImgLoading(false)}
                style={{ display: imgLoading ? 'none' : 'block' }}
              />
              {/* Second image on hover (if provided) */}
              {image2 && (
                <img
                  src={image2}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold-50 to-silver-100 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 64 64" fill="none" className="text-gold-300">
                <path d="M32 56 C32 56 12 44 12 28 C12 20 20 14 28 18 C29.5 18.6 31 19.5 32 20.5 C33 19.5 34.5 18.6 36 18 C44 14 52 20 52 28 C52 44 32 56 32 56Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M32 56 C32 56 22 48 22 36 C22 28 27 24 32 26 C37 24 42 28 42 36 C42 48 32 56 32 56Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="38" r="4" fill="currentColor" />
              </svg>
            </div>
          )}

          {/* Badges (top-left) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isNew && (
              <span className="bg-gold-500 text-white text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full font-modern">New</span>
            )}
            {bestseller && (
              <span className="bg-maroon text-white text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full font-modern">Bestseller</span>
            )}
          </div>

          {/* Wishlist heart (top-right) */}
          <button
            type="button"
            onClick={onWish}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wished}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-ivory-200 flex items-center justify-center text-charcoal-muted hover:text-maroon shadow-sm transition-colors duration-200"
          >
            <Heart size={16} className={wished ? 'fill-maroon text-maroon' : ''} />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Purity + certified line */}
          <div className="flex items-center gap-2 mb-1.5 min-h-[16px]">
            {purity && (
              <span className="text-[10px] font-semibold tracking-wide text-gold-700 bg-gold-50 border border-gold-100 px-2 py-0.5 rounded-full font-modern">
                {purity}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[10px] text-charcoal-muted font-modern">
              <BadgeCheck size={11} className="text-gold-600" /> Certified
            </span>
          </div>

          <h3 className="font-display text-base md:text-lg text-charcoal leading-snug line-clamp-2 mb-2 group-hover:text-gold-700 transition-colors duration-200">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-xs text-charcoal-muted font-modern">
              {weight ? `Weight · ${weight}` : 'Price on Request'}
            </span>
            <span className="flex items-center gap-1 text-xs text-gold-700 font-semibold font-modern opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Enquire <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
