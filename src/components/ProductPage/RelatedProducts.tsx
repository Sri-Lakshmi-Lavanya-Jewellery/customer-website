import React from 'react';
import ProductCard from '../ProductCard/ProductCard'; // Import ProductCard
import { Product } from '../../types/product.types'; // Import Product type

// Define mock products data
const mockRelatedProducts: Product[] = [
  {
    id: "mock-related-1",
    title: "Elegant Gold Bangle",
    image: "/assets/images/products/gold-bangles-2.jpg", // Ensure this path is valid or use a placeholder
    categoryId: "gold-jewellery", // Example categoryId
    subcategoryId: "bangles", // Example subcategoryId
    isNew: true,
    inStock: true,
    weight: "25g",
    purity: "22k",
    // models are optional in Product type, ProductCard doesn't need them
  },
  {
    id: "mock-related-2",
    title: "Classic Silver Earrings",
    image: "/assets/images/products/silver-earrings-1.jpg",
    categoryId: "silver-jewellery",
    subcategoryId: "earrings",
    isNew: false,
    inStock: true,
  },
  {
    id: "mock-related-3",
    title: "Diamond Stud Ring",
    image: "/assets/images/products/diamond-ring-1.jpg",
    categoryId: "diamond-jewellery",
    subcategoryId: "rings",
    isNew: true,
    inStock: false, // Example of out of stock
  },
  {
    id: "mock-related-4",
    title: "Bridal Set Pendant",
    image: "/assets/images/products/bridal-necklace-1.jpg",
    categoryId: "bridal-collection",
    subcategoryId: "necklaces",
    isNew: false,
    inStock: true,
  },
];

export default function RelatedProducts() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockRelatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image || '/assets/images/placeholders/default-product.png'} // Fallback image
            isNew={product.isNew}
            link={`/product/${product.id}`} // Construct a link, assuming a route structure
          />
        ))}
      </div>
    </div>
  );
}
