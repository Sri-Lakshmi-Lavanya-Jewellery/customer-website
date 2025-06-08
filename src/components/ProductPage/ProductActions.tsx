import React from 'react';

interface ProductActionsProps {
  inStock: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({ inStock }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={!inStock}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Connect on Request
      </button>
      <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductActions;
