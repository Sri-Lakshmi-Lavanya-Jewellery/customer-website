import React from 'react';
import { Product } from '../../types/product.types'; // Centralized type

interface ProductDescriptionProps {
  product: Product | undefined;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  if (!product) {
    return null; 
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Product Description
      </h2>
      <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 space-y-4">
        <p>
          Discover the timeless elegance of our <strong>{product.title}</strong>. 
          Crafted with meticulous attention to detail, this piece showcases exceptional 
          artistry and the finest materials. 
          {product.purity && ` It boasts a purity of ${product.purity}, ensuring a brilliant shine and lasting value.`}
          {product.weight && ` With a weight of approximately ${product.weight}, it offers a substantial yet comfortable feel.`}
        </p>
        {product.description && <p>{product.description}</p>}
        <p>
          Perfect for special occasions or as a cherished gift, this item reflects a blend of 
          traditional craftsmanship and contemporary design. Each detail is thoughtfully considered 
          to create a piece that you will treasure for years to come.
        </p>
      </div>
    </div>
  );
}
