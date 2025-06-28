import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../services/api';
import type { Category } from '../../data/productData';

interface ProductBreadcrumbProps {
  product: Product;
  category: Category | undefined;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ product, category }) => {
  return (
    <nav className="mb-8 text-sm">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
        </li>
        {category && (
          <li className="flex items-center">
            <Link to={`/products/${product.category}`} className="text-blue-600 hover:text-blue-800">
              {category.title}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
          </li>
        )}
        <li className="text-gray-600">{product.title}</li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
