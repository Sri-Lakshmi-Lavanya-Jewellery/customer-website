import React from 'react';

interface AvailabilityFilterProps {
  inStock: boolean;
  // Ensure filterType is specific for type safety if handleFilterChange is more generic in the hook
  onFilterChange: (filterType: 'inStock', value: boolean) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ inStock, onFilterChange }) => {
  return (
    <div>
      <h3 className="font-display text-base text-charcoal mb-2">Availability</h3>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => onFilterChange('inStock', e.target.checked)}
          className="form-checkbox h-5 w-5 text-gold-600 rounded focus:ring-gold-500 accent-gold-600"
        />
        <span className="text-charcoal-light font-modern">In Stock Only</span>
      </label>
    </div>
  );
};

export default AvailabilityFilter;
