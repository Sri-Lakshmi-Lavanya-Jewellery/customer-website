import React from 'react';

interface ProductTitleBadgeProps {
  title: string;
}

const ProductTitleBadge: React.FC<ProductTitleBadgeProps> = ({ title }) => {
  return (
    <>
      <h1 className="font-display text-3xl md:text-4xl font-light text-charcoal mb-2 leading-tight">{title}</h1>
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-gold-50 text-gold-700 px-3 py-2 rounded-full border border-gold-200 font-modern text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="font-medium">Price available on request</span>
        </div>
      </div>
    </>
  );
};

export default ProductTitleBadge;
