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
      <h4 className="font-medium text-gray-800 mb-3">Select Specific Dimensions</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4"> {/* Adjusted grid for potentially more items */}
        {dimensionKeys.map(dimKey => (
          <button
            key={dimKey}
            onClick={() => onDimensionChange(dimKey)}
            className={`border p-3 rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              selectedDimension === dimKey
                ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-md'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
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
