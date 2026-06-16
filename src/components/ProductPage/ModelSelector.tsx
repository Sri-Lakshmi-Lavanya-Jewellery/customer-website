import React from 'react';
import type { Product } from '../../services/api'; // For Product['models'] type

interface ModelSelectorProps {
  models: Product['models']; // The entire models object for the product
  modelKeys: string[];
  selectedModel: string;
  onModelChange: (modelKey: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  modelKeys,
  selectedModel,
  onModelChange,
}) => {
  if (!models || modelKeys.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="font-display text-lg text-charcoal mb-3">Select Model</h3>
      <div className="flex flex-wrap gap-3"> {/* Use flex-wrap for better responsiveness */}
        {modelKeys.map(modelKey => {
          const modelData = models[modelKey];
          // Ensure modelData and its keys exist before trying to access them
          const firstDimKey = modelData ? Object.keys(modelData)[0] : null;
          const previewDimensions = firstDimKey && modelData ? modelData[firstDimKey] : null;

          return (
            <button
              key={modelKey}
              onClick={() => onModelChange(modelKey)}
              className={`border p-4 rounded-lg text-left transition-all w-full sm:w-auto hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-opacity-50 ${
                selectedModel === modelKey
                  ? 'border-gold-500 bg-gold-50 shadow-md'
                  : 'border-gray-300 hover:border-gold-300 hover:bg-gold-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium font-modern ${selectedModel === modelKey ? 'text-gold-800' : 'text-charcoal'}`}>
                    {modelKey}
                  </div>
                  {previewDimensions && (
                    <div className="text-sm text-gray-500 mt-1">
                      {previewDimensions.length !== undefined && previewDimensions.length !== null && `Length: ${previewDimensions.length}`}
                      {previewDimensions.weight && ` • Weight: ${previewDimensions.weight}`}
                    </div>
                  )}
                </div>
                <div className={`ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedModel === modelKey
                    ? 'border-gold-500 bg-gold-500'
                    : 'border-gray-300'
                }`}>
                  {selectedModel === modelKey && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModelSelector;
