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
      <div className="grid grid-cols-1 gap-3 mb-4 font-modern text-sm">
        <div className="flex items-center gap-2">
          <span className="text-charcoal-muted">Category</span>
          <span className="font-semibold text-gold-700">{categoryDisplay}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-charcoal-muted">Weight</span>
          <span className="font-semibold text-charcoal">{weight || 'On enquiry'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-charcoal-muted">Status</span>
          <span className={`inline-flex items-center gap-1.5 font-semibold ${inStock ? 'text-emerald-700' : 'text-maroon'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-maroon'}`} />
            {inStock ? 'In Stock' : 'Made to Order'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;
