import React from 'react';

interface ProductCountDisplayProps {
  count: number;
}

const ProductCountDisplay: React.FC<ProductCountDisplayProps> = ({ count }) => {
  return (
    <div className="mb-4"> {/* Matches original wrapper class */}
      <p className="text-gray-600">{count} products found</p>
    </div>
  );
};

export default ProductCountDisplay;
