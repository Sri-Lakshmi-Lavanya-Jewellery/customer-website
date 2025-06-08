import React from 'react';
import { Category, Subcategory } from '../../types/product.types'; // Centralized types
import { CategoryFilterControlsProps, FilterValues } from '../../types/categoryFilter.types'; // Centralized props type

export default function CategoryFilterControls({
  category,
  filterValues,
  filterSetters,
}: CategoryFilterControlsProps) {
  if (!category) {
    return null; 
  }

  return (
    <>
      {/* Subcategory Filters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subcategories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => filterSetters.setSelectedSubcategory(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterValues.selectedSubcategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            All
          </button>
          {category.subcategories.map((subcategory: Subcategory) => ( // Subcategory type from product.types
            <button
              key={subcategory.id}
              onClick={() => filterSetters.setSelectedSubcategory(subcategory.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterValues.selectedSubcategory === subcategory.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Availability Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Availability</h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filterValues.inStock}
                onChange={(e) => filterSetters.handleFilterChange('inStock', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">In Stock Only</span>
            </label>
          </div>

          {/* Sort By Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sort By</h3>
            <select
              value={filterValues.sortBy}
              // Use FilterValues['sortBy'] to ensure the value matches the defined SortByType
              onChange={(e) => filterSetters.handleFilterChange('sortBy', e.target.value as FilterValues['sortBy'])}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Product Type Filter (Placeholder) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Type</h3>
            <div className="flex items-center space-x-2">
              <select
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                defaultValue="all"
              >
                <option value="all">All Types</option>
                <option value="gift">Gift Items</option>
                <option value="ceremonial">Ceremonial Items</option>
                <option value="traditional">Traditional Items</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
