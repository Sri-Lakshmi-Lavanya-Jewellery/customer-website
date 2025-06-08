import React from 'react';
import type { DimensionRangeSet } from '../../hooks/useProductDetails'; // Import the type

interface DimensionRangeDisplayProps {
  dimensionRangeSet: DimensionRangeSet | null;
}

const DimensionRangeDisplay: React.FC<DimensionRangeDisplayProps> = ({ dimensionRangeSet }) => {
  if (!dimensionRangeSet) {
    return null;
  }

  const renderRangeCard = (label: string, range: DimensionRangeSet[keyof DimensionRangeSet], iconPath: string) => {
    if (!range) return null;
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-transform hover:translate-y-[-2px]">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{label}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path d={iconPath} />
          </svg>
        </div>
        <div className="mt-2 text-xl font-semibold">
          {range.min === range.max ?
            `${range.min}${range.unit}` :
            `${range.min} - ${range.max}${range.unit}`}
        </div>
      </div>
    );
  };

  // SVG paths for icons (example paths, replace with actual if needed)
  const lengthIconPath = "M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z";
  const breadthIconPath = "M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z";
  const heightIconPath = "M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z";
  const weightIconPath = "M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z";


  return (
    <div className="mb-6 border-b border-gray-200 pb-6">
      <h4 className="font-medium text-gray-800 mb-3">Available Dimension Ranges</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {renderRangeCard("Length Range", dimensionRangeSet.length, lengthIconPath)}
        {renderRangeCard("Breadth Range", dimensionRangeSet.breadth, breadthIconPath)}
        {renderRangeCard("Height Range", dimensionRangeSet.height, heightIconPath)}
        {renderRangeCard("Weight Range", dimensionRangeSet.weight, weightIconPath)}
      </div>
    </div>
  );
};

export default DimensionRangeDisplay;
