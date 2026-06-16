import React from 'react';
import type { Dimension } from '../../hooks/useProductDetails'; // Import the Dimension type

interface SelectedDimensionDetailsProps {
  selectedDimension: string;
  currentModelData: Record<string, Dimension> | null; // Data for the currently selected model
}

const SelectedDimensionDetails: React.FC<SelectedDimensionDetailsProps> = ({
  selectedDimension,
  currentModelData,
}) => {
  if (!selectedDimension || !currentModelData || !currentModelData[selectedDimension]) {
    return null;
  }

  const dimensionData = currentModelData[selectedDimension];

  const renderDetailCard = (label: string, value: string | undefined) => {
    if (!value) return null;
    return (
      <div className="bg-gold-50 p-4 rounded-lg border border-gold-100">
        <div className="text-charcoal-muted font-modern text-sm mb-1">{label}</div>
        <div className="text-xl font-semibold text-charcoal">{value}</div>
      </div>
    );
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="font-display text-base text-charcoal mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold-500"></span>
        {selectedDimension} Specifications
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {renderDetailCard("Length", dimensionData.length)}
        {renderDetailCard("Breadth", dimensionData.breadth)}
        {renderDetailCard("Height", dimensionData.height)}
        {renderDetailCard("Weight", dimensionData.weight)}
      </div>
    </div>
  );
};

export default SelectedDimensionDetails;
