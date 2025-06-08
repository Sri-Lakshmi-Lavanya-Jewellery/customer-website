import React from 'react';

interface SortByFilterProps {
  sortBy: string;
  // Ensure filterType is specific for type safety
  onFilterChange: (filterType: 'sortBy', value: string) => void;
}

const SortByFilter: React.FC<SortByFilterProps> = ({ sortBy, onFilterChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Sort By</h3>
      <select
        value={sortBy}
        onChange={(e) => onFilterChange('sortBy', e.target.value)}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2" // Added p-2 for better default styling
      >
        <option value="newest">Newest First</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
        {/* Add other sort options here if they exist, e.g., price */}
      </select>
    </div>
  );
};

export default SortByFilter;
