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
      <h2 className="font-display text-lg text-charcoal mb-4">Subcategories</h2>
      <div className="flex flex-wrap gap-2">
        <Link
          to={`/products?category=${currentCategorySlug}`}
          className={`px-4 py-2 rounded-full font-modern text-sm transition-colors ${
            selectedSubcategory === null
              ? 'bg-gold-600 text-white'
              : 'bg-gold-50 hover:bg-gold-100 text-charcoal-light border border-gold-100'
          }`}
        >
          All Products
        </Link>
        {subcategories.map((subcategory) => (
          <Link
            key={subcategory.id}
            to={`/products?category=${currentCategorySlug}&subcategory=${subcategory.slug || subcategory.id}`}
            className={`px-4 py-2 rounded-full font-modern text-sm transition-colors ${
              selectedSubcategory === subcategory.id
                ? 'bg-gold-600 text-white'
                : 'bg-gold-50 hover:bg-gold-100 text-charcoal-light border border-gold-100'
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
