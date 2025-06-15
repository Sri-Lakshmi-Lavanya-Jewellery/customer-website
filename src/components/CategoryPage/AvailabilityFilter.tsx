import React from 'react';

interface AvailabilityFilterProps {
  inStock: boolean;
  // Ensure filterType is specific for type safety if handleFilterChange is more generic in the hook
  onFilterChange: (filterType: 'inStock', value: boolean) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ inStock, onFilterChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Availability</h3>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => onFilterChange('inStock', e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <span className="text-gray-700">In Stock Only</span>
      </label>
    </div>
  );
};

export default AvailabilityFilter;
