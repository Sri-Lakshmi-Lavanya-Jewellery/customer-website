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
    <nav className="mb-8 text-sm font-modern" aria-label="Breadcrumb">
      <ol className="list-none p-0 flex flex-wrap items-center">
        <li className="flex items-center">
          <Link to="/" className="text-charcoal-muted hover:text-gold-700 transition-colors">Home</Link>
          <span className="mx-2 text-gold-300">/</span>
        </li>
        <li className="flex items-center">
          <Link to="/products" className="text-charcoal-muted hover:text-gold-700 transition-colors">Products</Link>
          <span className="mx-2 text-gold-300">/</span>
        </li>
        {categoryName && categoryName.trim().toLowerCase() !== product.title.trim().toLowerCase() && (
          <li className="flex items-center">
            <Link to={`/category/${categorySlug}`} className="text-charcoal-muted hover:text-gold-700 transition-colors">
              {categoryName}
            </Link>
            <span className="mx-2 text-gold-300">/</span>
          </li>
        )}
        {subcategoryName && subcategorySlug && subcategoryName.trim().toLowerCase() !== product.title.trim().toLowerCase() && (
          <li className="flex items-center">
            <Link to={`/category/${categorySlug}/subcategory/${subcategorySlug}`} className="text-charcoal-muted hover:text-gold-700 transition-colors">
              {subcategoryName}
            </Link>
            <span className="mx-2 text-gold-300">/</span>
          </li>
        )}
        <li className="text-charcoal" aria-current="page">{product.title}</li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
