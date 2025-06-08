import React from 'react';

interface ProductBasicInfoProps {
  weight: string | undefined;
  inStock: boolean;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({ weight, inStock }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
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
