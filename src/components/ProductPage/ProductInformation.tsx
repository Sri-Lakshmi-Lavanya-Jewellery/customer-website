import React from 'react';
import { Product } from '../../types/product.types'; // Centralized type
import { CheckCircle, XCircle } from 'lucide-react';

interface ProductInformationProps {
  product: Product | undefined;
}

export default function ProductInformation({ product }: ProductInformationProps) {
  if (!product) {
    return null; 
  }

  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{product.title}</h1>
      
      {/* Price Section */}
      <div className="mb-4 p-4 bg-gold-50 border border-gold-200 rounded-lg">
        <p className="text-lg font-semibold text-gold-700">Price available on request</p>
        <p className="text-sm text-gold-600">
          Please use the "Connect on Request" button for pricing details.
        </p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
        <div>
          <span className="font-semibold">Weight:</span> {product.weight || 'N/A'}
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">Availability:</span>
          {product.inStock ? (
            <span className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" /> In Stock
            </span>
          ) : (
            <span className="flex items-center text-red-600">
              <XCircle className="h-4 w-4 mr-1" /> Out of Stock
            </span>
          )}
        </div>
        {product.purity && (
             <div>
                <span className="font-semibold">Purity:</span> {product.purity}
             </div>
        )}
      </div>
    </div>
  );
}
