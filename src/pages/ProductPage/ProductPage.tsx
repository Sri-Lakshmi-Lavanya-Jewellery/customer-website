import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import { useProductDetailsWithModels } from '../../hooks/useApi';
import { useDynamicImages } from '../../hooks/useDynamicImages';
import { useMetalRates } from '../../hooks/useMetalRates';
import type { Category, Product } from '../../services/api'; // Import from API service
import { getCategoryName, getCategorySlug, generateProductBreadcrumbs } from '../../utils/productUtils';

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
import ProductCard from '../../components/ProductCard/ProductCard';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();

  const {
    productDetails,
    product,
    loading,
    error,
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
  } = useProductDetailsWithModels(productId || '');

  // Get dynamic images based on selected dimension (always call hooks before any early returns)
  const dynamicImages = useDynamicImages({
    product,
    selectedModel,
    selectedDimension
  });

  // Today's live gold/silver rate for the price-explainer box
  const rates = useMetalRates();

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error ? 'An error occurred while loading the product.' : 'The product you are looking for does not exist.'}
          </p>
          <Link to="/" className="inline-block bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Use API service to get category information
  const category: Category | undefined = product ? 
    // Handle both object and string category formats
    (typeof product.category === 'object' ? product.category : {
      id: getCategorySlug(product),
      name: getCategoryName(product),
      title: getCategoryName(product),
      slug: getCategorySlug(product)
    }) : undefined;
  const hasModels = product.models && modelKeys.length > 0;
  
  // Use breadcrumbs from API if available, otherwise fall back to local breadcrumb component
  const apiBreadcrumbs = productDetails?.breadcrumbs;
  const relatedProducts = productDetails?.relatedProducts || [];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* API Breadcrumbs */}
      {apiBreadcrumbs && apiBreadcrumbs.length > 0 ? (
        <nav className="mb-8 text-sm">
          <ol className="list-none p-0 inline-flex">
            {apiBreadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="flex items-center">
                <Link to={breadcrumb.url} className="text-gold-700 hover:text-gold-800">
                  {breadcrumb.name}
                </Link>
                {index < apiBreadcrumbs.length - 1 && (
                  <span className="mx-2 text-gray-500">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : (
        <ProductBreadcrumb product={product} category={category} />
      )}

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Product Gallery */}
        <div className="w-full">
          <ProductGallery 
            key={`${selectedModel}-${selectedDimension}`} // Force re-render when selection changes
            images={dynamicImages}
            title={`${product.title}${selectedDimension ? ` - ${selectedDimension}` : ''}`} 
          />
        </div>

        {/* Product Info */}
        <div>
          <ProductTitleBadge title={product.title} />
          <ProductBasicInfo product={product} weight={product.weight} inStock={product.inStock} />

          {/* How pricing works — transparency builds trust, uses today's live rate */}
          <div className="mb-6 rounded-xl border border-gold-100 bg-gold-50/60 p-5">
            <h3 className="font-display text-lg text-charcoal mb-3">How Your Price Is Calculated</h3>
            <div className="space-y-2 text-sm text-charcoal-light font-modern">
              <div className="flex items-center justify-between">
                <span>Metal value</span>
                <span className="text-charcoal">Weight × today's rate</span>
              </div>
              <div className="flex items-center justify-between">
                <span>+ Making charges</span>
                <span className="text-charcoal">By craftsmanship</span>
              </div>
              {rates && (
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-gold-200/60">
                  <span className="text-charcoal-muted">Today's rate</span>
                  <span className="font-semibold text-gold-700">
                    Silver ₹{rates.silverPerGram.toFixed(0)}/g · Gold 22K ₹{rates.gold22k.toFixed(0)}/g
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-charcoal-muted mt-3">
              Articles are sold by weight. Share this piece on WhatsApp for an exact, up-to-the-day quote.
            </p>
          </div>

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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  <p>You can compare different models and select specific dimensions above. The dimension ranges show all possible variations for this model.</p>
                </div>
              </div>
            </div>
          )}

          <QuantityInput quantity={quantity} onQuantityChange={handleQuantityChange} />
          <ProductActions inStock={product.inStock} product={product} />
        </div>
      </div>

      <ProductSection title="Product Description">
        {/* The text-gray-600 class is now handled by ProductSection's child wrapper */}
        <p>
          {product.description || 'This is a beautiful silver jewelry piece that complements any outfit.'}
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
          {relatedProducts && relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id} 
                id={relatedProduct.id}
                title={relatedProduct.title}
                image={relatedProduct.images?.[0] || relatedProduct.commonImages?.[0] || '/assets/images/products/default.jpg'}
                isNew={relatedProduct.isNewProduct || relatedProduct.isNew}
                link={`/product/${relatedProduct.id}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No related products available
            </div>
          )}
        </div>
      </ProductSection>
    </div>
  );
}
