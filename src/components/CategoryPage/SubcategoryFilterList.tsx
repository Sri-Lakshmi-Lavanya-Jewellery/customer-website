import React from 'react';
import type { Subcategory } from '../../data/productData'; // Assuming Category['subcategories'] is Subcategory[]

interface SubcategoryFilterListProps {
  subcategories: Subcategory[];
  selectedSubcategory: string | null;
  onSubcategorySelect: (subcategoryId: string | null) => void;
}

const SubcategoryFilterList: React.FC<SubcategoryFilterListProps> = ({
  subcategories,
  selectedSubcategory,
  onSubcategorySelect,
}) => {
  if (!subcategories || subcategories.length === 0) {
    return null; // Don't render if there are no subcategories
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Subcategories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSubcategorySelect(null)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedSubcategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          All
        </button>
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => onSubcategorySelect(subcategory.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSubcategory === subcategory.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {subcategory.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryFilterList;
