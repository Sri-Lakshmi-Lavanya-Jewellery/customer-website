import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, getCategoryById } from '../../data/productData';
import ProductGallery from '../../components/ProductGallery/ProductGallery';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [modelKeys, setModelKeys] = useState<string[]>([]);
  const [selectedDimension, setSelectedDimension] = useState<string>('');
  const [dimensionKeys, setDimensionKeys] = useState<string[]>([]);

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        // Set the first image as selected if images exist
        if (foundProduct.images && foundProduct.images.length > 0) {
          setSelectedImage(foundProduct.images[0]);
        }
        
        // If product has models, set the first one as default selected
        if (foundProduct.models && Object.keys(foundProduct.models).length > 0) {
          const modelKeyList = Object.keys(foundProduct.models);
          setModelKeys(modelKeyList);
          setSelectedModel(modelKeyList[0]);
          
          // Set the first dimension as default selected
          if (foundProduct.models[modelKeyList[0]]) {
            const dimensionKeyList = Object.keys(foundProduct.models[modelKeyList[0]]);
            setDimensionKeys(dimensionKeyList);
            setSelectedDimension(dimensionKeyList[0]);
          }
        }
      }
    }
    setLoading(false);
  }, [productId]);

  const handleModelChange = (modelKey: string) => {
    setSelectedModel(modelKey);
    
    // Update dimension keys when model changes
    if (product && product.models && product.models[modelKey]) {
      const dimensionKeyList = Object.keys(product.models[modelKey]);
      setDimensionKeys(dimensionKeyList);
      setSelectedDimension(dimensionKeyList[0]);
    }
  };
  
  const handleDimensionChange = (dimensionKey: string) => {
    setSelectedDimension(dimensionKey);
  };
  
  // Define dimension interfaces to fix TypeScript errors
  interface Dimension {
    length?: string;
    breadth?: string;
    weight?: string;
    height?: string;
  }
  
  interface DimensionRange {
    min: number;
    max: number;
    unit: string;
  }
  
  interface DimensionRangeSet {
    length: DimensionRange | null;
    breadth: DimensionRange | null;
    weight: DimensionRange | null;
    height: DimensionRange | null;
  }
  
  // Helper function to extract dimension range
  const getDimensionRange = (modelData: Record<string, Dimension>): DimensionRangeSet | null => {
    if (!modelData) return null;
    
    // Get all dimensions
    const allDimensions = Object.values(modelData);
    if (allDimensions.length === 0) return null;
    
    // Extract length range
    const lengths = allDimensions
      .map(dim => dim.length ? parseFloat(dim.length.replace(/[^\d.]/g, '')) : null)
      .filter((l): l is number => l !== null);
    
    // Extract breadth range
    const breadths = allDimensions
      .map(dim => dim.breadth ? parseFloat(dim.breadth.replace(/[^\d.]/g, '')) : null)
      .filter((b): b is number => b !== null);

    // Extract height range
    const heights = allDimensions
      .map(dim => dim.height ? parseFloat(dim.height.replace(/[^\d.]/g, '')) : null)
      .filter((h): h is number => h !== null);
    
    // Extract weight range
    const weights = allDimensions
      .map(dim => dim.weight ? parseFloat(dim.weight.replace(/[^\d.]/g, '')) : null)
      .filter((w): w is number => w !== null);
    
    // Get unit from first dimension that has the property
    const getLengthUnit = (): string => {
      for (const dim of allDimensions) {
        if (dim.length) return dim.length.replace(/[\d.]/g, '') || 'cm';
      }
      return 'cm';
    };
    
    const getBreadthUnit = (): string => {
      for (const dim of allDimensions) {
        if (dim.breadth) return dim.breadth.replace(/[\d.]/g, '') || 'cm';
      }
      return 'cm';
    };
    
    const getHeightUnit = (): string => {
      for (const dim of allDimensions) {
        if (dim.height) return dim.height.replace(/[\d.]/g, '') || 'cm';
      }
      return 'cm';
    };
    
    const getWeightUnit = (): string => {
      for (const dim of allDimensions) {
        if (dim.weight) return dim.weight.replace(/[\d.]/g, '') || 'g';
      }
      return 'g';
    };
    
    return {
      length: lengths.length > 0 ? {
        min: Math.min(...lengths),
        max: Math.max(...lengths),
        unit: getLengthUnit()
      } : null,
      breadth: breadths.length > 0 ? {
        min: Math.min(...breadths),
        max: Math.max(...breadths),
        unit: getBreadthUnit()
      } : null,
      height: heights.length > 0 ? {
        min: Math.min(...heights),
        max: Math.max(...heights),
        unit: getHeightUnit()
      } : null,
      weight: weights.length > 0 ? {
        min: Math.min(...weights),
        max: Math.max(...weights),
        unit: getWeightUnit()
      } : null
    };
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Get category for breadcrumb
  const category = getCategoryById(product.category);

  // Prepare model-specific information if available
  const hasModels = product.models && Object.keys(product.models).length > 0;
  const currentModelData = hasModels ? product.models[selectedModel] : null;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          {category && (
            <li className="flex items-center">
              <Link to={`/products/${product.category}`} className="text-blue-600 hover:text-blue-800">
                {category.title}
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
          )}
          <li className="text-gray-600">{product.title}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Product Gallery */}
        <div className="w-full">
          <ProductGallery 
            images={product.images || []} 
            title={product.title} 
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
          
          {/* Connect on Request */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-medium">Price available on request</span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Weight:</span>
                <span className="font-semibold">{product.weight}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Status:</span>
                <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          {/* Model Selection */}
          {hasModels && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Model</h3>
              <div className="flex gap-3">
                {modelKeys.map(modelKey => {
                  // Get a preview of the current model dimensions to show in the selector
                  const modelData = product.models[modelKey];
                  const firstDimKey = Object.keys(modelData)[0];
                  const previewDimensions = modelData[firstDimKey];
                  
                  return (
                    <button
                      key={modelKey}
                      onClick={() => handleModelChange(modelKey)}
                      className={`border p-4 rounded-lg text-left transition-all ${
                        selectedModel === modelKey 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${selectedModel === modelKey ? 'text-blue-800' : 'text-gray-800'}`}>
                            {modelKey}
                          </div>
                          {previewDimensions && (
                            <div className="text-sm text-gray-500 mt-1">
                              {previewDimensions.length && `Length: ${previewDimensions.length}`}
                              {previewDimensions.weight && ` • Weight: ${previewDimensions.weight}`}
                            </div>
                          )}
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedModel === modelKey
                            ? 'border-blue-500 bg-blue-500'
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
          )}

          {/* Model Dimension Ranges */}
          {currentModelData && (
            <div className="mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Model Specifications</h3>
              
              {/* Dimension Ranges */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <h4 className="font-medium text-gray-800 mb-3">Available Dimension Ranges</h4>
                
                {/* Get dimension ranges for the current model */}
                {(() => {
                  const dimensionRange = getDimensionRange(currentModelData);
                  if (!dimensionRange) return null;
                  
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {dimensionRange.length && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-transform hover:translate-y-[-2px]">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Length Range</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                          </div>
                          <div className="mt-2 text-xl font-semibold">
                            {dimensionRange.length.min === dimensionRange.length.max ? 
                              `${dimensionRange.length.min}${dimensionRange.length.unit}` : 
                              `${dimensionRange.length.min} - ${dimensionRange.length.max}${dimensionRange.length.unit}`}
                          </div>
                        </div>
                      )}
                      
                      {dimensionRange.breadth && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-transform hover:translate-y-[-2px]">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Breadth Range</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="mt-2 text-xl font-semibold">
                            {dimensionRange.breadth.min === dimensionRange.breadth.max ? 
                              `${dimensionRange.breadth.min}${dimensionRange.breadth.unit}` : 
                              `${dimensionRange.breadth.min} - ${dimensionRange.breadth.max}${dimensionRange.breadth.unit}`}
                          </div>
                        </div>
                      )}
                      
                      {dimensionRange.height && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-transform hover:translate-y-[-2px]">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Height Range</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                            </svg>
                          </div>
                          <div className="mt-2 text-xl font-semibold">
                            {dimensionRange.height.min === dimensionRange.height.max ? 
                              `${dimensionRange.height.min}${dimensionRange.height.unit}` : 
                              `${dimensionRange.height.min} - ${dimensionRange.height.max}${dimensionRange.height.unit}`}
                          </div>
                        </div>
                      )}
                      
                      {dimensionRange.weight && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-transform hover:translate-y-[-2px]">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Weight Range</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="mt-2 text-xl font-semibold">
                            {dimensionRange.weight.min === dimensionRange.weight.max ? 
                              `${dimensionRange.weight.min}${dimensionRange.weight.unit}` : 
                              `${dimensionRange.weight.min} - ${dimensionRange.weight.max}${dimensionRange.weight.unit}`}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
              
              {/* Dimension Selection */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Select Specific Dimensions</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {dimensionKeys.map(dimKey => (
                    <button
                      key={dimKey}
                      onClick={() => handleDimensionChange(dimKey)}
                      className={`border p-3 rounded-lg text-center transition-colors ${
                        selectedDimension === dimKey 
                          ? 'border-blue-500 bg-blue-50 text-blue-800' 
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {dimKey}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Selected Dimension Details */}
              {selectedDimension && currentModelData[selectedDimension] && (
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    {selectedDimension} Specifications
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {currentModelData[selectedDimension].length && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-gray-600 text-sm mb-1">Length</div>
                        <div className="text-xl font-semibold text-blue-800">{currentModelData[selectedDimension].length}</div>
                      </div>
                    )}
                    
                    {currentModelData[selectedDimension].breadth && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-gray-600 text-sm mb-1">Breadth</div>
                        <div className="text-xl font-semibold text-blue-800">{currentModelData[selectedDimension].breadth}</div>
                      </div>
                    )}
                    
                    {currentModelData[selectedDimension].height && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-gray-600 text-sm mb-1">Height</div>
                        <div className="text-xl font-semibold text-blue-800">{currentModelData[selectedDimension].height}</div>
                      </div>
                    )}
                    
                    {currentModelData[selectedDimension].weight && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-gray-600 text-sm mb-1">Weight</div>
                        <div className="text-xl font-semibold text-blue-800">{currentModelData[selectedDimension].weight}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Help tip */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p>You can compare different models and select specific dimensions above. The dimension ranges show all possible variations for this model.</p>
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
            <div className="flex items-center">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)} 
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg"
                disabled={quantity <= 1}
              >
                <span className="text-xl">-</span>
              </button>
              <input 
                type="number" 
                min="1" 
                max="10"
                value={quantity} 
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 h-10 border-y border-gray-300 text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)} 
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg"
                disabled={quantity >= 10}
              >
                <span className="text-xl">+</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
              disabled={!product.inStock}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Connect on Request
            </button>
            <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Description</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            This beautiful silver {product.title} is crafted with high-quality {product.purity} silver, 
            weighing approximately {product.weight}. Perfect for various occasions and celebrations, 
            this item exemplifies fine craftsmanship and attention to detail.
          </p>
        </div>
      </div>

      {/* Product Care */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Care</h2>
        <div className="prose max-w-none">
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Clean with a soft, dry cloth to maintain shine</li>
            <li>Avoid contact with harsh chemicals or abrasive materials</li>
            <li>Store in a cool, dry place away from direct sunlight</li>
            <li>For deep cleaning, use silver polish specifically designed for silver items</li>
            <li>Handle with care to prevent scratches or dents</li>
          </ul>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Related products would be mapped here */}
          <div className="text-center text-gray-600">Related products would be displayed here</div>
        </div>
      </div>
    </div>
  );
}
