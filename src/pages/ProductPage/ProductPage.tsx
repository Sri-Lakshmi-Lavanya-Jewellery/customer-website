import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryById } from '../../data/productData';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import { useProductDetails } from '../../hooks/useProductDetails';
import type { Category, Product } from '../../data/productData'; // Ensure Product is imported

// Import new components
import ProductBreadcrumb from '../../components/ProductPage/ProductBreadcrumb';
import ProductTitleBadge from '../../components/ProductPage/ProductTitleBadge';
import ProductBasicInfo from '../../components/ProductPage/ProductBasicInfo';
import QuantityInput from '../../components/ProductPage/QuantityInput';
import ProductActions from '../../components/ProductPage/ProductActions';
import ModelSelector from '../../components/ProductPage/ModelSelector';
import DimensionRangeDisplay from '../../components/ProductPage/DimensionRangeDisplay';
import DimensionSelector from '../../components/ProductPage/DimensionSelector';
import SelectedDimensionDetails from '../../components/ProductPage/SelectedDimensionDetails';
import ProductSection from '../../components/ProductPage/ProductSection'; // Import ProductSection

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();

  const {
    product,
    loading,
    quantity,
    selectedModel,
    modelKeys,
    selectedDimension,
    dimensionKeys,
    currentModelData,
    dimensionRangeSet,
    handleModelChange,
    handleDimensionChange,
    handleQuantityChange,
  } = useProductDetails(productId);

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const category: Category | undefined = product ? getCategoryById(product.category) : undefined;
  const hasModels = product.models && modelKeys.length > 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <ProductBreadcrumb product={product} category={category} />

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
          <ProductTitleBadge title={product.title} />
          <ProductBasicInfo weight={product.weight} inStock={product.inStock} />

          {hasModels && product.models && (
            <ModelSelector
              models={product.models}
              modelKeys={modelKeys}
              selectedModel={selectedModel}
              onModelChange={handleModelChange}
            />
          )}

          {currentModelData && (
            <div className="mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Model Specifications</h3>
              
              <DimensionRangeDisplay dimensionRangeSet={dimensionRangeSet} />
              
              <DimensionSelector
                dimensionKeys={dimensionKeys}
                selectedDimension={selectedDimension}
                onDimensionChange={handleDimensionChange}
              />
              
              <SelectedDimensionDetails
                selectedDimension={selectedDimension}
                currentModelData={currentModelData}
              />
              
              {/* Help tip */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  <p>You can compare different models and select specific dimensions above. The dimension ranges show all possible variations for this model.</p>
                </div>
              </div>
            </div>
          )}

          <QuantityInput quantity={quantity} onQuantityChange={handleQuantityChange} />
          <ProductActions inStock={product.inStock} />
        </div>
      </div>

      <ProductSection title="Product Description">
        {/* The text-gray-600 class is now handled by ProductSection's child wrapper */}
        <p>
          This beautiful silver {product.title} is crafted with high-quality {product.purity || 'fine'} silver,
          weighing approximately {product.weight || 'various weights'}. Perfect for various occasions and celebrations,
          this item exemplifies fine craftsmanship and attention to detail.
        </p>
      </ProductSection>

      <ProductSection title="Product Care">
        {/* Apply specific list styling directly if not covered by ProductSection's child wrapper */}
        <ul className="list-disc pl-6 space-y-2">
          <li>Clean with a soft, dry cloth to maintain shine</li>
          <li>Avoid contact with harsh chemicals or abrasive materials</li>
          <li>Store in a cool, dry place away from direct sunlight</li>
          <li>For deep cleaning, use silver polish specifically designed for silver items</li>
          <li>Handle with care to prevent scratches or dents</li>
        </ul>
      </ProductSection>

      <ProductSection title="You May Also Like">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Related products would be mapped here */}
          <div className="text-center">Related products would be displayed here</div>
        </div>
      </ProductSection>
    </div>
  );
}
