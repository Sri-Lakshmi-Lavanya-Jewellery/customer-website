import React from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Subcategory } from '../../services/api';

interface SubcategoryFilterListProps {
  subcategories: Subcategory[];
  selectedSubcategory?: string | null;
  onSubcategorySelect?: (subcategoryId: string | null) => void;
}

const SubcategoryFilterList: React.FC<SubcategoryFilterListProps> = ({
  subcategories,
  selectedSubcategory,
  onSubcategorySelect,
}) => {
  const { slug, categorySlug } = useParams<{ slug?: string; categorySlug?: string }>();
  
  // Get the current category slug for building URLs
  const currentCategorySlug = categorySlug || slug;
  
  if (!subcategories || subcategories.length === 0) {
    return null; // Don't render if there are no subcategories
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Subcategories</h2>
      <div className="flex flex-wrap gap-2">
        <Link
          to={`/catalog?category=${currentCategorySlug}`}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedSubcategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          All Products
        </Link>
        {subcategories.map((subcategory) => (
          <Link
            key={subcategory.id}
            to={`/catalog?category=${currentCategorySlug}&subcategory=${subcategory.slug || subcategory.id}`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSubcategory === subcategory.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {subcategory.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryFilterList;
