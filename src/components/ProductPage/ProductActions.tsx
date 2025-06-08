import React, { useState } from 'react';
import { Product } from '../../types/product.types'; // Centralized type
import { Heart, Share2, Minus, Plus } from 'lucide-react';

interface ProductActionsProps {
  product: Product | undefined;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount)); 
  };

  if (!product) {
    return null; 
  }

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Quantity:
        </label>
        <div className="flex items-center border border-gray-300 rounded-md w-fit">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold-500"
            aria-label="Decrease quantity"
            disabled={quantity <= 1} // Disable if quantity is 1 or less
          >
            <Minus className="h-5 w-5" />
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-12 text-center border-l border-r border-gray-300 focus:outline-none focus:ring-0"
            min="1"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md focus:outline-none focus:ring-1 focus:ring-gold-500"
            aria-label="Increase quantity"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button
          type="button"
          disabled={!product.inStock}
          className={`flex-1 py-3 px-6 rounded-lg text-white font-semibold transition-colors
            ${product.inStock 
              ? 'bg-gold-500 hover:bg-gold-600' 
              : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          Connect on Request
        </button>
        <button
          type="button"
          className="flex-1 py-3 px-6 rounded-lg border border-gold-500 text-gold-500 hover:bg-gold-50 hover:text-gold-600 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Heart className="h-5 w-5" /> Add to Wishlist
        </button>
      </div>
      
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Link Copied!'))}
        className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gold-500 transition-colors"
      >
        <Share2 className="h-4 w-4" /> Share this product
      </button>
    </div>
  );
}
