import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Product, Category } from '../../types/product.types'; // Centralized types

interface BreadcrumbsProps {
  product: Product | undefined;
  category: Category | null | undefined;
}

export default function Breadcrumbs({ product, category }: BreadcrumbsProps) {
  if (!product) {
    return null; 
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
      <ol className="list-none p-0 inline-flex items-center">
        <li className="flex items-center">
          <Link to="/" className="hover:text-gold-500 transition-colors">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
        </li>
        {category ? (
          <>
            <li className="flex items-center">
              <Link
                to={`/category/${category.id}`} // Assuming category.id is the correct link path part
                className="hover:text-gold-500 transition-colors"
              >
                {category.title}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1" />
            </li>
          </>
        ) : (
          <li className="flex items-center">
            <span className="text-gray-400">Category</span> 
            <ChevronRight className="h-4 w-4 mx-1" />
          </li>
        )}
        <li className="flex items-center">
          <span className="font-medium text-gray-800">{product.title}</span>
        </li>
      </ol>
    </nav>
  );
}
