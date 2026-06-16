import React from 'react';

interface DimensionSelectorProps {
  dimensionKeys: string[];
  selectedDimension: string;
  onDimensionChange: (dimensionKey: string) => void;
}

const DimensionSelector: React.FC<DimensionSelectorProps> = ({
  dimensionKeys,
  selectedDimension,
  onDimensionChange,
}) => {
  if (dimensionKeys.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h4 className="font-display text-base text-charcoal mb-3">Select Specific Dimensions</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4"> {/* Adjusted grid for potentially more items */}
        {dimensionKeys.map(dimKey => (
          <button
            key={dimKey}
            onClick={() => onDimensionChange(dimKey)}
            className={`border p-3 rounded-lg text-center font-modern transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-opacity-50 ${
              selectedDimension === dimKey
                ? 'border-gold-500 bg-gold-50 text-gold-800 shadow-md'
                : 'border-gray-300 text-charcoal-light hover:border-gold-300 hover:bg-gold-50/50'
            }`}
          >
            {dimKey}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DimensionSelector;
