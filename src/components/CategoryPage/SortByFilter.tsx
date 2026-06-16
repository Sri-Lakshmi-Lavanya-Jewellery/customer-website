import React from 'react';

interface SortByFilterProps {
  sortBy: string;
  // Ensure filterType is specific for type safety
  onFilterChange: (filterType: 'sortBy', value: string) => void;
}

const SortByFilter: React.FC<SortByFilterProps> = ({ sortBy, onFilterChange }) => {
  return (
    <div>
      <h3 className="font-display text-base text-charcoal mb-2">Sort By</h3>
      <select
        value={sortBy}
        onChange={(e) => onFilterChange('sortBy', e.target.value)}
        className="block w-full border-gold-200 rounded-md shadow-sm font-modern text-charcoal focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2" // Added p-2 for better default styling
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
