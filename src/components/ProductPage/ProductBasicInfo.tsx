import React from 'react';
import type { Product } from '../../services/api';
import { formatCategoryDisplay } from '../../utils/productUtils';

interface ProductBasicInfoProps {
  product: Product;
  weight: string | undefined;
  inStock: boolean;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({ product, weight, inStock }) => {
  const categoryDisplay = formatCategoryDisplay(product);

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Category:</span>
          <span className="font-semibold text-blue-600">{categoryDisplay}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Weight:</span>
          <span className="font-semibold">{weight || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Status:</span>
          <span className={`font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;
