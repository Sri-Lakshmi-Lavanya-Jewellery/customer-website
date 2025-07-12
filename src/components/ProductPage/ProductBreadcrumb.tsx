import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../services/api';
import type { Category } from '../../services/api';
import { getCategoryName, getCategorySlug, getSubcategoryName, getSubcategorySlug } from '../../utils/productUtils';

interface ProductBreadcrumbProps {
  product: Product;
  category: Category | undefined;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ product, category }) => {
  const categoryName = getCategoryName(product);
  const categorySlug = getCategorySlug(product);
  const subcategoryName = getSubcategoryName(product);
  const subcategorySlug = getSubcategorySlug(product);

  return (
    <nav className="mb-8 text-sm">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
        </li>
        <li className="flex items-center">
          <Link to="/products" className="text-blue-600 hover:text-blue-800">Products</Link>
          <span className="mx-2 text-gray-500">/</span>
        </li>
        <li className="flex items-center">
          <Link to={`/categories/${categorySlug}`} className="text-blue-600 hover:text-blue-800">
            {categoryName}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
        </li>
        {subcategoryName && subcategorySlug && (
          <li className="flex items-center">
            <Link to={`/categories/${categorySlug}/${subcategorySlug}`} className="text-blue-600 hover:text-blue-800">
              {subcategoryName}
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
