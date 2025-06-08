import React from 'react';

interface ProductSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Optional className for the wrapper div
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, children, className = "mb-12" }) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      {/*
        Using a simple div for children.
        If 'prose' styling is needed for specific children, it should be applied to the children directly
        or this component could be made more complex to handle different content stylings.
        For now, a generic div is fine.
      */}
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
};

export default ProductSection;
