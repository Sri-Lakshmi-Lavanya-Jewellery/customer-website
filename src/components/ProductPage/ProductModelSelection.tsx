import { useState, useEffect, useMemo } from 'react'; // Ensured React is not default import
import { ProductModels, ModelDimensions, DimensionDetails } from '../../types/product.types'; // Centralized types

interface ProductModelSelectionProps {
  productModels: ProductModels; 
  initialSelectedModelKey?: string;
  initialSelectedDimensionKey?: string;
}

const getDimensionRange = (dimensions: ModelDimensions, key: string): string => {
    const dim = dimensions[key];
    if (!dim) return 'N/A';

    const parts: string[] = [];
    if (dim.length) parts.push(`L: ${dim.length}`); 
    if (dim.width) parts.push(`W: ${dim.width}`);
    if (dim.height) parts.push(`H: ${dim.height}`);
    if (dim.diameter) parts.push(`Dia: ${dim.diameter}`);
    if (dim.thickness) parts.push(`T: ${dim.thickness}`);
    if (dim.size) parts.push(`Size: ${dim.size}`);
    
    return parts.length > 0 ? parts.join(' | ') : 'Details not available';
};

export default function ProductModelSelection({ 
  productModels,
  initialSelectedModelKey,
  initialSelectedDimensionKey 
}: ProductModelSelectionProps) {
  const modelKeys = Object.keys(productModels);
  
  const [selectedModelKey, setSelectedModelKey] = useState<string>(
    initialSelectedModelKey && productModels[initialSelectedModelKey] 
    ? initialSelectedModelKey 
    : modelKeys[0] || ''
  );

  const selectedModel = useMemo(() => productModels[selectedModelKey], [productModels, selectedModelKey]);
  
  const dimensionKeys = useMemo(() => 
    selectedModel ? Object.keys(selectedModel.dimensions) : [], 
    [selectedModel]
  );

  const [selectedDimensionKey, setSelectedDimensionKey] = useState<string>(() => {
    if (initialSelectedDimensionKey && selectedModel?.dimensions[initialSelectedDimensionKey]) {
      return initialSelectedDimensionKey;
    }
    return dimensionKeys[0] || '';
  });

  useEffect(() => {
    if (initialSelectedModelKey && productModels[initialSelectedModelKey]) {
      setSelectedModelKey(initialSelectedModelKey);
    } else if (modelKeys.length > 0 && !productModels[selectedModelKey]) {
      setSelectedModelKey(modelKeys[0]);
    }
  }, [initialSelectedModelKey, productModels, modelKeys, selectedModelKey]);
  
  useEffect(() => {
    const currentModelDetails = productModels[selectedModelKey];
    if (currentModelDetails) {
      const currentDimensionKeys = Object.keys(currentModelDetails.dimensions);
      if (initialSelectedDimensionKey && currentModelDetails.dimensions[initialSelectedDimensionKey]) {
        setSelectedDimensionKey(initialSelectedDimensionKey);
      } else if (currentDimensionKeys.length > 0 && !currentModelDetails.dimensions[selectedDimensionKey]) {
        setSelectedDimensionKey(currentDimensionKeys[0]);
      } else if (currentDimensionKeys.length > 0 && selectedDimensionKey === '') {
        setSelectedDimensionKey(currentDimensionKeys[0]);
      } else if (currentDimensionKeys.length === 0) {
        setSelectedDimensionKey('');
      }
    } else {
      setSelectedDimensionKey('');
    }
  }, [selectedModelKey, productModels, initialSelectedDimensionKey, selectedDimensionKey]);


  if (!selectedModelKey || !selectedModel) {
    return <p className="text-gray-600">Model information not available.</p>;
  }

  const currentDimensionDetails: DimensionDetails | undefined = selectedModel.dimensions[selectedDimensionKey];

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Model & Specifications</h2>

      {modelKeys.length > 1 && (
        <div className="mb-4">
          <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Model:
          </label>
          <select
            id="model-select"
            value={selectedModelKey}
            onChange={(e) => setSelectedModelKey(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500"
          >
            {modelKeys.map(key => (
              <option key={key} value={key}>{productModels[key].name || `Model ${key}`}</option>
            ))}
          </select>
        </div>
      )}
      {modelKeys.length === 1 && selectedModel.name && (
         <p className="text-md text-gray-700 mb-1"><strong>Model:</strong> {selectedModel.name}</p>
      )}


      {dimensionKeys.length > 0 && (
        <div className="mb-4">
          <label htmlFor="dimension-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Dimension/Size:
          </label>
          <div className="flex flex-wrap gap-2">
            {dimensionKeys.map(key => (
              <button
                key={key}
                onClick={() => setSelectedDimensionKey(key)}
                className={`px-4 py-2 rounded-md text-sm transition-colors border
                  ${selectedDimensionKey === key 
                    ? 'bg-gold-500 text-white border-gold-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
              >
                {getDimensionRange(selectedModel.dimensions, key)}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentDimensionDetails && (
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">Specifications for Selected Model:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 font-medium">Property</th>
                  <th className="px-4 py-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(currentDimensionDetails).map(([prop, value]) => (
                  value && ( 
                    <tr key={prop} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 capitalize">{prop.replace(/([A-Z])/g, ' $1')}</td>
                      <td className="px-4 py-2">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}</td>
                    </tr>
                  )
                ))}
                {selectedModel.material && (
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 capitalize">Material</td>
                        <td className="px-4 py-2">{selectedModel.material}</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!currentDimensionDetails && dimensionKeys.length > 0 && (
          <p className="text-gray-500 mt-2">Select a dimension to see details.</p>
      )}
      {!currentDimensionDetails && dimensionKeys.length === 0 && (
          <p className="text-gray-500 mt-2">No specific dimensions available for this model.</p>
      )}
    </div>
  );
}
